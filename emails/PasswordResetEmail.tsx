import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordResetEmailProps {
  resetLink: string;
  userName?: string;
  expiryMinutes?: number;
}

export default function PasswordResetEmail({
  resetLink,
  userName,
  expiryMinutes = 30,
}: PasswordResetEmailProps) {
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
      <Preview>طلب إعادة تعيين كلمة المرور - منصة بادر</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>بادر</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>مرحباً {userName ? userName : ""},</Text>

            <Text style={paragraph}>
              تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك في منصة بادر.
            </Text>

            <Text style={paragraph}>
              اضغط على الزر أدناه لإعادة تعيين كلمة المرور الخاصة بك:
            </Text>

            {/* Reset Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={resetLink}>
                إعادة تعيين كلمة المرور
              </Button>
            </Section>

            <Text style={paragraph}>
              هذا الرابط صالح لمدة {expiryMinutes} دقيقة فقط.
            </Text>

            <Text style={warningText}>
              إذا لم تطلب إعادة تعيين كلمة المرور، يُرجى تجاهل هذه الرسالة.
              حسابك آمن ولن يتم إجراء أي تغييرات.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>منصة بادر - معاً نصنع الفرق</Text>
            <Text style={footerText}>لا تقم بمشاركة هذا الرابط مع أي شخص</Text>
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
  maxWidth: "600px",
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

const content = {
  padding: "40px 30px",
};

const greeting = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#262520",
  marginBottom: "20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#3e3d37",
  marginBottom: "16px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#064e43",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 40px",
};

const warningText = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#605f57",
  backgroundColor: "#f1f0ea",
  padding: "16px",
  borderRadius: "6px",
  marginTop: "24px",
  borderRight: "4px solid #ebb632",
};

const footer = {
  backgroundColor: "#f1f0ea",
  padding: "24px 30px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  color: "#605f57",
  margin: "4px 0",
};
