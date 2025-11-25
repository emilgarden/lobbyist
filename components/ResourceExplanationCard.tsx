'use client';

import { Briefcase, Handshake, Coins, Newspaper } from 'lucide-react';

interface ResourceInfo {
  icon: React.ReactNode;
  name: string;
  description: string;
  color: string;
}

export default function ResourceExplanationCard() {
  const resources: ResourceInfo[] = [
    {
      icon: <Briefcase className="w-6 h-6 sm:w-7 sm:h-7" />,
      name: 'KLIENT',
      description: 'Brukerens liv og velvære. Høy = brukerne får hjelp. Lav = de sliter.',
      color: 'from-blue-600/20 to-blue-800/20 border-blue-500/40'
    },
    {
      icon: <Handshake className="w-6 h-6 sm:w-7 sm:h-7" />,
      name: 'TILLIT',
      description: 'Din faglige integritet og samvittighet. Høy = trygg på valgene dine. Lav = tvil på om du gjør riktig.',
      color: 'from-green-600/20 to-green-800/20 border-green-500/40'
    },
    {
      icon: <Coins className="w-6 h-6 sm:w-7 sm:h-7" />,
      name: 'PENGER',
      description: 'Kontorets budsjett. Høy = nok ressurser til tiltak. Lav = stramt budsjett.',
      color: 'from-amber-600/20 to-amber-800/20 border-amber-500/40'
    },
    {
      icon: <Newspaper className="w-6 h-6 sm:w-7 sm:h-7" />,
      name: 'OMDØMME',
      description: 'Ditt forhold til ledelsen og måloppnåelse. Høy = ledelsen er fornøyd. Lav = ligger under på måloppnåelse.',
      color: 'from-purple-600/20 to-purple-800/20 border-purple-500/40'
    }
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-3 w-full">
      {resources.map((resource, index) => (
        <div
          key={index}
          className={`
            bg-gradient-to-br ${resource.color}
            backdrop-blur-sm
            border-2
            rounded-lg sm:rounded-xl
            p-3 sm:p-4
            transition-all duration-200
            hover:scale-[1.02]
            shadow-lg
          `}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="
              flex-shrink-0
              w-10 h-10 sm:w-12 sm:h-12
              rounded-lg
              bg-slate-800/60
              border border-slate-600/40
              flex items-center justify-center
              text-slate-200
            ">
              {resource.icon}
            </div>
            
            {/* Text content */}
            <div className="flex-1 min-w-0">
              <h3 className="
                text-xs sm:text-sm
                font-bold
                uppercase
                tracking-wider
                text-slate-100
                mb-1.5
              ">
                {resource.name}
              </h3>
              <p className="
                text-[11px] sm:text-xs
                leading-relaxed
                text-slate-300
              ">
                {resource.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

