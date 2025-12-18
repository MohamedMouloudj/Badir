import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PostNotificationEmailProps {
  postTitle: string;
  authorName: string;
  postExcerpt?: string;
  postUrl: string;
  categoryName?: string;
}

export default function PostNotificationEmail({
  postTitle,
  authorName,
  postExcerpt,
  postUrl,
  categoryName,
}: PostNotificationEmailProps) {
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
      <Preview>منشور جديد: {postTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>بادر</Text>
            <Text style={headerSubtitle}>منشور جديد</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>مرحباً،</Text>

            <Text style={paragraph}>
              تم نشر منشور جديد بواسطة <strong>{authorName}</strong> على منصة
              بادر.
            </Text>

            {/* Post Card */}
            <Section style={postCard}>
              {categoryName && (
                <Text style={categoryBadge}>{categoryName}</Text>
              )}

              <Text style={postTitle_style}>{postTitle}</Text>

              {postExcerpt && <Text style={excerpt}>{postExcerpt}</Text>}

              <Hr style={divider} />

              <Text style={authorInfo}>بواسطة: {authorName}</Text>
            </Section>

            {/* View Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={postUrl}>
                عرض المنشور
              </Button>
            </Section>

            <Text style={footerNote}>
              تلقيت هذه الرسالة لأنك مشترك في إشعارات منصة بادر.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>منصة بادر - معاً نصنع الفرق</Text>
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

const headerSubtitle = {
  color: "#70b595",
  fontSize: "16px",
  fontWeight: "500",
  marginTop: "8px",
};

const content = {
  padding: "40px 30px",
};

const greeting = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#262520",
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#3e3d37",
  marginBottom: "24px",
};

const postCard = {
  backgroundColor: "#f1f0ea",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "24px",
  border: "1px solid #c9c7bf",
};

const categoryBadge = {
  display: "inline-block",
  backgroundColor: "#92bd4e",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "600",
  padding: "4px 12px",
  borderRadius: "4px",
  marginBottom: "12px",
};

const postTitle_style = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#064e43",
  marginBottom: "12px",
  lineHeight: "1.3",
};

const excerpt = {
  fontSize: "15px",
  lineHeight: "22px",
  color: "#605f57",
  marginTop: "12px",
};

const divider = {
  border: "none",
  borderTop: "1px solid #c9c7bf",
  margin: "16px 0",
};

const authorInfo = {
  fontSize: "14px",
  color: "#605f57",
  fontWeight: "500",
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

const footerNote = {
  fontSize: "13px",
  color: "#92918f",
  textAlign: "center" as const,
  marginTop: "24px",
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
