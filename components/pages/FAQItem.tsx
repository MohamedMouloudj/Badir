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
        <div className="flex-center mb-3 justify-start">
          <div className="bg-primary-500 text-primary-100 flex-center ml-3 h-10 w-10 justify-center rounded-full text-lg font-bold">
            {number}
          </div>
          <h3 className="text-neutrals-700 text-xl font-bold">{question}</h3>
        </div>
        <p className="text-neutrals-600 text-paragraph-md">{answer}</p>
      </div>
    </div>
  );
}

export default FAQItem;
