import { useState } from 'react';
import { MdError, MdClose, MdArrowForward } from 'react-icons/md';
import { useI18n } from '../../hooks/useI18n';
import Section from '../ui/Section';
import Button from '../ui/Button';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  general?: string;
}

const Contact = () => {
  const { t } = useI18n();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t.form.errors.firstName;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t.form.errors.lastName;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.form.errors.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.form.errors.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.form.errors.message;
    }

    // Vérifier si email OU numéro de téléphone est manquant
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.general = t.form.errors.general;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });

      alert(t.form.messages.success);
    } catch (error) {
      setErrors({ general: t.form.errors.submitFailed });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearError(field);
  };

  return (
    <Section id="contact" spacing="base" containerSize="lg" aria-labelledby="contact-heading">
      <div className="space-fluid-xl">
        <h2
          id="contact-heading"
          className="text-fluid-2xl font-bold text-left lowercase pb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t.sections.contact.title}
        </h2>

        <div
          className="card max-w-2xl mx-auto p-6 sm:p-8"
        >

          {errors.general && (
            <div
              className="p-4 border rounded-[var(--radius-lg)] flex items-center justify-between transition-all duration-[var(--duration-base)]"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.3)'
              }}
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center gap-3">
                <MdError size={20} className="text-red-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-fluid-sm" style={{ color: 'var(--color-error-hover)' }}>
                  {errors.general}
                </span>
              </div>
              <button
                onClick={() => clearError('general')}
                className="touch-target transition-colors duration-[var(--duration-base)] animate-mobile-scale"
                style={{ color: 'var(--color-error)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-error-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-error)';
                }}
                aria-label={t.accessibility.dismiss_error}
              >
                <MdClose size={16} />
              </button>
            </div>
          )}

          <form onSubmit={submitForm} className="space-fluid-base">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  className="block text-fluid-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t.form.labels.firstName}<span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  type="text"
                  placeholder={t.form.placeholders.firstName}
                  className={`input-field ${errors.firstName ? 'input-error' : ''}`}
                  style={{
                    borderColor: errors.firstName ? 'var(--color-error)' : 'var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                />
                {errors.firstName && (
                  <p id="firstName-error" className="text-fluid-xs text-red-500" role="alert">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="block text-fluid-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t.form.labels.lastName}<span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  type="text"
                  placeholder={t.form.placeholders.lastName}
                  className={`input-field ${errors.lastName ? 'input-error' : ''}`}
                  style={{
                    borderColor: errors.lastName ? 'var(--color-error)' : 'var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                />
                {errors.lastName && (
                  <p id="lastName-error" className="text-fluid-xs text-red-500" role="alert">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  className="block text-fluid-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t.form.labels.email}
                </label>
                <input
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  type="email"
                  placeholder={t.form.placeholders.email}
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  style={{
                    borderColor: errors.email ? 'var(--color-error)' : 'var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-fluid-xs text-red-500" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="block text-fluid-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t.form.labels.phone}
                </label>
                <input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  type="tel"
                  placeholder={t.form.placeholders.phone}
                  className={`input-field ${errors.phone ? 'input-error' : ''}`}
                  style={{
                    borderColor: errors.phone ? 'var(--color-error)' : 'var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-fluid-xs text-red-500" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="block text-fluid-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t.form.labels.message}<span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={6}
                placeholder={t.form.placeholders.message}
                className={`input-field resize-none ${errors.message ? 'input-error' : ''}`}
                style={{
                  borderColor: errors.message ? 'var(--color-error)' : 'var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)'
                }}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-fluid-xs text-red-500" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              icon={!isSubmitting ? <MdArrowForward size={20} /> : undefined}
              iconPosition="right"
            >
              {isSubmitting ? t.form.buttons.submitting : t.form.buttons.submit}
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
