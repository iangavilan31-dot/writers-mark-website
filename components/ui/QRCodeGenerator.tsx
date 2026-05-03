'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'

export interface QRCampaign {
  label: string
  url: string
  description: string
}

export const QR_CAMPAIGNS: QRCampaign[] = [
  {
    label: 'Business Card (General)',
    url: 'https://thewritersmark.us/book?utm_source=qr&utm_campaign=biz-card',
    description: 'General booking — for business cards',
  },
  {
    label: 'DSAT Prep Flyer',
    url: 'https://thewritersmark.us/book/dsat-prep?utm_source=qr&utm_campaign=dsat-flyer',
    description: 'Routes directly to DSAT booking',
  },
  {
    label: 'College Admissions Flyer',
    url: 'https://thewritersmark.us/book/college-admissions?utm_source=qr&utm_campaign=college-flyer',
    description: 'Routes directly to College Admissions booking',
  },
  {
    label: 'Free Consultation Flyer',
    url: 'https://thewritersmark.us/consult?utm_source=qr&utm_campaign=consult-flyer',
    description: 'Routes to free consultation scheduler',
  },
  {
    label: 'Professional Writing Card',
    url: 'https://thewritersmark.us/book/professional-writing?utm_source=qr&utm_campaign=pro-card',
    description: 'Routes to professional writing booking',
  },
  {
    label: 'School Partnership',
    url: 'https://thewritersmark.us/consult?utm_source=qr&utm_campaign=school-partner',
    description: 'For school partnership materials',
  },
]

interface QRCodeDisplayProps {
  campaign: QRCampaign
  size?: number
}

export function QRCodeDisplay({ campaign, size = 200 }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dataUrl, setDataUrl] = useState<string>('')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    QRCode.toCanvas(canvas, campaign.url, {
      width: size,
      margin: 2,
      color: {
        dark: '#1A2744',  // Navy
        light: '#FAFAF7', // Cream
      },
      errorCorrectionLevel: 'M',
    }, (err) => {
      if (err) console.error(err)
    })

    QRCode.toDataURL(campaign.url, {
      width: size,
      margin: 2,
      color: {
        dark: '#1A2744',
        light: '#FAFAF7',
      },
      errorCorrectionLevel: 'M',
    }).then(setDataUrl).catch(console.error)
  }, [campaign.url, size])

  const downloadPNG = () => {
    const link = document.createElement('a')
    link.download = `qr-${campaign.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`
    link.href = dataUrl
    link.click()
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white border border-border rounded-lg">
      {/* QR Code */}
      <canvas
        ref={canvasRef}
        className="rounded"
        aria-label={`QR code for ${campaign.label}`}
      />

      {/* Campaign info */}
      <div className="text-center">
        <p className="font-sans font-semibold text-sm text-ink">{campaign.label}</p>
        <p className="font-sans text-xs text-muted mt-1">{campaign.description}</p>
        <p
          className="font-mono text-[10px] text-muted/60 mt-2 break-all max-w-[200px]"
          title={campaign.url}
        >
          {campaign.url.replace('https://thewritersmark.us', '…')}
        </p>
      </div>

      {/* Download */}
      <button
        onClick={downloadPNG}
        className="btn-secondary py-2 px-4 text-xs cursor-pointer"
        disabled={!dataUrl}
        aria-label={`Download QR code for ${campaign.label}`}
      >
        Download PNG
      </button>
    </div>
  )
}

// Admin page component — shows all QR codes
export function QRCodeGrid() {
  return (
    <div className="space-y-8">
      <div>
        <p className="section-label mb-2">QR CODE CAMPAIGNS</p>
        <h2 className="heading-lg text-ink mb-2">Marketing QR Codes</h2>
        <p className="body-lg text-sm">
          Each QR code routes to a specific page with UTM tracking. Download and add to print materials.
          All scans are tracked in Plausible Analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {QR_CAMPAIGNS.map((campaign) => (
          <QRCodeDisplay key={campaign.label} campaign={campaign} size={180} />
        ))}
      </div>

      <div className="p-4 bg-cream-dark rounded border border-border">
        <p className="font-sans text-sm text-muted">
          <strong>To add a new campaign:</strong> Edit <code className="bg-white px-1 rounded">components/ui/QRCodeGenerator.tsx</code> and
          add a new entry to the <code className="bg-white px-1 rounded">QR_CAMPAIGNS</code> array.
          Use the format: <code className="bg-white px-1 rounded">utm_source=qr&utm_campaign=[your-campaign-name]</code>
        </p>
      </div>
    </div>
  )
}
