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

interface FeedbackReceivedEmailProps {
  userName?: string;
  userEmail?: string;
  easeOfUse?: string;
  informationClarity?: string;
  contentDiversity?: string;
  performanceSpeed?: string;
  generalSatisfaction?: string;
  encounteredDifficulties?: string;
  difficultiesDetails?: string;
  improvementSuggestions?: string;
  wouldRecommend?: string;
  appRating?: string;
  timestamp: string;
}

export default function FeedbackReceivedEmail({
  userName = "مستخدم مجهول",
  userEmail = "غير محدد",
  easeOfUse,
  informationClarity,
  contentDiversity,
  performanceSpeed,
  generalSatisfaction,
  encounteredDifficulties,
  difficultiesDetails,
  improvementSuggestions,
  wouldRecommend,
  appRating,
  timestamp,
}: FeedbackReceivedEmailProps) {
  // Determine if this is critical feedback
  const isCritical =
    easeOfUse === "سيء جداً" ||
    informationClarity === "سيء جداً" ||
    contentDiversity === "سيء جداً" ||
    performanceSpeed === "سيء جداً" ||
    generalSatisfaction === "سيء جداً" ||
    (appRating && parseInt(appRating) <= 2);

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
        {isCritical ? "⚠️ تقييم حرج - " : ""}تقييم جديد للمنصة من {userName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section
            style={{
              ...header,
              backgroundColor: isCritical ? "#c11d1d" : "#064e43",
            }}
          >
            <Text style={logo}>بادر</Text>
            <Text style={headerSubtitle}>
              {isCritical ? "⚠️ تقييم حرج للمنصة" : "تقييم جديد للمنصة"}
            </Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            {/* User Info */}
            <Section style={infoBox}>
              <Text style={sectionTitle}>معلومات المستخدم</Text>
              <Text style={infoText}>
                <strong>الاسم:</strong> {userName}
              </Text>
              <Text style={infoText}>
                <strong>البريد الإلكتروني:</strong> {userEmail}
              </Text>
              <Text style={infoText}>
                <strong>التاريخ والوقت:</strong> {timestamp}
              </Text>
            </Section>

            <Hr style={divider} />

            {/* Rating Scores */}
            <Section style={scoresBox}>
              <Text style={sectionTitle}>التقييمات</Text>

              {easeOfUse && (
                <RatingRow
                  label="سهولة الاستخدام"
                  value={easeOfUse}
                  isCritical={easeOfUse === "سيء جداً"}
                />
              )}

              {informationClarity && (
                <RatingRow
                  label="وضوح المعلومات"
                  value={informationClarity}
                  isCritical={informationClarity === "سيء جداً"}
                />
              )}

              {contentDiversity && (
                <RatingRow
                  label="تنوع المحتوى"
                  value={contentDiversity}
                  isCritical={contentDiversity === "سيء جداً"}
                />
              )}

              {performanceSpeed && (
                <RatingRow
                  label="سرعة الأداء"
                  value={performanceSpeed}
                  isCritical={performanceSpeed === "سيء جداً"}
                />
              )}

              {generalSatisfaction && (
                <RatingRow
                  label="الرضا العام"
                  value={generalSatisfaction}
                  isCritical={generalSatisfaction === "سيء جداً"}
                />
              )}

              {appRating && (
                <RatingRow
                  label="تقييم التطبيق"
                  value={`${appRating} من 5`}
                  isCritical={parseInt(appRating) <= 2}
                />
              )}

              {wouldRecommend && (
                <RatingRow
                  label="هل ينصح بالمنصة"
                  value={wouldRecommend}
                  isCritical={false}
                />
              )}
            </Section>

            {/* Difficulties */}
            {encounteredDifficulties && (
              <>
                <Hr style={divider} />
                <Section style={feedbackBox}>
                  <Text style={sectionTitle}>الصعوبات</Text>
                  <Text style={feedbackText}>
                    <strong>واجه صعوبات:</strong> {encounteredDifficulties}
                  </Text>
                  {difficultiesDetails && (
                    <Text style={feedbackText}>
                      <strong>التفاصيل:</strong> {difficultiesDetails}
                    </Text>
                  )}
                </Section>
              </>
            )}

            {/* Improvement Suggestions */}
            {improvementSuggestions && (
              <>
                <Hr style={divider} />
                <Section style={feedbackBox}>
                  <Text style={sectionTitle}>اقتراحات التطوير</Text>
                  <Text style={feedbackText}>{improvementSuggestions}</Text>
                </Section>
              </>
            )}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              هذه رسالة تلقائية من نظام تقييم منصة بادر
            </Text>
            {isCritical && (
              <Text style={criticalFooter}>
                ⚠️ يتطلب هذا التقييم متابعة فورية
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Helper component for rating rows
function RatingRow({
  label,
  value,
  isCritical,
}: {
  label: string;
  value: string;
  isCritical: boolean;
}) {
  return (
    <Text
      style={{
        ...ratingRow,
        backgroundColor: isCritical ? "#fef2f2" : "#faf9f5",
        borderRight: isCritical ? "4px solid #c11d1d" : "4px solid #92bd4e",
      }}
    >
      <strong>{label}:</strong>{" "}
      <span style={{ color: isCritical ? "#c11d1d" : "#064e43" }}>{value}</span>
    </Text>
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
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "500",
  marginTop: "8px",
  opacity: 0.9,
};

const content = {
  padding: "30px",
};

const infoBox = {
  backgroundColor: "#f1f0ea",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#064e43",
  marginBottom: "12px",
};

const infoText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#3e3d37",
  marginBottom: "8px",
};

const divider = {
  border: "none",
  borderTop: "2px solid #c9c7bf",
  margin: "24px 0",
};

const scoresBox = {
  marginBottom: "20px",
};

const ratingRow = {
  fontSize: "15px",
  lineHeight: "22px",
  color: "#3e3d37",
  padding: "12px 16px",
  marginBottom: "10px",
  borderRadius: "6px",
};

const feedbackBox = {
  backgroundColor: "#f1f0ea",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
};

const feedbackText = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3e3d37",
  marginBottom: "12px",
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

const criticalFooter = {
  fontSize: "14px",
  color: "#c11d1d",
  fontWeight: "600",
  marginTop: "8px",
};
