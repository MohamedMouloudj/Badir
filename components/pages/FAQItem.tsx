function FAQItem({
  number,
  question,
  answer,
}: {
  number: number;
  question: string;
  answer: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-1 text-right">
        <div className="flex-center justify-start mb-3">
          <div className="bg-primary-500 text-primary-100 rounded-full w-10 h-10 flex-center justify-center font-bold text-lg ml-3">
            {number}
          </div>
          <h3 className="text-neutrals-700 font-bold text-xl">{question}</h3>
        </div>
        <p className="text-neutrals-600 text-paragraph-md">{answer}</p>
      </div>
    </div>
  );
}

export default FAQItem;
