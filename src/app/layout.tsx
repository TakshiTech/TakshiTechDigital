import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg" href="/logo.svg" />
        <link rel="canonical" href="https://www.takshitechdigital.com/" />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NB5LG6FF');`,
          }}
        />
        

        {/* Google tag (gtag.js)
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17158201553"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17158201553');
            `,
          }}
        /> */}

        {/* Google tag (gtag.js)
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-R7LS5LC8F4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R7LS5LC8F4');
            `,
          }}
        /> */}

{/* Brevo API CONVERSATIONS */}

         {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, w, c) {
                w.BrevoConversationsID = '680d386aa6072558c70a238b';
                w[c] = w[c] || function() {
                  (w[c].q = w[c].q || []).push(arguments);
                };
                var s = d.createElement('script');
                s.async = true;
                s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
                if (d.head) d.head.appendChild(s);
              })(document, window, 'BrevoConversations');
            `,
          }}
        /> */}


      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NB5LG6FF"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />

        {children}
      </body>
    </html>
  );
}
