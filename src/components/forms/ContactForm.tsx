import { useI18n } from '../../hooks/useI18n';

const ContactForm = () => {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-12">
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-[var(--text-primary)]">
          <span className="font-mono text-lg opacity-80 text-[var(--color-accent)]">{t.numbers['05']}</span>
          <span className="lowercase">{t.ui.get_in_touch}</span>
        </h2>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--text-primary)]">
                {t.form.labels.firstName} <span className="text-red-500">{t.ui.required}</span>
              </label>
              <input
                type="text"
                placeholder={t.form.placeholders.firstName}
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 placeholder:text-[var(--text-tertiary)] bg-[var(--bg-elevated)] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--text-primary)]">
                {t.form.labels.lastName} <span className="text-red-500">{t.ui.required}</span>
              </label>
              <input
                type="text"
                placeholder={t.form.placeholders.lastName}
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 placeholder:text-[var(--text-tertiary)] bg-[var(--bg-elevated)] text-[var(--text-primary)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--text-primary)]">
                {t.form.labels.email}
              </label>
              <input
                type="email"
                placeholder={t.form.placeholders.email}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 placeholder:text-[var(--text-tertiary)] bg-[var(--bg-elevated)] text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--text-primary)]">
                {t.form.labels.phone}
              </label>
              <input
                type="tel"
                placeholder={t.form.placeholders.phone}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 placeholder:text-[var(--text-tertiary)] bg-[var(--bg-elevated)] text-[var(--text-primary)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--text-primary)]">
              {t.form.labels.message} <span className="text-red-500">{t.ui.required}</span>
            </label>
            <textarea
              required
              rows={8}
              placeholder={t.form.placeholders.message}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] text-sm font-semibold leading-relaxed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20 resize-none placeholder:text-[var(--text-tertiary)] bg-[var(--bg-elevated)] text-[var(--text-primary)] font-[system-ui]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-medium text-sm transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white"
            >
              {t.form.buttons.submit}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
