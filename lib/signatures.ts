// Dropbox Sign integration for client agreement e-signatures

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

  try {
    const { SignatureRequestApi } = await import('@dropbox/sign')
    const api = new SignatureRequestApi()
    api.username = process.env.DROPBOX_SIGN_API_KEY!

    const response = await api.signatureRequestSendWithTemplate({
      templateIds: [process.env.DROPBOX_SIGN_TEMPLATE_ID!],
      subject: "New Client Agreement — The Writer's Mark, LLC",
      message: `Dear ${clientName},\n\nThank you for booking with The Writer's Mark. Please review and sign the attached client agreement.\n\nQuestions? Visit thewritersmark.us/contact.\n\n— The Writer's Mark`,
      signers: [
        { role: 'Client', name: clientName, emailAddress: clientEmail },
        { role: 'Owner', name: "The Writer's Mark, LLC", emailAddress: process.env.OWNER_EMAIL! },
      ],
      customFields: [
        { name: 'client_name', value: clientName, required: true },
        { name: 'service_type', value: serviceName, required: true },
        { name: 'session_date', value: sessionDate ?? 'As scheduled', required: true },
        { name: 'session_rate', value: sessionRate, required: true },
      ],
      metadata: { booking_id: bookingId, stripe_session_id: stripeSessionId },
    })

    return response.body?.signatureRequest?.signatureRequestId ?? null
  } catch (err) {
    // Non-fatal — owner can send manually from Dropbox Sign dashboard
    console.error('Dropbox Sign error:', err)
    return null
  }
}
