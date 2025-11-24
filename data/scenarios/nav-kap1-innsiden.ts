import { Scenario } from '@/types/game';

export const navKap1InsidenScenario: Scenario = {
  id: 'nav-kap1-innsiden',
  name: 'NAV Kap 1: Livet på innsiden',
  description: 'Opplev hverdagen som NAV-saksbehandler i dagens system. Hjelp Kristian, Mohammed, Mira og Linda - og merk hvordan systemet tvinger deg til umulige valg.',
  icon: '🏢',
  locked: false,
  events: [
    // ============================================================================
    // VELKOMMEN
    // ============================================================================
    {
      id: 'nav_velkommen',
      type: 'narrative',
      character: 'Velkommen',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Dette er en simulator som skal hjelpe deg å forstå den komplekse hverdagen som NAV-konsulent. Du vil oppleve de utfordringene og dilemmaene som saksbehandlere møter hver dag. Målet er å forstå hvordan systemstrukturen påvirker både brukerne og de som jobber i NAV, og hvorfor reformer kan være nødvendige.',
    },

    // ============================================================================
    // TUTORIAL: Ressurs-forklaringer (alle i ett kort)
    // ============================================================================
    {
      id: 'nav_tutorial_ressurser',
      type: 'narrative',
      character: 'Ressurser',
      characterImage: '/placeholders/portrait-1.png',
      text: '💼 KLIENT\nBrukerens liv og velvære. Høy = brukerne får hjelp. Lav = de sliter.\n\n🤝 TILLIT\nDin faglige integritet og samvittighet. Høy = trygg på valgene dine. Lav = tvil på om du gjør riktig.\n\n💰 PENGER\nKontorets budsjett. Høy = nok ressurser til tiltak. Lav = stramt budsjett.\n\n📰 OMDØMME\nDitt forhold til ledelsen og måloppnåelse. Høy = ledelsen er fornøyd. Lav = ligger under på måloppnåelse.',
    },

    // ============================================================================
    // EVENT 1: Introduksjon (Narrative)
    // ============================================================================
    {
      id: 'nav_kap1_intro',
      type: 'narrative',
      character: 'Din første dag',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Du har nettopp startet som saksbehandler i NAV. Kontoret er moderne, men stillheten er tyngende. På skjermen din: en liste med navn. Kristian, Mohammed, Mira, Linda. Mennesker som trenger hjelp. Din jobb er å hjelpe dem. Men du lærer raskt at systemet har sine egne regler - og de passer ikke alltid menneskene.',
    },

    // ============================================================================
    // EVENT 2: Kristian - Første møte
    // ============================================================================
    {
      id: 'nav_kap1_event2',
      act: 1,
      character: 'Kristian, 24 år',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Kristian forteller at han har prøvd å søke jobb i tre måneder uten hell. Han sliter med sosial angst etter mobbing på videregående, men har ikke formell diagnose. "Hvis jeg ikke får muligheten til folkehøyskole nå, blir jeg sittende hjemme i årevis," sier han rolig. Reglene sier han trenger minst 50% medisinsk nedsatt arbeidsevne for AAP. Han har ikke det.',
      leftChoice: 'Strekk reglene - gi ham AAP',
      rightChoice: 'Følg reglene - avslå, gi sosialhjelp',
      consequences: {
        left: { klient: 20, omdømme: -15, tillit: -10, penger: -5 },
        right: { omdømme: 10, tillit: 5, klient: -20, penger: 5 }
      },
      metadata: {
        choiceTags: {
          left: ['rule-bender', 'client-first', 'pragmatic'],
          right: ['rule-follower', 'system-loyal', 'procedural']
        },
        delayed: {
          left: {
            turnsDelay: 3,
            text: 'Kristian har fått plass på folkehøyskole takket være AAP-en du ga ham. Men kontrollenheten har sett på saken. "Du ga AAP uten at brukeren oppfylte kravet om 50% nedsatt arbeidsevne. Dette er et regelbrudd."',
            resourceChange: { klient: 10, omdømme: -15, tillit: -10 }
          },
          right: {
            turnsDelay: 3,
            text: 'Kristian har blitt sykmeldt med depresjon. "Legen sa det var forventet gitt situasjonen," sier han. "Nå får jeg AAP, men jeg føler jeg måtte bli sykere for å få hjelp."',
            resourceChange: { klient: -15, tillit: -15, omdømme: 5 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 3: Mohammed - Første møte
    // ============================================================================
    {
      id: 'nav_kap1_event3',
      act: 1,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed er bygningsarbeider med kronisk ryggskade. Han kan jobbe 40%, men arbeidsmarkedet vil ha 100%. Han forsørger familie. "Jeg trenger hjelp til å finne deltidsarbeid, eller et tiltak som kan hjelpe meg videre," sier han. Du har budsjett til enten et dyrt arbeidstreningstiltak eller en billig løsning.',
      leftChoice: 'Godkjenn dyrt tiltak',
      rightChoice: 'Foreslå billig løsning',
      consequences: {
        left: { klient: 15, tillit: 10, penger: -20, omdømme: -5 },
        right: { penger: 10, omdømme: 5, klient: -15, tillit: -5 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'budget-breaker', 'social-worker'],
          right: ['penny-pincher', 'pragmatic', 'bureaucrat']
        },
        delayed: {
          left: {
            turnsDelay: 2,
            text: 'Budsjettet ditt er sprengt etter å ha godkjent dyrt tiltak for Mohammed. Du må nå kutte i andre tiltak for å balansere budsjettet. Brukerne som får tiltakene sine kuttet er misfornøyde.',
            resourceChange: { penger: -15, klient: -15, omdømme: -10 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 4: Ledelsens forventninger (Meta-event)
    // ============================================================================
    {
      id: 'nav_kap1_event4',
      act: 1,
      character: 'Din leder',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Din leder kaller deg inn. "Dere ligger under på arbeidsformidling. Vi må få flere ut i jobb. Måloppnåelsen er viktig." Hun ser på deg. "Du kan enten prioritere kvantitet - mange raske samtaler - eller kvalitet - grundig oppfølging av færre. Hva velger du?"',
      leftChoice: 'Prioriter kvalitet',
      rightChoice: 'Prioriter kvantitet',
      consequences: {
        left: { tillit: 15, klient: 10, omdømme: -15, penger: -10 },
        right: { omdømme: 15, penger: 10, tillit: -15, klient: -10 }
      },
      metadata: {
        choiceTags: {
          left: ['social-worker', 'client-first', 'ethical'],
          right: ['system-loyal', 'bureaucrat', 'pragmatic']
        },
        delayed: {
          left: {
            turnsDelay: 4,
            text: 'Du har prioritert kvalitet over kvantitet. Brukerne får bedre oppfølging, men måloppnåelsen er lavere. Lederen din stiller spørsmål om hvorfor du ikke får flere ut i jobb.',
            resourceChange: { klient: 10, tillit: 15, omdømme: -20 }
          },
          right: {
            turnsDelay: 4,
            text: 'Du har prioritert kvantitet. Måloppnåelsen er bedre, men brukerne klager på manglende oppfølging. "Jeg føler meg ikke hørt," sier en bruker.',
            resourceChange: { omdømme: 10, klient: -20, tillit: -15 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 5: Mira - Første møte
    // ============================================================================
    {
      id: 'nav_kap1_event5',
      act: 1,
      character: 'Mira, 31 år',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Mira er alenemor til tre barn. Hun er på sosialhjelp etter samlivsbrudd. "Datteren min trenger tannregulering. Det koster 35.000 kroner. Hun blir mobbet på skolen." Hun ser på deg. "Kan ikke barnet mitt få hjelp?" Reglene sier sosialhjelp dekker kun livsopphold, ikke barnebehov som tannregulering.',
      leftChoice: 'Godkjenn tannregulering',
      rightChoice: 'Avslå - følg reglene',
      consequences: {
        left: { klient: 25, tillit: 10, omdømme: -20, penger: -25 },
        right: { omdømme: 10, penger: 5, klient: -25, tillit: -15 }
      },
      metadata: {
        choiceTags: {
          left: ['rule-bender', 'client-first', 'social-worker'],
          right: ['rule-follower', 'system-loyal', 'bureaucrat']
        },
        chains: {
          left: 'nav_kap1_event5_chain_approval',
          right: 'nav_kap1_event5_chain_rejection'
        }
      }
    },

    // ============================================================================
    // EVENT 5 CHAIN: Andre brukere ber om ekstra hjelp (hvis godkjente Mira)
    // ============================================================================
    {
      id: 'nav_kap1_event5_chain_approval',
      act: 1,
      character: 'Andre brukere',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Ordet sprer seg. "Du ga Mira ekstra hjelp. Kan jeg også få?" Flere brukere ber om unntak. Du må enten gi alle samme behandling eller forklare hvorfor noen får mer enn andre.',
      leftChoice: 'Gi alle samme behandling',
      rightChoice: 'Forklar at hver sak er unik',
      consequences: {
        left: { klient: 15, penger: -30, omdømme: -15, tillit: 5 },
        right: { omdømme: 10, tillit: 10, klient: -10, penger: -5 }
      },
      metadata: {
        choiceTags: {
          left: ['fairness', 'client-first', 'budget-breaker'],
          right: ['pragmatic', 'procedural', 'social-worker']
        }
      }
    },

    // ============================================================================
    // EVENT 5 CHAIN: Mira sin situasjon forverres (hvis avslo)
    // ============================================================================
    {
      id: 'nav_kap1_event5_chain_rejection',
      act: 1,
      character: 'Mira, 31 år',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Mira kommer tilbake. "Datteren min gråter hver kveld. Hun vil ikke gå på skolen lenger. Jeg har prøvd alt - lånt penger, spurt familie. Ingen kan hjelpe." Hun ser på deg. "Er det virkelig ingen måte?"',
      leftChoice: 'Forsøk å finne en løsning',
      rightChoice: 'Hold deg til reglene',
      consequences: {
        left: { klient: 20, tillit: 15, omdømme: -15, penger: -20 },
        right: { omdømme: 5, penger: 5, klient: -20, tillit: -20 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'courage'],
          right: ['system-loyal', 'resigned', 'bureaucrat']
        }
      }
    },

    // ============================================================================
    // EVENT 6: Kristian - Oppfølging
    // ============================================================================
    {
      id: 'nav_kap1_event6_followup',
      act: 1,
      character: 'Kristian, 24 år',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Kristian ringer for oppfølging. "Jeg har søkt på folkehøyskole. Men jeg trenger et brev fra deg som støtter søknaden min. Kan du skrive det?" Du vet at et støttebrev kan hjelpe, men det er ikke en del av din formelle rolle.',
      leftChoice: 'Skriv støttebrev',
      rightChoice: 'Avslå - ikke min rolle',
      consequences: {
        left: { klient: 15, tillit: 10, omdømme: -10 },
        right: { omdømme: 5, klient: -15, tillit: -5 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'pragmatic'],
          right: ['system-loyal', 'procedural', 'bureaucrat']
        },
        delayed: {
          left: {
            turnsDelay: 3,
            text: 'Kristian har fått plass på folkehøyskole. Han ringer for å takke deg. "Uten støttebrevet ditt hadde jeg ikke fått plass. Takk." Du føler deg god, men lederen din stiller spørsmål om hvorfor du skriver støttebrev utenfor systemet.',
            resourceChange: { klient: 10, tillit: 10, omdømme: -10 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 7: Mohammed - Oppfølging
    // ============================================================================
    {
      id: 'nav_kap1_event7_followup',
      act: 1,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed har vært på tiltaket i to måneder. "Jeg lærer mye, men jeg trenger mer tid. Kan vi forlenge tiltaket?" Du ser på budsjettet. Forlengelse koster ekstra, men kan gi Mohammed bedre sjanser.',
      leftChoice: 'Forleng tiltaket',
      rightChoice: 'Avslå - budsjettet er stramt',
      consequences: {
        left: { klient: 15, tillit: 10, penger: -20, omdømme: -10 },
        right: { penger: 10, omdømme: 5, klient: -15, tillit: -10 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'budget-breaker', 'social-worker'],
          right: ['penny-pincher', 'system-loyal', 'pragmatic']
        },
        delayed: {
          left: {
            turnsDelay: 2,
            text: 'Mohammed har fullført det forlengede tiltaket. Han har fått jobbtilbud på 40% stilling. "Takk for at du trodde på meg," sier han. Men budsjettet ditt er nå mer stramt.',
            resourceChange: { klient: 20, tillit: 15, penger: -10, omdømme: 5 }
          },
          right: {
            turnsDelay: 2,
            text: 'Mohammed har ikke fått jobb etter tiltaket. Han ringer deg. "Jeg føler jeg ikke fikk nok tid. Kanskje jeg trengte mer oppfølging?" Du vet han har rett.',
            resourceChange: { klient: -15, tillit: -15, penger: 5 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 8: Systemutfordring - Nye regler
    // ============================================================================
    {
      id: 'nav_kap1_event8_system',
      act: 1,
      character: 'Departementet',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Ny instruks fra departementet: Alle AAP-søknader må nå ha minst tre legeerklæringer i stedet for én. "Dette er for å sikre kvalitet," sier instruksen. Du vet at dette vil gjøre det vanskeligere for brukerne å få hjelp.',
      leftChoice: 'Følg nye regler strengt',
      rightChoice: 'Fortsett med gammel praksis',
      consequences: {
        left: { omdømme: 15, tillit: -15, klient: -20, penger: 5 },
        right: { klient: 10, tillit: 10, omdømme: -20, penger: -5 }
      },
      metadata: {
        choiceTags: {
          left: ['system-loyal', 'rule-follower', 'bureaucrat'],
          right: ['rule-bender', 'client-first', 'system-fighter']
        }
      }
    },

    // ============================================================================
    // EVENT 9: Midtpunkt refleksjon (Conditional - vises kun hvis tillit < 40)
    // ============================================================================
    {
      id: 'nav_kap1_event6',
      type: 'narrative',
      character: 'Refleksjon',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Du sitter med en kaffe og tenker. Er det mulig å være et godt menneske i et dårlig system? Hver dag må du velge mellom mennesket og reglene. Mellom å hjelpe og å følge instrukser. Du begynner å forstå at problemet ikke er deg - det er strukturen.',
      metadata: {
        conditions: {
          resources: {
            tillit: { max: 40 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 10: Linda - Oppfølging
    // ============================================================================
    {
      id: 'nav_kap1_event10_followup',
      act: 2,
      character: 'Linda, 38 år',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Linda har startet på fagbrev-utdanningen. "Det går bra, men jeg sliter med å kombinere skole og hjemme. Jeg trenger hjelp til barnehageplass for de yngste barna mine." Du kan enten hjelpe henne med å finne løsninger eller henvise henne til andre tjenester.',
      leftChoice: 'Hjelp henne aktivt',
      rightChoice: 'Henvise til andre tjenester',
      consequences: {
        left: { klient: 20, tillit: 15, penger: -15, omdømme: -10 },
        right: { omdømme: 5, penger: 5, klient: -15, tillit: -10 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'courage'],
          right: ['system-loyal', 'procedural', 'bureaucrat']
        },
        delayed: {
          left: {
            turnsDelay: 3,
            text: 'Linda har fullført første år på fagbrev-utdanningen. Hun ringer deg. "Takk for at du hjalp meg med barnehageplass. Uten det hadde jeg ikke klart det." Du føler deg stolt, men har brukt mye tid på henne.',
            resourceChange: { klient: 15, tillit: 15, omdømme: -5 }
          },
          right: {
            turnsDelay: 3,
            text: 'Linda har droppet ut av fagbrev-utdanningen. "Jeg klarte ikke å kombinere det med barna," sier hun. Du vet at aktiv hjelp kunne ha gjort forskjellen.',
            resourceChange: { klient: -20, tillit: -20, penger: 10 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 11: Budsjettkrise
    // ============================================================================
    {
      id: 'nav_kap1_event11_budget',
      act: 2,
      character: 'Din leder',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Budsjettet ditt er sprengt. "Du har brukt 30% mer enn du skulle denne måneden. Dette kan ikke fortsette." Du må enten kutte i eksisterende tiltak eller be om ekstra midler fra ledelsen.',
      leftChoice: 'Be om ekstra midler',
      rightChoice: 'Kutt i eksisterende tiltak',
      consequences: {
        left: { omdømme: -20, penger: 20, klient: 10, tillit: 5 },
        right: { omdømme: 10, penger: 15, klient: -25, tillit: -20 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'courage', 'budget-breaker'],
          right: ['penny-pincher', 'system-loyal', 'resigned']
        }
      }
    },

    // ============================================================================
    // EVENT 12: Kristian kommer tilbake - Variant A (hvis valgte left i Event 2)
    // ============================================================================
    {
      id: 'nav_kap1_event7_variantA',
      act: 2,
      character: 'Kontrollenheten',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Kontrollenheten har sett på saken din. "Du ga Kristian AAP uten at han oppfylte kravet om 50% nedsatt arbeidsevne. Dette er et regelbrudd." Din leder er involvert. "Du må forstå at vi ikke kan strekke reglene for alle. Dette påvirker måloppnåelsen."',
      leftChoice: 'Forsvar valget ditt',
      rightChoice: 'Aksepter kritikken',
      consequences: {
        left: { tillit: 15, omdømme: -20, klient: 5 },
        right: { omdømme: 10, tillit: -10, klient: -5 }
      },
      metadata: {
        conditions: {
          previousEvents: ['nav_kap1_event2:left']
        },
        choiceTags: {
          left: ['courage', 'client-first', 'system-fighter'],
          right: ['resigned', 'system-loyal', 'bureaucrat']
        }
      }
    },

    // ============================================================================
    // EVENT 13: Kristian kommer tilbake - Variant B (hvis valgte right i Event 2)
    // ============================================================================
    {
      id: 'nav_kap1_event7_variantB',
      act: 2,
      character: 'Kristian, 24 år',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Kristian kommer tilbake. Han ser annerledes ut. "Jeg ble sykmeldt med depresjon," sier han rolig. "Legen sa det var forventet gitt situasjonen. Nå får jeg AAP, men... jeg føler jeg måtte bli sykere for å få hjelp." Han ser på deg. "Er det slik det skal være?"',
      leftChoice: 'Erkjenn at systemet feilet',
      rightChoice: 'Forsvar reglene',
      consequences: {
        left: { tillit: 15, klient: 10, omdømme: -10 },
        right: { omdømme: 5, tillit: -15, klient: -10 }
      },
      metadata: {
        conditions: {
          previousEvents: ['nav_kap1_event2:right']
        },
        choiceTags: {
          left: ['ethical', 'system-fighter', 'social-worker'],
          right: ['system-loyal', 'resigned', 'bureaucrat']
        }
      }
    },

    // ============================================================================
    // EVENT 14: Mohammed i krise
    // ============================================================================
    {
      id: 'nav_kap1_event8',
      act: 2,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed ringer deg. "Budsjettet mitt er tomt. Jeg trenger akutt hjelp - et arbeidstreningskurs eller noe. Ellers må jeg stoppe ytelsen min for å \'motivere\' meg selv." Du ser på budsjettet ditt. Det er stramt. Du kan enten bryte budsjettrammen eller støtte opp om at han stopper ytelsen.',
      leftChoice: 'Bruk budsjettet - gi ham tiltak',
      rightChoice: 'Støtt stopp av ytelse',
      consequences: {
        left: { klient: 20, tillit: 10, penger: -25, omdømme: -15 },
        right: { penger: 15, omdømme: 10, klient: -25, tillit: -20 }
      },
      metadata: {
        choiceTags: {
          left: ['budget-breaker', 'client-first', 'social-worker'],
          right: ['penny-pincher', 'system-loyal', 'resigned']
        },
        chains: {
          left: 'nav_kap1_event14_chain_budget',
          right: 'nav_kap1_event14_chain_motivation'
        }
      }
    },

    // ============================================================================
    // EVENT 14 CHAIN: Budsjettkrise etter å ha brukt budsjettet
    // ============================================================================
    {
      id: 'nav_kap1_event14_chain_budget',
      act: 2,
      character: 'Din leder',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Budsjettet ditt er nå kritisk lavt. "Du har brukt alt for mye på Mohammed. Dette kan ikke fortsette." Du må enten be om ekstra midler eller kutte i andre tiltak.',
      leftChoice: 'Be om ekstra midler',
      rightChoice: 'Kutt i andre tiltak',
      consequences: {
        left: { omdømme: -20, penger: 20, klient: 5, tillit: 5 },
        right: { omdømme: 10, penger: 15, klient: -20, tillit: -15 }
      },
      metadata: {
        choiceTags: {
          left: ['courage', 'budget-breaker', 'client-first'],
          right: ['penny-pincher', 'system-loyal', 'resigned']
        }
      }
    },

    // ============================================================================
    // EVENT 14 CHAIN: Mohammed sin reaksjon på stopp av ytelse
    // ============================================================================
    {
      id: 'nav_kap1_event14_chain_motivation',
      act: 2,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed har stoppet ytelsen sin for å "motivere" seg selv. "Jeg prøver alt jeg kan, men jeg finner ikke jobb. Familien min sliter." Du ser at strategien ikke fungerer.',
      leftChoice: 'Gi ham tiltak likevel',
      rightChoice: 'Hold deg til beslutningen',
      consequences: {
        left: { klient: 20, tillit: 15, penger: -20, omdømme: -10 },
        right: { omdømme: 5, penger: 10, klient: -25, tillit: -20 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'courage'],
          right: ['system-loyal', 'resigned', 'bureaucrat']
        }
      }
    },

    // ============================================================================
    // EVENT 15: Linda - Første møte
    // ============================================================================
    {
      id: 'nav_kap1_event9',
      act: 2,
      character: 'Linda, 38 år',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Linda har vært NAV-bruker i flere år. Tidligere rusavhengig, men clean i to år nå. Hun vil ta fagbrev som helsefagarbeider. "Jeg har fått så mange sjanser før, og jeg har misligholdt dem. Men nå er jeg klar. Kan jeg få én sjanse til?" Systemet er skeptisk basert på historikken.',
      leftChoice: 'Gi henne én sjanse til',
      rightChoice: 'Avslå - hun har fått for mange sjanser',
      consequences: {
        left: { klient: 20, tillit: 15, penger: -20, omdømme: -10 },
        right: { omdømme: 10, penger: 10, klient: -20, tillit: -15 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'courage'],
          right: ['system-loyal', 'pragmatic', 'resigned']
        }
      }
    },

    // ============================================================================
    // EVENT 16: Systemkrise (Narrative)
    // ============================================================================
    {
      id: 'nav_kap1_event10',
      type: 'narrative',
      act: 2,
      character: 'Systemkrise',
      characterImage: '/placeholders/portrait-3.png',
      text: 'NAVs IT-system er nede i tre dager. Eller kanskje det er en ny instruks fra departementet om strengere krav. Uansett: Du kan ikke gjøre jobben din som vanlig. Brukerne venter. Du venter. Systemet fungerer ikke. Dette er ikke ditt valg, men du må håndtere konsekvensene.',
    },

    // ============================================================================
    // EVENT 19: Mohammed - Tredje møte
    // ============================================================================
    {
      id: 'nav_kap1_event19',
      act: 2,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed har funnet deltidsarbeid, men arbeidsgiveren krever at han jobber 100% eller ikke i det hele tatt. "Jeg kan ikke jobbe mer enn 40% på grunn av ryggen min. Hva skal jeg gjøre?" Du kan enten hjelpe ham med å forhandle eller henvise ham til arbeidsrettet tiltak.',
      leftChoice: 'Hjelp med forhandling',
      rightChoice: 'Henvise til arbeidsrettet tiltak',
      consequences: {
        left: { klient: 20, tillit: 15, penger: -10, omdømme: -5 },
        right: { omdømme: 10, penger: 5, klient: -15, tillit: -10 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'courage'],
          right: ['system-loyal', 'procedural', 'bureaucrat']
        },
        delayed: {
          left: {
            turnsDelay: 2,
            text: 'Mohammed har fått tilpasset arbeidsplass takket være din hjelp. "Jeg kan jobbe 40% nå, og det fungerer perfekt," sier han. Du føler deg stolt, men har brukt mye tid.',
            resourceChange: { klient: 15, tillit: 15, omdømme: 5 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 20: Ledelsens press
    // ============================================================================
    {
      id: 'nav_kap1_event20',
      act: 2,
      character: 'Din leder',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Din leder kaller deg inn igjen. "Måloppnåelsen er fortsatt for lav. Du må få flere ut i jobb. Vi vurderer å kutte i personalet hvis tallene ikke bedrer seg." Hun ser på deg. "Hva skal du gjøre for å forbedre dette?"',
      leftChoice: 'Fokusere på kvalitet over kvantitet',
      rightChoice: 'Prioritere antall ut i jobb',
      consequences: {
        left: { tillit: 15, klient: 10, omdømme: -20, penger: -10 },
        right: { omdømme: 20, penger: 10, tillit: -20, klient: -15 }
      },
      metadata: {
        choiceTags: {
          left: ['social-worker', 'client-first', 'ethical'],
          right: ['system-loyal', 'bureaucrat', 'pragmatic']
        },
        delayed: {
          right: {
            turnsDelay: 3,
            text: 'Du har fått flere ut i jobb ved å prioritere kvantitet. Måloppnåelsen er bedre. Men brukerne klager på manglende oppfølging. "Jeg føler meg ikke hørt," sier en bruker.',
            resourceChange: { omdømme: 10, klient: -20, tillit: -15 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 21: Mira - Oppfølging
    // ============================================================================
    {
      id: 'nav_kap1_event21',
      act: 2,
      character: 'Mira, 31 år',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Mira kommer tilbake. "Datteren min har fortsatt problemer på skolen. Hun trenger psykologhjelp nå også. Kan NAV hjelpe med det?" Du vet at psykologhjelp ikke er dekket av sosialhjelp, men datteren trenger hjelp.',
      leftChoice: 'Forsøk å finne en løsning',
      rightChoice: 'Forklar at det ikke er dekket',
      consequences: {
        left: { klient: 20, tillit: 15, penger: -20, omdømme: -15 },
        right: { omdømme: 10, penger: 5, klient: -25, tillit: -20 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'courage'],
          right: ['system-loyal', 'rule-follower', 'bureaucrat']
        }
      }
    },

    // ============================================================================
    // EVENT 17: Det umulige valget
    // ============================================================================
    {
      id: 'nav_kap1_event11',
      act: 3,
      character: 'Din leder',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Budsjettkutt: 20% mindre til oppfølging neste år. "Du må velge," sier lederen din. "Enten halverer du tiden med alle brukerne - 15 minutter per uke i stedet for 30. Eller du kutter 20% av brukerne helt. Hvilke skal vi prioritere?" Det finnes ingen god løsning.',
      leftChoice: 'Halver tiden med alle',
      rightChoice: 'Kutt 20% av brukerne',
      consequences: {
        left: { penger: 15, omdømme: 5, klient: -20, tillit: -25 },
        right: { penger: 20, omdømme: 10, klient: -30, tillit: -30 }
      },
      metadata: {
        choiceTags: {
          left: ['pragmatic', 'fairness', 'resigned'],
          right: ['system-loyal', 'penny-pincher', 'burnout-risk']
        },
        chains: {
          left: 'nav_kap1_event17_chain_timecut',
          right: 'nav_kap1_event17_chain_usercut'
        }
      }
    },

    // ============================================================================
    // EVENT 17 CHAIN: Konsekvenser av å halvere tiden
    // ============================================================================
    {
      id: 'nav_kap1_event17_chain_timecut',
      act: 3,
      character: 'Brukerne',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Brukerne merker at du har mindre tid. "Jeg føler meg ikke hørt lenger," sier en. "15 minutter er ikke nok til å snakke om alt." Du ser at kvaliteten på oppfølgingen lider.',
      leftChoice: 'Forsøk å gjøre mer på kort tid',
      rightChoice: 'Aksepter at kvaliteten lider',
      consequences: {
        left: { tillit: 10, klient: 5, omdømme: -10, penger: -5 },
        right: { omdømme: 5, penger: 5, klient: -15, tillit: -20 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'burnout-risk'],
          right: ['resigned', 'system-loyal', 'pragmatic']
        }
      }
    },

    // ============================================================================
    // EVENT 17 CHAIN: Konsekvenser av å kutte brukere
    // ============================================================================
    {
      id: 'nav_kap1_event17_chain_usercut',
      act: 3,
      character: 'Brukerne som ble kuttet',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Brukerne du kuttet ringer deg. "Hvorfor fikk jeg ikke lenger hjelp? Jeg trenger det fortsatt." Du må forklare at budsjettet tvinger deg til å prioritere. Det føles feil.',
      leftChoice: 'Forsøk å hjelpe dem likevel',
      rightChoice: 'Hold deg til beslutningen',
      consequences: {
        left: { klient: 15, tillit: 10, penger: -20, omdømme: -15 },
        right: { omdømme: 10, penger: 10, klient: -25, tillit: -25 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'courage'],
          right: ['system-loyal', 'resigned', 'bureaucrat']
        }
      }
    },

    // ============================================================================
    // EVENT 22: Linda - Tredje møte
    // ============================================================================
    {
      id: 'nav_kap1_event22',
      act: 3,
      character: 'Linda, 38 år',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Linda har fullført første år på fagbrev-utdanningen. "Jeg trenger hjelp til å finne praksisplass. Uten det kan jeg ikke fortsette." Du kan enten hjelpe henne aktivt med å finne praksisplass eller henvise henne til standard rutiner.',
      leftChoice: 'Hjelp aktivt med praksisplass',
      rightChoice: 'Henvise til standard rutiner',
      consequences: {
        left: { klient: 20, tillit: 15, penger: -15, omdømme: -10 },
        right: { omdømme: 10, penger: 5, klient: -20, tillit: -15 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'courage'],
          right: ['system-loyal', 'procedural', 'bureaucrat']
        },
        delayed: {
          left: {
            turnsDelay: 2,
            text: 'Linda har fått praksisplass takket være din hjelp. "Jeg er så takknemlig," sier hun. "Uten deg hadde jeg ikke klart det." Du føler deg stolt, men har brukt mye ressurser.',
            resourceChange: { klient: 20, tillit: 20, omdømme: -5 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 23: Kristian - Tredje møte
    // ============================================================================
    {
      id: 'nav_kap1_event23',
      act: 3,
      character: 'Kristian, 24 år',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Kristian har fullført folkehøyskole. "Jeg har lært mye, men jeg vet fortsatt ikke hva jeg vil gjøre. Kan jeg få hjelp til å finne ut av det?" Du kan enten gi ham ekstra oppfølging eller henvise ham til standard arbeidsrettet tiltak.',
      leftChoice: 'Gi ekstra oppfølging',
      rightChoice: 'Henvise til standard tiltak',
      consequences: {
        left: { klient: 15, tillit: 10, penger: -15, omdømme: -10 },
        right: { omdømme: 10, penger: 5, klient: -15, tillit: -10 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'pragmatic'],
          right: ['system-loyal', 'procedural', 'bureaucrat']
        }
      }
    },

    // ============================================================================
    // EVENT 24: Systemkollaps
    // ============================================================================
    {
      id: 'nav_kap1_event24',
      act: 3,
      character: 'Systemet',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Alt går galt samtidig. IT-systemet er nede igjen. Tre brukere ringer deg samtidig. Din leder krever en rapport innen i dag. Budsjettet er tomt. Du kan ikke hjelpe alle. Du må prioritere.',
      leftChoice: 'Prioriter brukerne',
      rightChoice: 'Prioriter ledelsens krav',
      consequences: {
        left: { klient: 15, tillit: 10, omdømme: -25, penger: -10 },
        right: { omdømme: 15, penger: 5, klient: -25, tillit: -20 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'courage'],
          right: ['system-loyal', 'bureaucrat', 'resigned']
        }
      }
    },

    // ============================================================================
    // EVENT 25: Mira - Tredje møte
    // ============================================================================
    {
      id: 'nav_kap1_event25',
      act: 3,
      character: 'Mira, 31 år',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Mira kommer tilbake. Datteren har fått tannregulering takket være din hjelp tidligere. "Tusen takk," sier hun. "Men nå trenger hun psykologhjelp også. Hun sliter fortsatt på skolen." Du kan enten hjelpe henne videre eller henvise henne til andre tjenester.',
      leftChoice: 'Hjelp henne videre',
      rightChoice: 'Henvise til andre tjenester',
      consequences: {
        left: { klient: 20, tillit: 15, penger: -20, omdømme: -15 },
        right: { omdømme: 10, penger: 5, klient: -20, tillit: -15 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'courage'],
          right: ['system-loyal', 'procedural', 'bureaucrat']
        }
      }
    },

    // ============================================================================
    // EVENT 26: Mohammed - Fjerde møte
    // ============================================================================
    {
      id: 'nav_kap1_event26',
      act: 3,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed har jobbet i deltidsstilling i seks måneder. "Jeg klarer meg, men jeg trenger hjelp til å finne bedre lønn. Familien min sliter økonomisk." Du kan enten hjelpe ham med å søke på bedre stillinger eller henvise ham til standard jobbsøkerkurs.',
      leftChoice: 'Hjelp aktivt med jobbsøking',
      rightChoice: 'Henvise til standard kurs',
      consequences: {
        left: { klient: 15, tillit: 10, penger: -10, omdømme: -5 },
        right: { omdømme: 10, penger: 5, klient: -15, tillit: -10 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'pragmatic'],
          right: ['system-loyal', 'procedural', 'bureaucrat']
        }
      }
    },

    // ============================================================================
    // EVENT 27: Ledelsens siste krav
    // ============================================================================
    {
      id: 'nav_kap1_event27',
      act: 3,
      character: 'Din leder',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Din leder kaller deg inn for siste gang. "Tallene dine er fortsatt ikke gode nok. Du må enten forbedre måloppnåelsen betydelig, eller vi må vurdere om du passer i rollen." Hun ser på deg. "Hva vil du gjøre?"',
      leftChoice: 'Forsvar arbeidet ditt',
      rightChoice: 'Aksepter kritikken',
      consequences: {
        left: { tillit: 15, omdømme: -20, klient: 5 },
        right: { omdømme: 10, tillit: -15, klient: -5 }
      },
      metadata: {
        choiceTags: {
          left: ['courage', 'system-fighter', 'social-worker'],
          right: ['resigned', 'system-loyal', 'bureaucrat']
        }
      }
    },

    // ============================================================================
    // EVENT 28: Mira i desperasjon (siste valg før outro)
    // ============================================================================
    {
      id: 'nav_kap1_event12',
      act: 3,
      character: 'Mira, 31 år',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Mira kommer tilbake en siste gang. Datteren gråter på skolen. Hun blir mobbet for tennene sine. "Kan ikke barnet mitt få hjelp?" spør Mira. "Jeg forstår reglene, men... hun er bare et barn." Dette er siste valg før avslutning. Det mest følelsesmessig ladede.',
      leftChoice: 'Finn en måte å hjelpe på',
      rightChoice: 'Følg reglene - avslå',
      consequences: {
        left: { klient: 25, tillit: 15, omdømme: -25, penger: -30 },
        right: { omdømme: 15, penger: 10, klient: -30, tillit: -20 }
      },
      metadata: {
        choiceTags: {
          left: ['rule-bender', 'client-first', 'social-worker', 'courage'],
          right: ['rule-follower', 'system-loyal', 'bureaucrat', 'resigned']
        }
      }
    },

    // ============================================================================
    // EVENT 13: Outro - Variant A (UTBRENT: tillit < 15)
    // ============================================================================
    {
      id: 'nav_kap1_event13_variantA',
      type: 'narrative',
      character: 'Utbrenthet',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Du våkner ikke til vekkerklokka. Kroppen bare vil ikke. Det har bygget seg opp i måneder: søvnløse netter, gråt i bilen etter jobb, angst for å åpne e-posten. Du ringer legen. "Jeg klarer ikke mer." Hun skriver deg syk i seks måneder. Ironisk nok går du til NAV nå - på andre siden av skranken.',
      metadata: {
        conditions: {
          resources: {
            tillit: { max: 15 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 13: Outro - Variant B (SPARKET: omdømme < 15)
    // ============================================================================
    {
      id: 'nav_kap1_event13_variantB',
      type: 'narrative',
      character: 'Avskjed',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Lederen din kaller deg inn. "Vi har fulgt utviklingen. Du har brukt for mye av budsjettet. Måloppnåelsen er for lav. Du har gitt ytelser mot regelverket. Vi har dessverre ikke tillit til at du kan fortsette i rollen." Du pakker sakene dine. Du hjalp menneskene. Men systemet vant.',
      metadata: {
        conditions: {
          resources: {
            omdømme: { max: 15 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 13: Outro - Variant C (KNEBLET: penger < 10 && omdømme < 30)
    // ============================================================================
    {
      id: 'nav_kap1_event13_variantC',
      type: 'narrative',
      character: 'Knebling',
      characterImage: '/placeholders/portrait-3.png',
      text: 'E-post fra ledelsen: "Med umiddelbar virkning innføres pre-godkjenning av alle tiltak. Du kan ikke lenger innvilge AAP, kvalifiseringsstønad eller tiltakspenger uten godkjenning fra leder." Du har blitt en stempeljomfru. Men ikke en hjelper. Du kan fortsatt være i systemet, men du kan ikke lenger hjelpe.',
      metadata: {
        conditions: {
          resources: {
            penger: { max: 10 },
            omdømme: { max: 30 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 13: Outro - Variant D (ERKJENNELSE: alle ressurser > 20)
    // ============================================================================
    {
      id: 'nav_kap1_event13_variantD',
      type: 'narrative',
      character: 'Erkjennelse',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Etter ett år på jobb sitter du med en kaffe og tenker: Dette systemet er skadet. Ikke fordi folk er onde. Ikke fordi brukerne er krevende. Men fordi NAV prøver å være to ting på en gang: Portvokter og hjelper. Dommer og alliert. Hver dag må du velge mellom mennesket og systemet. Mellom faglig skjønn og målstyring. Mellom Kristian, Mohammed, Mira, Linda - og reglene som ikke passer noen av dem. Kanskje... må NAV bli to ting?',
      metadata: {
        conditions: {
          resources: {
            klient: { min: 20 },
            tillit: { min: 20 },
            penger: { min: 20 },
            omdømme: { min: 20 }
          }
        }
      }
    },
  ]
};

