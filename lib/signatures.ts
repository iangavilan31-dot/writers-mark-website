// Dropbox Sign (HelloSign) integration for client agreement e-signatures

interface AgreementRequestParams {
  clientName: string
  clientEmail: string
  serviceName: string
  sessionDate?: string
  sessionRate: string
  bookingId: string
  stripeSessionId: string
}

export async function sendAgreementRequest(params: AgreementRequestParams) {
  const {
    clientName,
    clientEmail,
    serviceName,
    sessionDate,
    sessionRate,
    bookingId,
    stripeSessionId,
  } = params

  // Dynamic import to keep bundle small
  const { SignatureRequestApi, Configuration } = await import('@dropbox/sign')

  const config = new Configuration({
    username: process.env.DROPBOX_SIGN_API_KEY!,
  })

  const client = new SignatureRequestApi(config)

  const data = {
    templateIds: [process.env.DROPBOX_SIGN_TEMPLATE_ID!],
    subject: "New Client Agreement — The Writer's Mark, LLC",
    message: `Dear ${clientName},\n\nThank you for booking with The Writer's Mark. Please review and sign the attached client agreement at your earliest convenience — ideally before your session.\n\nThis is a standard service agreement covering session policies, cancellation terms, and academic integrity guidelines.\n\nQuestions? Reply to this email or visit thewritersmark.us/contact.\n\n— The Writer's Mark`,
    signers: [
      {
        role: 'Client',
        name: clientName,
        emailAddress: clientEmail,
      },
      {
        role: 'Owner',
        name: "The Writer's Mark, LLC",
        emailAddress: process.env.OWNER_EMAIL!,
      },
    ],
    customFields: [
      { name: 'client_name', value: clientName },
      { name: 'service_type', value: serviceName },
      { name: 'session_date', value: sessionDate ?? 'As scheduled' },
      { name: 'session_rate', value: sessionRate },
    ],
    metadata: {
      booking_id: bookingId,
      stripe_session_id: stripeSessionId,
    },
    // Client signs first, owner countersigns after
    signingOptions: {
      draw: true,
      type: true,
      upload: false,
      phone: false,
      defaultType: 'type' as const,
    },
  }

  try {
    const response = await client.signatureRequestSendWithTemplate({ signatureRequestSendWithTemplateRequest: data })
    return response.body?.signatureRequest?.signatureRequestId
  } catch (err) {
    console.error('Dropbox Sign error:', err)
    // Non-fatal — log and continue. Owner can send manually from dashboard.
    return null
  }
}
