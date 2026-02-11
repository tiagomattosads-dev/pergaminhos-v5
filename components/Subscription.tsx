import React from 'react';

interface Props {
  theme: 'light' | 'dark';
  onBack: () => void;
}

const Subscription: React.FC<Props> = ({ theme, onBack }) => {
  const isDark = theme === 'dark';

  const PlanCard: React.FC<{
    name: string;
    price: string;
    features: string[];
    sealColor: string;
    buttonText: string;
    highlight?: boolean;
    locked?: boolean;
  }> = ({ name, price, features, sealColor, buttonText, highlight, locked }) => (
    <div className={`flex flex-col border-4 rounded-[2rem] p-8 shadow-2xl relative transition-all duration-500 hover:-translate-y-2 group overflow-hidden ${
      locked ? 'grayscale-[0.8] opacity-60 pointer-events-none' : ''
    } ${
      highlight 
        ? (isDark ? 'bg-gradient-to-b from-[#2d1b0d] to-[#1a0f00] border-[#d4af37] scale-105 z-10' : 'bg-gradient-to-b from-[#fffacd] to-[#fdf5e6] border-[#8b4513] scale-105 z-10')
        : (isDark ? 'bg-[#1a1a1a] border-white/5 opacity-80' : 'bg-[#fdf5e6] border-[#8b4513]/20 opacity-90')
    }`}>
      {/* Selo de Cera Decorativo */}
      <div className={`absolute top-6 right-6 w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg rotate-12 group-hover:rotate-0 transition-transform ${sealColor} border-white/20`}>
         {locked ? (
           <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
         ) : (
           <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
         )}
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h3 className={`cinzel text-xl font-bold uppercase tracking-widest ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{name}</h3>
          {locked && <svg className="w-4 h-4 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>}
        </div>
        <div className="flex items-baseline gap-1 mt-2">
          <span className={`fantasy-title text-4xl font-bold ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>{price}</span>
          {price !== 'Grátis' && <span className="cinzel text-[10px] opacity-40 uppercase">/ mensais</span>}
        </div>
      </div>

      <ul className="flex-grow space-y-4 mb-10">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <svg className={`w-5 h-5 flex-none mt-0.5 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className={`parchment-text text-sm leading-tight ${isDark ? 'text-[#e8d5b5]/80' : 'text-[#3e2723]/80'}`}>{f}</span>
          </li>
        ))}
      </ul>

      <button 
        disabled={locked}
        className={`w-full py-4 rounded-xl cinzel text-xs font-bold transition-all shadow-xl active:translate-y-1 border-b-4 uppercase tracking-[0.2em] ${
          locked 
            ? 'bg-gray-800/20 text-gray-500 border-black/20 cursor-not-allowed'
            : highlight
              ? (isDark ? 'bg-gradient-to-b from-[#d4af37] to-[#b8860b] text-[#1a0f00] border-[#8b4513]' : 'bg-gradient-to-b from-[#8b4513] to-[#5d4037] text-[#fdf5e6] border-[#3e2723]')
              : (isDark ? 'bg-[#333] text-[#e8d5b5]/40 border-black/40' : 'bg-[#8b4513]/10 text-[#8b4513]/40 border-[#8b4513]/20')
      }`}>
        {locked ? 'Acesso Bloqueado' : buttonText}
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-12 p-4 sm:p-10 max-w-7xl mx-auto pb-32">
      <header className="flex flex-col items-center text-center">
        <button 
          onClick={onBack}
          className={`flex items-center gap-2 cinzel text-[10px] font-bold uppercase mb-6 hover:opacity-100 transition-opacity ${isDark ? 'text-[#d4af37] opacity-60' : 'text-[#8b4513] opacity-60'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Voltar às Configurações
        </button>
        <h2 className={`cinzel text-3xl sm:text-5xl font-bold mb-4 uppercase tracking-[0.2em] drop-shadow-sm ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>Nível de Aventureiro</h2>
        <p className={`parchment-text max-w-2xl text-lg italic opacity-70 ${isDark ? 'text-[#e8d5b5]' : 'text-[#5d4037]'}`}>
          Escolha o selo que acompanhará suas crônicas. Cada moeda investida fortalece a infraestrutura das nossas bibliotecas mágicas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
        <PlanCard 
          name="Andarilho"
          price="Grátis"
          features={[
            "Até 3 pergaminhos de personagem",
            "Cálculos de regras básicas 5e",
            "Grimório e Inventário padrão",
            "Exportação manual de JSON"
          ]}
          sealColor="bg-gray-500"
          buttonText="Plano Atual"
        />
        
        <PlanCard 
          name="Aventureiro"
          price="R$ 9,90"
          highlight={true}
          features={[
            "Tudo do plano Andarilho.",
            "Pergaminhos ilimitados"
          ]}
          sealColor="bg-orange-800"
          buttonText="Consagrar Pergaminhos"
        />

        <PlanCard 
          name="Mestre da Guilda"
          price="R$ 14,90"
          features={[
            "em breve novidades"
          ]}
          sealColor="bg-yellow-600"
          buttonText="Dominar o Reino"
          locked={true}
        />
      </div>

      <footer className="mt-12 text-center opacity-40">
        <p className="parchment-text text-[10px] uppercase tracking-widest italic">
          * Todas as transações são protegidas por guardas reais e magias de criptografia.
        </p>
      </footer>
    </div>
  );
};

export default Subscription;