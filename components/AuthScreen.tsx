
import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../translations';
import { supabase } from '../services/supabase';

interface Props {
  onLogin: () => void;
  theme: 'light' | 'dark';
  language: 'pt' | 'en';
}

const AuthScreen: React.FC<Props> = ({ onLogin, theme, language }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<{ title: string, message: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDark = theme === 'dark';
  const t = translations[language];

  useEffect(() => {
    // Garantir que o vídeo comece a tocar em navegadores com restrições de autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay assistido: ", error);
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!isResettingPassword && !password) return;

    setLoading(true);
    setError(null);

    try {
      if (isResettingPassword) {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (resetError) throw resetError;
        setSuccessMessage({
          title: language === 'pt' ? 'Coruja Enviada!' : 'Owl Sent!',
          message: language === 'pt' ? 'Verifique seu e-mail para redefinir sua senha.' : 'Check your email to reset your password.'
        });
        setShowSuccessModal(true);
        setIsResettingPassword(false);
      } else if (isRegistering) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        setSuccessMessage({
          title: language === 'pt' ? 'Pergaminho Enviado!' : 'Scroll Sent!',
          message: language === 'pt' ? 'Verifique seu e-mail para confirmar o cadastro e selar seu destino.' : 'Check your email to confirm registration and seal your fate.'
        });
        setShowSuccessModal(true);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        onLogin();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentSealColor = isDark ? 'from-amber-400 to-amber-700' : 'from-red-700 to-red-900';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative selection:bg-[#d4af37]/40">
      {/* Background Video solicitado */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline 
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dutufef4s/video/upload/v1770328032/2970d572d03a4160ac6d731f004e9275_gysx0u.mp4"
      />

      {/* Sutil gradiente para profundidade sem escurecer o centro */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.3)_100%)] z-[1] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md transition-all duration-700 transform scale-100">
        
        {/* Tomo de Couro - Compacto */}
        <div className={`border-[8px] rounded-[2.5rem] p-0.5 shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative transition-all duration-500 ${
          isDark ? 'border-[#1a1a1a] bg-[#1a1a1a]' : 'border-[#2d1b0d] bg-[#2d1b0d]'
        }`}>
          {/* Cantoneiras Metálicas Decorativas */}
          <div className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-[#d4af37]/30 rounded-tl-[2.8rem] pointer-events-none z-20"></div>
          <div className="absolute -top-2 -right-2 w-16 h-16 border-t-4 border-r-4 border-[#d4af37]/30 rounded-tr-[2.8rem] pointer-events-none z-20"></div>
          <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-4 border-l-4 border-[#d4af37]/30 rounded-bl-[2.8rem] pointer-events-none z-20"></div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-[#d4af37]/30 rounded-br-[2.8rem] pointer-events-none z-20"></div>

          <div className={`rounded-[2.2rem] p-8 sm:p-10 relative overflow-hidden flex flex-col items-center shadow-inner transition-all duration-500 backdrop-blur-md ${
            isDark 
              ? 'bg-[#121212]/95 border border-[#d4af37]/10' 
              : 'bg-[#fdf5e6]/95 border border-[#8b4513]/40 bg-[url("https://www.transparenttextures.com/patterns/p6.png")]'
          }`}>
            
            {/* Selo de Cera */}
            <div className="mb-8 flex flex-col items-center relative">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.5)] border-2 mb-3 rotate-[10deg] hover:rotate-0 transition-all duration-500 bg-gradient-to-br ${currentSealColor} border-white/30 relative z-20 group/seal`}>
                <svg className="w-10 h-10 text-white/50 drop-shadow-lg group-hover/seal:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                </svg>
              </div>
              <h1 className={`fantasy-title text-2xl sm:text-4xl text-center leading-tight uppercase tracking-normal drop-shadow-sm ${
                isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'
              }`}>
                {isResettingPassword 
                  ? (language === 'pt' ? 'Recuperar Acesso' : 'Recover Access')
                  : (isRegistering ? t.auth_title_register : t.auth_title_login)}
              </h1>
              <div className={`h-0.5 w-24 mt-2 rounded-full opacity-20 ${isDark ? 'bg-[#d4af37]' : 'bg-[#8b4513]'}`}></div>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="w-full space-y-6 relative z-10">
              {error && (
                <div className={`p-3 rounded-lg text-xs cinzel font-bold text-center border ${
                  isDark ? 'bg-red-900/20 border-red-500/50 text-red-400' : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className={`cinzel text-[10px] font-bold uppercase tracking-[0.2em] ml-1 opacity-70 ${
                  isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'
                }`}>
                  {t.email}
                </label>
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${focusedField === 'email' ? 'text-[#d4af37]' : 'text-gray-400 opacity-40'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </div>
                  <input 
                    type="email"
                    required
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="aventureiro@reino.com"
                    className={`w-full p-4 pl-12 rounded-xl parchment-text text-lg outline-none border-2 transition-all shadow-inner ${
                      isDark 
                        ? 'bg-black/40 border-white/5 text-[#f4e4bc] focus:border-[#d4af37] placeholder:text-white/10' 
                        : 'bg-white/80 border-[#8b4513]/20 text-[#3e2723] focus:border-[#8b4513] placeholder:text-[#8b4513]/20'
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {!isResettingPassword && (
                <div className="space-y-2">
                  <label className={`cinzel text-[10px] font-bold uppercase tracking-[0.2em] ml-1 opacity-70 ${
                    isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'
                  }`}>
                    {t.password}
                  </label>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${focusedField === 'password' ? 'text-[#d4af37]' : 'text-gray-400 opacity-40'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                    </div>
                    <input 
                      type="password"
                      required
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className={`w-full p-4 pl-12 rounded-xl parchment-text text-lg outline-none border-2 transition-all shadow-inner ${
                        isDark 
                          ? 'bg-black/40 border-white/5 text-[#f4e4bc] focus:border-[#d4af37] placeholder:text-white/10' 
                          : 'bg-white/80 border-[#8b4513]/20 text-[#3e2723] focus:border-[#8b4513] placeholder:text-[#8b4513]/20'
                      }`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  
                  {!isRegistering && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setIsResettingPassword(true);
                          setError(null);
                        }}
                        className={`text-[10px] cinzel font-bold uppercase tracking-wider hover:underline ${
                          isDark ? 'text-[#d4af37]/70 hover:text-[#d4af37]' : 'text-[#8b4513]/70 hover:text-[#8b4513]'
                        }`}
                      >
                        {language === 'pt' ? 'Esqueci minha senha' : 'Forgot password'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl cinzel text-sm font-bold shadow-xl transition-all border-b-4 active:translate-y-0.5 active:border-b-0 uppercase tracking-[0.3em] relative overflow-hidden group/btn ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                } ${
                  isDark 
                    ? 'bg-gradient-to-b from-[#d4af37] to-[#b8860b] text-[#1a1a1a] border-[#8b4513] hover:brightness-105' 
                    : 'bg-gradient-to-b from-[#8b4513] to-[#3e2723] text-[#fdf5e6] border-[#1a0f00] hover:brightness-105'
                }`}
              >
                <span className="relative z-10 drop-shadow-md pointer-events-none">
                  {loading 
                    ? (language === 'pt' ? 'Processando...' : 'Processing...') 
                    : (isResettingPassword 
                        ? (language === 'pt' ? 'Recuperar Senha' : 'Recover Password')
                        : (isRegistering ? t.register_btn : t.seal_contract)
                      )
                  }
                </span>
              </button>
            </form>

            <div className="mt-10 pt-6 border-t w-full border-black/10 text-center">
              <button 
                onClick={() => {
                  if (isResettingPassword) {
                    setIsResettingPassword(false);
                    setError(null);
                  } else {
                    setIsRegistering(!isRegistering);
                    setFocusedField(null);
                    setError(null);
                  }
                }}
                className={`cinzel text-[10px] font-bold uppercase tracking-[0.15em] opacity-40 hover:opacity-100 transition-all underline decoration-dotted underline-offset-4 decoration-1 ${
                  isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'
                }`}
              >
                {isResettingPassword 
                  ? (language === 'pt' ? 'Voltar ao Login' : 'Back to Login')
                  : (isRegistering ? t.has_record : t.start_journey)
                }
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="cinzel text-[9px] uppercase tracking-[0.5em] text-[#d4af37]/60 drop-shadow-lg">
            {t.runic_encryption}
          </p>
        </div>
      </div>
      
      {/* Brilho Sutil */}
      <div className="fixed inset-0 pointer-events-none z-[5] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)]"></div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className={`border-2 rounded-2xl p-6 max-w-md w-full shadow-2xl text-center relative overflow-hidden ${
            isDark ? 'bg-[#2d1b0d] border-[#d4af37]/50' : 'bg-[#fdf5e6] border-[#8b4513]/50'
          }`}>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-900/20 flex items-center justify-center border-2 border-green-500/30">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className={`cinzel font-bold text-xl mb-2 ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>
                {successMessage?.title || (language === 'pt' ? 'Pergaminho Enviado!' : 'Scroll Sent!')}
              </h3>
              
              <p className={`mb-6 text-sm ${isDark ? 'text-[#e8d5b5]' : 'text-[#5d4037]'}`}>
                {successMessage?.message || (language === 'pt' ? 'Verifique seu e-mail para confirmar o cadastro e selar seu destino.' : 'Check your email to confirm registration and seal your fate.')}
              </p>
              
              <button 
                onClick={() => setShowSuccessModal(false)}
                className={`px-6 py-2 rounded-lg cinzel font-bold border transition-all ${
                  isDark 
                    ? 'bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30' 
                    : 'bg-[#8b4513]/10 hover:bg-[#8b4513]/20 text-[#8b4513] border-[#8b4513]/30'
                }`}
              >
                {language === 'pt' ? 'Entendido' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;
