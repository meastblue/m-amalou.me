import { useI18n } from '../../hooks/useI18n';

const AboutSection = () => {
  const { t } = useI18n();

  return (
    <>
      <div className="mb-12 pt-6 lg:pt-32">
        <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
          {t.about.hero_content}
        </p>
      </div>

      <section id="about" className="pb-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-[var(--text-primary)]">
              <span className="font-mono text-lg opacity-80 text-[var(--color-accent)]">{t.numbers['01']}</span>
              <span className="lowercase">{t.sections_labels.about}</span>
            </h2>
            <p className="text-base leading-relaxed text-[var(--text-tertiary)]">
              {t.about.content}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;