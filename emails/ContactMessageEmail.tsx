import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactMessageEmailProps {
  fullName: string;
  email: string;
  inquiryType: string;
  title: string;
  message: string;
  timestamp: string;
}

export default function ContactMessageEmail({
  fullName,
  email,
  inquiryType,
  title,
  message,
  timestamp,
}: ContactMessageEmailProps) {
  return (
    <Html dir="rtl" lang="ar">
      <Head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          }
        `}</style>
      </Head>
      <Preview>
        رسالة جديدة من {fullName} - {title}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>بادر</Text>
            <Text style={headerSubtitle}>رسالة جديدة من نموذج التواصل</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            {/* Sender Info */}
            <Section style={infoBox}>
              <Text style={sectionTitle}>معلومات المرسل</Text>

              <Text style={infoRow}>
                <strong>الاسم:</strong> {fullName}
              </Text>

              <Text style={infoRow}>
                <strong>البريد الإلكتروني:</strong>{" "}
                <a href={`mailto:${email}`} style={emailLink}>
                  {email}
                </a>
              </Text>

              <Text style={infoRow}>
                <strong>نوع الاستفسار:</strong> {inquiryType}
              </Text>

              <Text style={infoRow}>
                <strong>التاريخ والوقت:</strong> {timestamp}
              </Text>
            </Section>

            <Hr style={divider} />

            {/* Message Subject */}
            <Section style={subjectBox}>
              <Text style={sectionTitle}>عنوان الرسالة</Text>
              <Text style={subjectText}>{title}</Text>
            </Section>

            <Hr style={divider} />

            {/* Message Content */}
            <Section style={messageBox}>
              <Text style={sectionTitle}>نص الرسالة</Text>
              <Text style={messageText}>{message}</Text>
            </Section>

            {/* Action Note */}
            <Section style={actionBox}>
              <Text style={actionText}>
                💡 للرد على هذه الرسالة، استخدم البريد الإلكتروني: {email}
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              هذه رسالة تلقائية من نظام التواصل في منصة بادر
            </Text>
            <Text style={footerText}>لا ترد على هذا البريد الإلكتروني</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#faf9f5",
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "650px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const header = {
  backgroundColor: "#064e43",
  padding: "30px 20px",
  textAlign: "center" as const,
};

const logo = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0",
};

const headerSubtitle = {
  color: "#70b595",
  fontSize: "16px",
  fontWeight: "500",
  marginTop: "8px",
};

const content = {
  padding: "30px",
};

const infoBox = {
  backgroundColor: "#f1f0ea",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
  borderRight: "4px solid #92bd4e",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#064e43",
  marginBottom: "16px",
};

const infoRow = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3e3d37",
  marginBottom: "10px",
};

const emailLink = {
  color: "#064e43",
  textDecoration: "underline",
};

const divider = {
  border: "none",
  borderTop: "2px solid #c9c7bf",
  margin: "24px 0",
};

const subjectBox = {
  marginBottom: "20px",
};

const subjectText = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#262520",
  lineHeight: "1.4",
};

const messageBox = {
  backgroundColor: "#faf9f5",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "20px",
  border: "1px solid #c9c7bf",
};

const messageText = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#3e3d37",
  whiteSpace: "pre-wrap" as const,
};

const actionBox = {
  backgroundColor: "#e9f2db",
  borderRadius: "8px",
  padding: "16px",
  borderRight: "4px solid #92bd4e",
};

const actionText = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#445a22",
  margin: "0",
};

const footer = {
  backgroundColor: "#f1f0ea",
  padding: "24px 30px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "13px",
  color: "#605f57",
  margin: "4px 0",
};
