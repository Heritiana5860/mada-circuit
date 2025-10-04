import { useTranslation } from 'react-i18next';

export const FaqCard = ({ faq }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <>
      <section className="py-16 bg-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Questions Fréquentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Retrouvez ci-dessous les réponses aux questions les plus fréquemment
            posées par nos clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {faq.map((faq, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">{lang === 'fr' ? faq.questionFr : faq.questionEn}</h3>
                <p className="text-muted-foreground">{lang === 'fr' ? faq.reponseFr : faq.reponseEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
