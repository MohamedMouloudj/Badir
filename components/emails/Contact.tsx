import { Body, Head, Html, Preview } from "@react-email/components";

interface ContactEmailProps {
  fromName: string;
  fromEmail: string;
  subject: string;
  inquiryType: string;
  message: string;
}

export default function ContactEmail({
  fromName,
  fromEmail,
  subject,
  inquiryType,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>رسالة تواصل جديدة من {fromName}</Preview>
      <Body>
        <div
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif, Arial",
            fontSize: "16px",
            lineHeight: "1.6",
            color: "rgba(38, 37, 32, 1)",
            backgroundColor: "rgba(250, 249, 245, 1)",
            padding: "10px",
            direction: "rtl",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "rgba(6, 78, 67, 1)",
              color: "white",
              padding: "20px 15px",
              borderRadius: "8px 8px 0 0",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                margin: "0",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              رسالة تواصل جديدة
            </h1>
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "13px",
                opacity: "0.9",
              }}
            >
              تم استلام رسالة جديدة من منصة بادر
            </p>
          </div>

          {/* Main Content */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0 0 8px 8px",
              overflow: "hidden",
              border: "1px solid rgba(201, 199, 191, 1)",
              borderTop: "none",
            }}
          >
            {/* User Info Section */}
            <div
              style={{
                backgroundColor: "rgba(233, 242, 219, 1)",
                padding: "15px",
                borderBottom: "1px dashed rgba(201, 199, 191, 1)",
              }}
            >
              <div style={{ display: "block" }}>
                <div
                  style={{
                    color: "rgba(6, 78, 67, 1)",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  {fromName}
                </div>
                <div
                  style={{
                    color: "rgba(96, 95, 87, 1)",
                    fontSize: "14px",
                    marginBottom: "10px",
                    wordBreak: "break-all",
                  }}
                >
                  {fromEmail}
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(224, 244, 241, 1)",
                    color: "rgba(6, 78, 67, 1)",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  {inquiryType}
                </div>
              </div>
            </div>

            {/* Message Subject */}
            <div
              style={{
                backgroundColor: "rgba(250, 249, 245, 1)",
                padding: "15px",
                borderBottom: "1px solid rgba(201, 199, 191, 1)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 10px 0",
                  color: "rgba(6, 78, 67, 1)",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                موضوع الرسالة:
              </h3>
              <div
                style={{
                  color: "rgba(62, 61, 55, 1)",
                  fontSize: "15px",
                  backgroundColor: "white",
                  padding: "12px",
                  borderRadius: "6px",
                  borderRight: "3px solid rgba(146, 189, 78, 1)",
                  wordWrap: "break-word",
                }}
              >
                {subject}
              </div>
            </div>

            {/* Message Content */}
            <div style={{ padding: "15px" }}>
              <h3
                style={{
                  margin: "0 0 10px 0",
                  color: "rgba(6, 78, 67, 1)",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                محتوى الرسالة:
              </h3>
              <div
                style={{
                  backgroundColor: "rgba(250, 249, 245, 1)",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid rgba(224, 244, 241, 1)",
                  color: "rgba(38, 37, 32, 1)",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {message}
              </div>
            </div>

            {/* Footer Action */}
            <div
              style={{
                backgroundColor: "rgba(233, 242, 219, 1)",
                padding: "15px",
                textAlign: "center",
                borderTop: "1px dashed rgba(201, 199, 191, 1)",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px 0",
                  color: "rgba(96, 95, 87, 1)",
                  fontSize: "13px",
                }}
              >
                يرجى الرد في أقرب وقت ممكن
              </p>
              <div
                style={{
                  backgroundColor: "rgba(6, 78, 67, 1)",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "4px",
                  display: "inline-block",
                  fontWeight: "500",
                  fontSize: "13px",
                  wordBreak: "break-all",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                الرد على: {fromEmail}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              padding: "12px",
              color: "rgba(96, 95, 87, 1)",
              fontSize: "12px",
              borderTop: "1px dashed rgba(201, 199, 191, 1)",
            }}
          >
            <p style={{ margin: "0 0 5px 0" }}>
              <strong>منصة بادر</strong> - نحو مجتمع أفضل
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "11px",
                opacity: "0.7",
              }}
            >
              تم إرسال هذه الرسالة تلقائياً من نظام التواصل
            </p>
          </div>
        </div>
      </Body>
    </Html>
  );
}
