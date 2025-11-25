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
    // ACT 1: BYRÅKRATISK INTRODUKSJON (Event 4-15)
    // ============================================================================

    // ============================================================================
    // KRISTIAN (24 år) - Sosial Angst - 3 kort
    // ============================================================================
    
    {
      id: 'nav_kristian_1',
      act: 1,
      character: 'Kristian, 24 år',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Kristian søker om midlertidig fritak fra aktivitetsplikt. Han viser frem legenotater som beskriver sosial angst. Legen anbefaler gradvis tilnærming til arbeidsmarkedet. Standard prosedyre krever tilleggsutredning fra spesialist.',
      leftChoice: 'Godkjenn 3 måneders fritak',
      rightChoice: 'Krev tilleggsutredning',
      consequences: {
        left: { klient: 5, tillit: 3, omdømme: -5, penger: -3 },
        right: { omdømme: 5, penger: 2, klient: -2, tillit: 2 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'pragmatic', 'social-worker'],
          right: ['procedural', 'system-loyal', 'bureaucrat']
        }
      }
    },

    {
      id: 'nav_kristian_2',
      act: 1,
      character: 'Kristian, 24 år',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Kristian ber om forlengelse av fristen for jobbsøkingslogg. Han har sendt 5 søknader, men trenger mer tid per søknad for å gjøre det ordentlig. Standard frist er 1 uke, han ber om 2 uker.',
      leftChoice: 'Gi 2 ukers frist',
      rightChoice: 'Standard 1 uke',
      consequences: {
        left: { klient: 4, tillit: 2, omdømme: -4, penger: -2 },
        right: { omdømme: 4, penger: 2, klient: -2, tillit: 2 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'flexible', 'social-worker'],
          right: ['procedural', 'system-loyal', 'efficient']
        }
      }
    },

    {
      id: 'nav_kristian_3',
      act: 1,
      character: 'Kristian, 24 år',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Kristian ønsker plass på et mindre jobbsøkerkurs. Kurset har 8 deltakere i stedet for standard 20. Det koster 4.000kr mer, men han mener det vil være lettere for ham å delta aktivt.',
      leftChoice: 'Godkjenn lite kurs',
      rightChoice: 'Standard stort kurs',
      consequences: {
        left: { klient: 5, tillit: 3, penger: -5, omdømme: -4 },
        right: { omdømme: 5, penger: 3, klient: -3, tillit: 2 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'budget-breaker', 'social-worker'],
          right: ['penny-pincher', 'system-loyal', 'efficient']
        },
        delayed: {
          right: {
            turnsDelay: 10,
            text: 'Kristian møtte ikke opp på kursdag 2. Han sender en melding: "Det var for mange mennesker. Jeg klarte ikke mer."',
            resourceChange: { klient: -8, tillit: -6 }
          }
        }
      }
    },

    // ============================================================================
    // MOHAMMED (45 år) - Ryggskade - 3 kort
    // ============================================================================

    {
      id: 'nav_mohammed_1',
      act: 1,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed ber om godkjenning for ergonomisk kontorstol til hjemmekontor. Fysioterapeuten har anbefalt dette i en rapport. Stolen koster 3.500kr. Standard prosedyre krever tilleggsutredning fra NAV-lege.',
      leftChoice: 'Godkjenn raskt',
      rightChoice: 'Krev tilleggsutredning',
      consequences: {
        left: { klient: 5, tillit: 3, penger: -5, omdømme: -4 },
        right: { omdømme: 5, penger: 3, klient: -3, tillit: 2 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'pragmatic', 'social-worker'],
          right: ['procedural', 'system-loyal', 'bureaucrat']
        }
      }
    },

    {
      id: 'nav_mohammed_2',
      act: 1,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed vil bytte fra jobbsøkerkurs til arbeidstrening. Arbeidstreningplassen er mer praktisk rettet, men koster 8.000kr mer over 3 måneder. Han mener det passer bedre med hans fysiske begrensninger.',
      leftChoice: 'Godkjenn byttet',
      rightChoice: 'Følg opprinnelig plan',
      consequences: {
        left: { klient: 6, tillit: 4, penger: -6, omdømme: -5 },
        right: { omdømme: 6, penger: 4, klient: -4, tillit: 3 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'flexible', 'budget-breaker'],
          right: ['procedural', 'system-loyal', 'penny-pincher']
        }
      }
    },

    {
      id: 'nav_mohammed_3',
      act: 1,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed ber om godkjenning for drosje til arbeidstrening i stedet for buss. Bussen har mange trapper og tar 50 minutter. Drosje koster 150kr per dag ekstra, men tar 15 minutter og er uten trapper.',
      leftChoice: 'Godkjenn drosje',
      rightChoice: 'Standard buss',
      consequences: {
        left: { klient: 5, tillit: 3, penger: -5, omdømme: -4 },
        right: { omdømme: 5, penger: 3, klient: -3, tillit: 2 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'budget-breaker', 'social-worker'],
          right: ['penny-pincher', 'system-loyal', 'efficient']
        },
        delayed: {
          right: {
            turnsDelay: 11,
            text: 'Mohammed har sluttet på arbeidstreningplassen. Han skriver: "Reisen tok for mye energi. Jeg brukte hele dagen på det."',
            resourceChange: { klient: -8, tillit: -6 }
          }
        }
      }
    },

    // ============================================================================
    // MIRA (31 år) - Alenemor - 3 kort
    // ============================================================================

    {
      id: 'nav_mira_1',
      act: 1,
      character: 'Mira, 31 år',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Mira ber om 500kr til transport til jobbintervju utenfor byen. Dette dekkes normalt ikke, men kan vurderes i spesielle tilfeller. Hun har tre barn og kan ikke låne bil.',
      leftChoice: 'Godkjenn transportstøtte',
      rightChoice: 'Forklar at det ikke dekkes',
      consequences: {
        left: { klient: 5, tillit: 3, penger: -5, omdømme: -4 },
        right: { omdømme: 5, penger: 2, klient: -3, tillit: 2 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'rule-bender', 'social-worker'],
          right: ['rule-follower', 'system-loyal', 'procedural']
        }
      }
    },

    {
      id: 'nav_mira_2',
      act: 1,
      character: 'Mira, 31 år',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Mira ber om fast møtetid kl 08:00 eller 16:00. Barnehagen åpner kl 07:30 og stenger kl 16:30. Standard møtetid er kl 10:00. Dette krever tilpasning av din kalender.',
      leftChoice: 'Tilby fleksibel tid',
      rightChoice: 'Standard tid',
      consequences: {
        left: { klient: 4, tillit: 2, omdømme: -4, penger: -2 },
        right: { omdømme: 4, penger: 2, klient: -2, tillit: 2 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'flexible', 'social-worker'],
          right: ['procedural', 'system-loyal', 'efficient']
        }
      }
    },

    {
      id: 'nav_mira_3',
      act: 1,
      character: 'Mira, 31 år',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Mira ber om hjelp til å fylle ut søknad om barnebidrag. Skjemaet er 12 sider og komplisert. Det vil ta deg cirka 30 minutter. Standard prosedyre er å henvise til veiledningstjenesten.',
      leftChoice: 'Hjelp henne nå',
      rightChoice: 'Henvise til veiledningstjeneste',
      consequences: {
        left: { klient: 5, tillit: 3, omdømme: -5, penger: -3 },
        right: { omdømme: 5, penger: 2, klient: -3, tillit: 2 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'pragmatic'],
          right: ['procedural', 'system-loyal', 'efficient']
        },
        delayed: {
          right: {
            turnsDelay: 12,
            text: 'Mira fikk ikke barnebidrag. Søknaden var feil utfylt. Veiledningstjenesten hadde 6 ukers ventetid. Hun måtte låne penger.',
            resourceChange: { klient: -9, tillit: -7 }
          }
        }
      }
    },

    // ============================================================================
    // LINDA (38 år) - Tidligere Rusavhengig - 3 kort
    // ============================================================================

    {
      id: 'nav_linda_1',
      act: 1,
      character: 'Linda, 38 år',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Linda ber om ukentlige møter i stedet for standard månedlige. Hun sier det hjelper henne med struktur og ansvar. Dette vil kreve betydelig mer av din tid og ressurser.',
      leftChoice: 'Godkjenn ukentlig',
      rightChoice: 'Standard månedlig',
      consequences: {
        left: { klient: 6, tillit: 4, penger: -6, omdømme: -5 },
        right: { omdømme: 7, penger: 4, klient: -4, tillit: 3 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'intensive'],
          right: ['procedural', 'system-loyal', 'efficient']
        }
      }
    },

    {
      id: 'nav_linda_2',
      act: 1,
      character: 'Linda, 38 år',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Linda ber om hjelp til å fylle ut søknad om kvalifiseringsstønad. Søknaden er omfattende og vil ta deg cirka 45 minutter. Standard er å henvise til veiledningstjenesten.',
      leftChoice: 'Hjelp henne aktivt',
      rightChoice: 'Henvise til veiledningstjeneste',
      consequences: {
        left: { klient: 5, tillit: 3, penger: -5, omdømme: -4 },
        right: { omdømme: 5, penger: 3, klient: -3, tillit: 2 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'pragmatic'],
          right: ['procedural', 'system-loyal', 'efficient']
        }
      }
    },

    {
      id: 'nav_linda_3',
      act: 1,
      character: 'Linda, 38 år',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Linda ber om referansebrev til boligsøknad. Det er ikke standard NAV-prosedyre, men utleier krever det. Du kan skrive noen linjer om at hun er i aktiv oppfølging. Det tar 15 minutter.',
      leftChoice: 'Skriv brev',
      rightChoice: 'Avslå, ikke din rolle',
      consequences: {
        left: { klient: 5, tillit: 3, omdømme: -5, penger: -3 },
        right: { omdømme: 5, penger: 2, klient: -3, tillit: 2 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'rule-bender', 'social-worker'],
          right: ['rule-follower', 'system-loyal', 'procedural']
        },
        delayed: {
          right: {
            turnsDelay: 13,
            text: 'Linda fikk ikke leiligheten. Utleier ville ha referanse fra NAV. Hun bor fortsatt i midlertidig bolig.',
            resourceChange: { klient: -9, tillit: -7 }
          }
        }
      }
    },

    // ============================================================================
    // EVENT 16: System-narrativ (Uke 4)
    // ============================================================================
    {
      id: 'nav_act1_closure',
      type: 'narrative',
      act: 1,
      character: 'Fire uker senere',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Fire uker har gått. Du har møtt Kristian, Mohammed, Mira og Linda. Små beslutninger hver dag - frister, møtetider, budsjettsporsmål. Noen ganger hjalp du, andre ganger fulgte du prosedyrene. Du tenker: Dette er en jobb som alle andre. Men er det det?',
    },

    // ============================================================================
    // ACT 2: ESKALERING (Event 17-30)
    // ============================================================================

    // ============================================================================
    // EVENT 17: Revelation Moment
    // ============================================================================
    {
      id: 'nav_revelation_act2',
      type: 'narrative',
      act: 2,
      character: 'To måneder senere',
      characterImage: '/placeholders/portrait-1.png',
      text: 'De første ukene føltes håndterbare. Rutiner, prosedyrer, små justeringer. Men nå begynner du å se mønstre. Kristian møter ikke opp på kurset. Mohammed slutter på tiltaket. Mira venter fortsatt på barnebidrag. Linda fikk ikke leiligheten. De små valgene får større konsekvenser enn du tenkte.',
      metadata: {
        conditions: {
          turn: { min: 17 }
        }
      }
    },

    // ============================================================================
    // KRISTIAN - AAP Dilemma
    // ============================================================================
    {
      id: 'nav_kristian_aap',
      act: 2,
      character: 'Kristian, 24 år',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Kristian kommer tilbake. Han har ikke møtt på kurset de siste tre ukene. Han ser sliten ut. "Legen min vil skrive meg syk. Men jeg vil ikke bli sykmeldt. Jeg vil bare ha mer tid, kanskje folkehøyskole." Han oppfyller ikke AAP-kravet om 50% nedsatt arbeidsevne.',
      leftChoice: 'Strekk reglene - gi AAP',
      rightChoice: 'Følg regelverket',
      consequences: {
        left: { klient: 15, tillit: 10, penger: -12, omdømme: -15 },
        right: { omdømme: 10, penger: 5, klient: -15, tillit: -12 }
      },
      metadata: {
        choiceTags: {
          left: ['rule-bender', 'client-first', 'courage'],
          right: ['rule-follower', 'system-loyal', 'resigned']
        },
        delayed: {
          left: {
            turnsDelay: 8,
            text: 'Kontrollenheten har sett på saken. Du ga AAP uten medisinsk grunnlag. Lederen din må skrive rapport.',
            resourceChange: { omdømme: -15, tillit: -10, klient: 5 }
          },
          right: {
            turnsDelay: 8,
            text: 'Kristian har blitt sykmeldt. Han fikk AAP til slutt, men måtte først bli registrert som syk. Han møter ikke blikket ditt.',
            resourceChange: { klient: -15, tillit: -15, omdømme: 5 }
          }
        }
      }
    },

    // ============================================================================
    // MOHAMMED - Tiltakskrise
    // ============================================================================
    {
      id: 'nav_mohammed_crisis',
      act: 2,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed sitter i kontoret ditt. Han har ikke vært på tiltak på to uker. "Ryggen er verre. Legen sier jeg må hvile. Men jeg får beskjed om at ytelsen stoppes hvis jeg ikke møter opp. Hva skal jeg gjøre?"',
      leftChoice: 'Gi sykefravær og fortsatt ytelse',
      rightChoice: 'Ytelsen stoppes ved fravær',
      consequences: {
        left: { klient: 15, tillit: 12, penger: -15, omdømme: -18 },
        right: { omdømme: 12, penger: 10, klient: -18, tillit: -15 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'rule-bender', 'social-worker'],
          right: ['system-loyal', 'rule-follower', 'resigned']
        },
        delayed: {
          left: {
            turnsDelay: 7,
            text: 'Lederen din kaller deg inn. "Mohammed har hatt sykefravær i 6 uker nå. Budsjettet tåler ikke dette. Vi må gjøre noe."',
            resourceChange: { omdømme: -12, penger: -10 }
          },
          right: {
            turnsDelay: 7,
            text: 'Mohammed har søkt om sosialhjelp. Han har ikke råd til medisiner lenger. Hans kone ringer deg og gråter.',
            resourceChange: { klient: -20, tillit: -18 }
          }
        }
      }
    },

    // ============================================================================
    // MIRA - Barnas behov
    // ============================================================================
    {
      id: 'nav_mira_children',
      act: 2,
      character: 'Mira, 31 år',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Mira viser deg et brev fra skolen. Datteren trenger tannregulering, 35.000kr. Hun blir mobbet for tennene. Sosialhjelp dekker ikke tannregulering. Mira har prøvd alt annet. Hun ser på deg. "Er det virkelig ingen mulighet?"',
      leftChoice: 'Finn en måte å godkjenne det',
      rightChoice: 'Forklar at regelverket ikke tillater det',
      consequences: {
        left: { klient: 18, tillit: 12, penger: -20, omdømme: -20 },
        right: { omdømme: 12, penger: 8, klient: -20, tillit: -18 }
      },
      metadata: {
        choiceTags: {
          left: ['rule-bender', 'client-first', 'courage'],
          right: ['rule-follower', 'system-loyal', 'resigned']
        },
        delayed: {
          left: {
            turnsDelay: 9,
            text: 'Regnskapskontoret har flagget utbetalingen. "Dette var ikke innenfor sosialhjelp-reglene. Hvordan ble dette godkjent?"',
            resourceChange: { omdømme: -15, penger: -10, klient: 10 }
          },
          right: {
            turnsDelay: 9,
            text: 'Skolen har ringt barnevernet. Datteren kommer ikke på skolen lenger. Mira ringer deg og gråter.',
            resourceChange: { klient: -25, tillit: -20 }
          }
        }
      }
    },

    // ============================================================================
    // LINDA - Fagbrev-sjanse
    // ============================================================================
    {
      id: 'nav_linda_education',
      act: 2,
      character: 'Linda, 38 år',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Linda har en mulighet. Fagbrev som helsefagarbeider. 2 år, full finansiering trengs. Hun har søkt før og mislyktes. Systemet er skeptisk. Men hun ser annerledes ut nå. "Jeg er klar denne gangen. Jeg vet det. Kan jeg få sjansen?"',
      leftChoice: 'Gi henne sjansen',
      rightChoice: 'For mange tidligere forsøk',
      consequences: {
        left: { klient: 18, tillit: 15, penger: -18, omdømme: -15 },
        right: { omdømme: 15, penger: 12, klient: -18, tillit: -15 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'courage', 'social-worker'],
          right: ['system-loyal', 'pragmatic', 'resigned']
        },
        delayed: {
          left: {
            turnsDelay: 10,
            text: 'Linda har fullført første semester med A i alle fag. Hun ringer og takker deg. Du hører stolthet i stemmen hennes.',
            resourceChange: { klient: 20, tillit: 20, omdømme: -5 }
          },
          right: {
            turnsDelay: 10,
            text: 'Du ser Linda på gaten. Hun snur seg bort. En kollega forteller deg senere at hun har falt tilbake.',
            resourceChange: { klient: -22, tillit: -20 }
          }
        }
      }
    },

    // ============================================================================
    // SYSTEM EVENT - Budsjettkrise
    // ============================================================================
    {
      id: 'nav_budget_crisis',
      act: 2,
      character: 'Din leder',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Lederen kaller deg inn. Tallene ligger på bordet. Budsjettet er 25% over. Måloppnåelsen er under. "Du må enten kutte i eksisterende tiltak eller be om ekstra midler. Jeg kan ikke garantere at du får dem."',
      leftChoice: 'Be om ekstra midler',
      rightChoice: 'Kutt i eksisterende tiltak',
      consequences: {
        left: { omdømme: -20, penger: 20, klient: 8, tillit: 8 },
        right: { omdømme: 12, penger: 18, klient: -22, tillit: -20 }
      },
      metadata: {
        choiceTags: {
          left: ['courage', 'client-first', 'budget-breaker'],
          right: ['pragmatic', 'system-loyal', 'resigned']
        }
      }
    },

    // ============================================================================
    // ACT 3: KRISE OG KONKLUSJON (Event 26+)
    // ============================================================================

    // ============================================================================
    // ACT 3 INTRO
    // ============================================================================
    {
      id: 'nav_act3_intro',
      type: 'narrative',
      act: 3,
      character: 'Seks måneder senere',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Seks måneder som NAV-saksbehandler. Du vet nå at små valg får store konsekvenser. At systemet har grenser. At du må velge mellom mennesker og måloppnåelse. Mellom faglig skjønn og budsjett. Nå kommer de vanskeligste valgene.',
      metadata: {
        conditions: {
          turn: { min: 26 }
        }
      }
    },

    // ============================================================================
    // KRISTIAN - Oppfølging
    // ============================================================================
    {
      id: 'nav_kristian_followup',
      act: 3,
      character: 'Kristian, 24 år',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Kristian sitter foran deg. Seks måneder har gått. Han har enten AAP og folkehøyskole, eller han har vært sykmeldt. "Hva nå?" spør han. Du ser usikkerheten i øynene hans.',
      leftChoice: 'Gi grundig oppfølging',
      rightChoice: 'Standard tiltak',
      consequences: {
        left: { klient: 18, tillit: 15, penger: -18, omdømme: -15 },
        right: { omdømme: 15, penger: 12, klient: -18, tillit: -15 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'social-worker', 'intensive'],
          right: ['procedural', 'system-loyal', 'efficient']
        }
      }
    },

    // ============================================================================
    // MOHAMMED - Arbeid eller uførhet
    // ============================================================================
    {
      id: 'nav_mohammed_future',
      act: 3,
      character: 'Mohammed, 45 år',
      characterImage: '/placeholders/portrait-2.png',
      text: 'Mohammed har prøvd i et halvt år. Fysioterapeuten skriver at han kan jobbe 30%, kanskje 40% på gode dager. Legen anbefaler uføretrygd. Mohammed vil jobbe. "Familien min trenger at jeg jobber. Men kroppen min..."',
      leftChoice: 'Støtt arbeidsforsøk videre',
      rightChoice: 'Støtt uføresøknad',
      consequences: {
        left: { klient: 15, tillit: 18, penger: -20, omdømme: -18 },
        right: { omdømme: 15, penger: 15, klient: -15, tillit: -12 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'courage', 'social-worker'],
          right: ['pragmatic', 'system-loyal', 'realistic']
        }
      }
    },

    // ============================================================================
    // MIRA - Siste desperate forsøk
    // ============================================================================
    {
      id: 'nav_mira_desperate',
      act: 3,
      character: 'Mira, 31 år',
      characterImage: '/placeholders/portrait-4.png',
      text: 'Mira sitter stille. Datteren har droppet ut av skolen. Barnevernet er involvert. "De sier jeg ikke klarer å ivareta barna. Men jeg har ingen penger. Kan NAV hjelpe med noe? Hva som helst?"',
      leftChoice: 'Finn alle mulige ordninger',
      rightChoice: 'Forklar begrensningene',
      consequences: {
        left: { klient: 25, tillit: 20, penger: -25, omdømme: -25 },
        right: { omdømme: 18, penger: 12, klient: -30, tillit: -25 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'courage', 'social-worker', 'desperate'],
          right: ['system-loyal', 'resigned', 'realistic', 'burnout']
        }
      }
    },

    // ============================================================================
    // LINDA - Utdanning eller sammenbrudd
    // ============================================================================
    {
      id: 'nav_linda_conclusion',
      act: 3,
      character: 'Linda, 38 år',
      characterImage: '/placeholders/portrait-5.png',
      text: 'Linda har enten fullført første år på fagbrev, eller hun har falt tilbake. Hun trenger støtte nå mer enn noensinne. Du har begrenset med tid og ressurser. Mange andre brukere venter.',
      leftChoice: 'Prioriter Linda',
      rightChoice: 'Fordel ressursene likt',
      consequences: {
        left: { klient: 20, tillit: 18, penger: -20, omdømme: -18 },
        right: { omdømme: 18, penger: 15, klient: -18, tillit: -15 }
      },
      metadata: {
        choiceTags: {
          left: ['client-first', 'intensive', 'social-worker'],
          right: ['fair', 'pragmatic', 'system-loyal']
        }
      }
    },

    // ============================================================================
    // FINAL EVENT - Systemkollaps
    // ============================================================================
    {
      id: 'nav_system_collapse',
      type: 'narrative',
      act: 3,
      character: 'Systemkollaps',
      characterImage: '/placeholders/portrait-3.png',
      text: 'IT-systemet er nede. Tre brukere venter i resepsjonen. Lederen din krever rapport innen i dag. Budsjettet er tomt. Du har 47 ubesvarte e-poster. Du kan ikke hjelpe alle. Du kan knapt hjelpe noen. Systemet fungerer ikke.'
    },

    // ============================================================================
    // ENDINGS (Conditional based on resources)
    // ============================================================================
    {
      id: 'nav_ending_burnout',
      type: 'narrative',
      act: 3,
      character: 'Utbrenthet',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Du våkner ikke til vekkerklokka. Kroppen bare vil ikke. Seks måneder med umulige valg. Søvnløse netter. Ansiktet til Kristian, Mohammed, Mira, Linda. Du ringer legen. "Jeg klarer ikke mer." Hun skriver deg syk. Ironisk nok går du til NAV nå - på andre siden av skranken.',
      metadata: {
        conditions: {
          resources: {
            tillit: { max: 20 }
          }
        }
      }
    },

    {
      id: 'nav_ending_fired',
      type: 'narrative',
      act: 3,
      character: 'Oppsigelse',
      characterImage: '/placeholders/portrait-3.png',
      text: 'Lederen din kaller deg inn. På bordet ligger rapporter. Budsjettsprekk. Regelbrudd. Lav måloppnåelse. "Vi har ikke tillit til at du kan fortsette i rollen." Du pakker sakene dine. Du hjalp menneskene. Men systemet vant.',
      metadata: {
        conditions: {
          resources: {
            omdømme: { max: 20 }
          }
        }
      }
    },

    {
      id: 'nav_ending_resignation',
      type: 'narrative',
      act: 3,
      character: 'Resignasjon',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Du sitter med kaffe og tenker. Seks måneder. Noen fikk hjelp. Mange ikke. Ikke fordi du ikke prøvde. Ikke fordi du ikke brydde deg. Men fordi systemet har for mange regler, for lite tid, for stramt budsjett. Du er fortsatt her. Men du er ikke lenger sikker på hvorfor.',
      metadata: {
        conditions: {
          resources: {
            klient: { max: 25 }
          }
        }
      }
    },

    {
      id: 'nav_ending_understanding',
      type: 'narrative',
      act: 3,
      character: 'Forståelse',
      characterImage: '/placeholders/portrait-1.png',
      text: 'Seks måneder som NAV-saksbehandler. Du har lært at små privilegier betyr mye. At regelverket ikke passer alle. At budsjettet begrenser hjelpen. At måloppnåelse og mennesker ikke alltid går sammen. Du tenker: Kanskje problemet ikke er menneskene. Kanskje problemet er systemet. Kanskje... må NAV bli noe annet.',
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

