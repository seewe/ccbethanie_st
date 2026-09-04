import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const translations = {
  fr: {
    // Header & Navigation
    worshipNotice: "Culte dominical :",
    worshipHours: "Chaque Dimanche à 13h00",
    churchAddress:
      "Lieu de culte : 2401 avenue de l'abbé Giguere, Québec, QC G1C 0H4",
    adminTitle: "Administration",
    navHome: "Accueil",
    navAbout: "La Communauté",
    navMinistries: "Groupes",
    navEvents: "Événements",
    navPrayer: "Mur de Prière",
    navContact: "Nous contacter",
    langFr: "FR",
    langEn: "EN",
    switchLangTooltip: "Passer en anglais",

    // Brand & Logo
    affiliation: "Église Presbytérienne au Canada",
    affiliationEnShort: "The Presbyterian Church in Canada",
    churchName: "Communauté Chrétienne",
    churchNameBold: "BÉTHANIE",
    tagline: "Vivre et partager la foi en Jésus-Christ",

    // Hero & Slogans
    heroTitleStart: "Une communauté pour vivre et partager la foi en ",
    heroTitleEnd: "Jésus-Christ.",
    heroDescription:
      "Bienvenue à la Communauté Chrétienne Béthanie. Nous croyons en une foi authentique, des relations vraies et un impact positif dans notre communauté.",

    // Actions & Buttons
    btnContact: "Nous contacter",
    btnPlanVisit: "Planifier une visite",
    btnGive: "Faire un don",
    btnPrayer: "Demander la prière",
    btnLearnMore: "En savoir plus",
    btnListen: "Écouter",
    btnViewAll: "Voir tous",
    btnSend: "Envoyer",
    btnRegister: "M'inscrire / Participer",
    btnClose: "Fermer",
    btnShare: "Partager",
    btnCopied: "Lien copié !",
    btnContactPastor: "Contacter le Pasteur",
    btnRequestCounsel: "Demander un temps d'écoute",
    btnFullProfile: "Profil complet",
    btnJoinThisSunday: "Participer ce dimanche",
    btnContactLeader: "Contacter le responsable",
    btnWriteLeader: "Écrire au responsable",
    btnSubmitPrayerIntent: "Déposer une intention de prière",
    btnAddMyRequest: "Ajouter ma requête",
    btnIPrayed: "J'ai prié 🙏",
    btnIPrayForThis: "Je prie pour ceci",
    prayersCountSuffix: "prière(s)",

    // Next Celebration Floating Card
    nextCelebrationTitle: "Prochaine Célébration",
    inPersonBadge: "En présentiel",
    sundayTime: "Dimanche 13h00",
    sundayProgram: "Célébration, Louange & Culte d'enfants (Accueil dès 13h00)",
    churchAddressFull: "2401 avenue de l'abbé Giguere",
    churchCityParking: "Québec, QC, G1C 0H4 (Stationnement gratuit sur place)",
    openToAll: "Ouvert à tous",
    openToAllDesc: "Vous êtes les bienvenus ! Venez tel que vous êtes.",
    weAwaitForYou: "Nous vous attendons",

    // Quick Access 3 Cards
    quickWhoTitle: "Qui sommes-nous ?",
    quickWhoDesc:
      "Une communauté membre de l'Église Presbytérienne au Canada, centrée sur Jésus-Christ, ouverte à tous et engagée avec amour dans la maison de Dieu.",
    quickEventsTitle: "Prochains événements",
    quickEventsDesc:
      "Étude biblique, Soirée ados, Activité des mamans, Sortie du culte d'enfants. Consultez notre calendrier.",
    quickEventsBtn: "Voir les événements",
    quickPrayerTitle: "Besoin de prière ?",
    quickPrayerDesc:
      "Nous serions honorés de prier pour vous et vos proches. Partagez votre sujet de prière en toute confiance.",
    quickPrayerBtn: "Faire une demande",

    // Section: About Teaser (Home)
    aboutTeaserBadge: "À PROPOS DE NOUS",
    aboutTeaserTitleStart: "Une Église centrée sur ",
    aboutTeaserTitleChrist: "Christ",
    aboutTeaserTitleAnd: " et sur les ",
    aboutTeaserTitlePeople: "personnes.",
    aboutTeaserP1:
      "Depuis 1998, la Communauté Chrétienne Béthanie accompagne les familles et personnes de toutes origines dans leur croissance spirituelle à Québec.",
    aboutTeaserP2:
      "Notre vision est de voir des vies transformées par l'amour de Jésus-Christ et des disciples authentiques qui font une différence concrète dans leur communauté.",
    aboutTeaserBtn: "En savoir plus sur notre communauté chrétienne",

    // Section: Community Photos Carousel
    galleryBadge: "Galerie de la Communauté Chrétienne Béthanie",
    galleryTitle: "Notre communauté en images",
    gallerySubtitle:
      "Des moments de joie, de louange, d'amitié et de communion fraternelle",
    prevPhoto: "Photo précédente",
    nextPhoto: "Photo suivante",
    photoTagSunday: "Culte d'enfants",
    photoTagYouth: "Consécration & Fête",
    photoTagWelcome: "Cérémonie Spéciale",
    photoTagFellowship: "Chorale & Ministère",
    photoTagFamily: "Culte & Communion",
    photoTagPrayer: "Béthanie Kids",
    photoTagStudy: "Reconnaissance",
    photoTagSanctuary: "Rassemblement & Louange",
    photoTitle1: "Béthanie Kids en plein air",
    photoDesc1:
      "Nos enfants s'amusent et tissent des liens fraternels lors d'une sortie et de jeux en plein air avec leurs animateurs.",
    photoTitle2: "Cérémonie de consécration & Noël",
    photoDesc2:
      "Un moment solennel de consécration célébré dans la joie, entouré des décorations de la saison de Noël.",
    photoTitle3: "Consécration & Louange sur l'estrade",
    photoDesc3:
      "Les consacrés se tiennent devant l'assemblée pour recevoir la bénédiction et l'accompagnement de nos pasteurs.",
    photoTitle4: "Chorale & Équipe pastorale",
    photoDesc4:
      "Nos choristes et notre équipe pastorale réunis, unis dans le service et la louange.",
    photoTitle5: "Culte dominical & Prédication",
    photoDesc5:
      "L'assemblée rassemblée pour écouter la prédication de la Parole et grandir ensemble dans la foi.",
    photoTitle6: "Moments de joie entre enfants",
    photoDesc6:
      "Des instants de complicité et de rires partagés par nos enfants lors de nos activités en plein air.",
    photoTitle7: "Remise d'un certificat de reconnaissance",
    photoDesc7:
      "Notre pasteur remet un certificat de reconnaissance à une membre pour son engagement et son service au sein de la communauté.",
    photoTitle8: "Grand rassemblement & Louange communautaire",
    photoDesc8:
      "Toute la communauté réunie dans le sanctuaire pour chanter et célébrer ensemble la bonté de Dieu.",
    viewPhotoFull: "Agrandir la photo",
    closeLightbox: "Fermer la vue agrandie",

    // Section: Testimonials & Pastor
    testimonialsBadge: "TÉMOIGNAGES",
    pastorBadge: "NOTRE PASTEUR",
    pastorRoleBadge: "Pasteur Principal",
    pastorTitle: "Pasteur principal & Berger de l'assemblée",
    pastorShortBio:
      "Au service de la Communauté Chrétienne Béthanie depuis plus de 15 ans avec une passion pour l'enseignement biblique et l'accompagnement pastoral. Animé d'un profond amour pour l'Évangile, il consacre son ministère à la prédication vivante de la Parole, à la prière d'intercession et au soutien bienveillant de chaque personne et famille.",
    pastorQuote:
      "« Notre désir le plus cher est que chaque homme, femme et enfant découvre l'immensité de l'amour du Christ et trouve sa place au sein de cette belle famille spirituelle. »",
    pastorAppointment: "Disponible sur rendez-vous pour entretiens pastoraux",
    defaultTestimonialQuote:
      "Béthanie est devenu pour moi une vraie famille. J'y ai trouvé l'amour de Dieu et des amis sur qui je peux compter.",
    defaultTestimonialRole: "Membre depuis 10 ans",

    // Section: Community Origins (EEC & EPC)
    originsBadge: "Diversité & Unité en Christ",
    originsTitle: "Nos membres viennent de...",
    originsDesc:
      "En communion fraternelle et enracinés dans la foi avec les églises et les communautés soeurs, nous célébrons ensemble l'unité du Corps de Christ.",
    eecName: "Église Évangélique du Cameroun",
    eecSubtitle1: "Communion Fraternelle & Racines Évangéliques",
    eecSubtitle2: "Fidélité • Amour • Témoignage en Christ",
    eecBadge1: "Église Évangélique",
    eecBadge2: "Partenariat Fraternel",
    epcName: "Église Presbytérienne du Cameroun",
    epcSubtitle1: "Tradition Presbytérienne & Réformée",
    epcSubtitle2: "Unité en Christ • Buisson Ardent",
    epcBadge1: "Église Presbytérienne",
    epcBadge2: "Communion Fraternelle",
    pccName: "Église Presbytérienne au Canada",
    pccSubtitle1: "Affiliation Officielle & Enracinement Canadien",
    pccBadge1: "Église Presbytérienne au Canada",
    siloeName: "Communauté Chrétienne Siloé de Québec",
    siloeSubtitle1: "Communion Fraternelle & Enracinement Local",
    siloeBadge1: "Communauté Siloé",
    galatiansVerse:
      "« Il n'y a plus ni Juif ni Grec... car tous vous êtes un en Jésus-Christ » — Galates 3:28",

    // About Page Full
    aboutHeaderBadge: "Qui sommes-nous ?",
    aboutHeaderTitle: "Notre Communauté Chrétienne, Notre Vision, Notre Foi",
    aboutHeaderDesc:
      "Découvrez l'histoire, les fondements doctrinaux et la vision de la Communauté Chrétienne Béthanie, membre dévoué de l'Église Presbytérienne au Canada.",
    aboutIdentityBadge: "Notre Identité",
    aboutIdentityTitle:
      "Une maison d'accueil, de grâce et d'édification spirituelle.",
    aboutHistoryP1:
      "Le nom « Béthanie » dans les Évangiles évoque le village où Jésus aimait se reposer, entouré de ses amis Marthe, Marie et Lazare. C'était un lieu de résurrection, d'amitié profonde, d'hospitalité et de révélation.",
    aboutHistoryP2:
      "La Communauté Chrétienne Béthanie aspire à être ce même refuge spirituel : une communauté accueillante où chacun, quelle que soit son histoire, peut faire la rencontre vivante du Christ et s'enraciner dans une foi durable.",
    aboutVisionTitle: "Notre Vision",
    aboutVisionDesc:
      "Bâtir une communauté multi-générationnelle, passionnée par Dieu et engagée pour ses membres.",
    aboutMissionTitle: "Notre Mission",
    aboutMissionDesc:
      "Former des disciples fidèles, aimer notre prochain et proclamer l'Évangile avec pertinence.",
    pccTraditionDesc:
      "Une tradition chrétienne historique, biblique, réformée et engagée pour la gloire de Dieu et l'amour du prochain.",
    pastorSectionBadge: "Direction spirituelle & Accompagnement",
    pastorSectionTitle: "Notre Pasteur",
    pastorSectionSubtitle:
      "Un serviteur dévoué à l'enseignement de la Parole et au soin de chaque âme",
    pastorDetailedP1:
      "Au service du Seigneur et de la Communauté Chrétienne Béthanie depuis plus de 15 ans, le Pasteur Narcisse est animé par une profonde passion pour la prédication fidèle des Saintes Écritures et la formation de disciples authentiques.",
    pastorDetailedP2:
      "Titulaire d'une formation théologique solide et fort d'une riche expérience dans le ministère pastoral et l'accompagnement des familles, il s'attache à ce que l'Église demeure un havre d'amour, de paix et de restauration pour tous ceux qui franchissent nos portes.",
    pastorPillarsTitle: "Axes principaux du ministère :",
    pastorPillar1: "Enseignement & Prédication biblique",
    pastorPillar2: "Accompagnement & Conseil pastoral",
    pastorPillar3: "Prière & Intercession pour les familles",
    pastorPillar4: "Vision missionnaire & Développement",

    // Ministries Page
    minHeaderBadge: "Vie Communautaire",
    minHeaderTitle: "Nos Groupes de vie",
    minHeaderDesc:
      "À Béthanie, chaque membre a une place pour grandir, trouver des amitiés solides et servir avec les dons que Dieu lui a confiés.",
    minTargetLabel: "Public cible & Format :",

    // Events Page
    eventsHeaderBadge: "Agenda de l'Église",
    eventsHeaderTitle: "Événements & Rendez-vous",
    eventsHeaderDesc:
      "Découvrez toutes les rencontres à venir, cultes spéciaux, soirées de prière, sorties jeunesses et brunchs fraternels.",
    eventsCatLabel: "Catégories :",
    eventsCatAll: "Tous les événements",
    eventsCatWorship: "Culte",
    eventsCatTeaching: "Enseignement",
    eventsCatPrayer: "Prière",
    eventsCatYouth: "Jeunesse",
    eventsCatCommunity: "Communautaire",
    eventSpeakerLabel: "Intervenant :",

    // Prayer Wall Page
    prayerHeaderBadge: "Intercession Communautaire",
    prayerHeaderTitle: "Mur de Prière & Intercession",
    prayerHeaderVerse:
      "« Priez les uns pour les autres, afin que vous soyez guéris. La prière fervente du juste a une grande efficacité. » — Jacques 5:16",
    prayerSectionTitle: "Requêtes & Actions de Grâce",
    prayerSectionSubtitle:
      "Cliquez sur « J'ai prié pour ceci » pour manifester votre soutien fraternel.",

    // Contact Page
    contactHeaderBadge: "Nous Trouver & Nous Écrire",
    contactHeaderTitle: "Contact & Plan d'accès",
    contactHeaderDesc:
      "Vous avez des questions, besoin de renseignements ou désirez nous rendre visite ce dimanche ? Retrouvez toutes les coordonnées et l'adresse du lieu de culte.",
    contactInfoTitle: "Coordonnées de l'Église",
    contactAddressLabel: "Adresse Principale & Secrétariat",
    contactAddressValue: "2401 avenue de l'abbé Giguere, Québec, QC G1C 0H4",
    contactWorshipAddressLabel: "Adresse du lieu du culte",
    contactWorshipAddressValue:
      "2401 avenue de l'abbé Giguere, Québec, QC G1C 0H4",
    contactPostalAddressLabel: "Adresse postale",
    contactPostalAddressValue:
      "1340 rue des Adages Québec (Québec) G3K0T2 Canada",
    contactPostalAddressNote:
      "Pour vos courriers, correspondances officielles et envois administratifs",
    contactWorshipScheduleNote:
      "Célébrations le dimanche à 13h00 (Accueil dès 10h00) • Réunion de prière et étude en semaine",
    contactParkingNote:
      "📍 Stationnement gratuit sur place pour tous nos invités et membres",
    contactEmailLabel: "Courriel & Secrétariat",
    contactEmailHours:
      "info@ccbethanie.ca • Réponse sous 24 à 48 heures ouvrables",
    contactOpenMapsBtn: "Ouvrir dans Google Maps",
    contactGetDirections: "Calculer l'itinéraire",
    howToComeTitle: "Comment venir ?",
    byCarTitle: "En voiture :",
    byCarDesc:
      "Accès facile via les grands axes, stationnement adjacent gratuit.",
    byTransitTitle: "En transport STM :",
    byTransitDesc: "Accessible par métro et lignes d'autobus directes.",
    formSendMsgTitle: "Envoyez-nous un message",
    formSendMsgSubtitle:
      "Remplissez le formulaire ci-dessous et notre équipe pastorale ou d'accueil vous répondra rapidement.",
    formSuccessTitle: "Message envoyé avec succès !",
    formSuccessDesc:
      "Merci pour votre prise de contact. Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.",
    formSendAnother: "Envoyer un autre message",
    formNameLabel: "Votre Nom complet *",
    formNamePlaceholder: "Ex: Jean Tremblay",
    formEmailLabel: "Courriel *",
    formEmailPlaceholder: "nom@exemple.com",
    formPhoneLabel: "Téléphone",
    formPhonePlaceholder: "(514) 000-0000",
    formSubjectLabel: "Sujet *",
    formSubjectGen: "Renseignements généraux",
    formSubjectVisit: "Planifier une première visite",
    formSubjectPastoral: "Entretien avec le pasteur",
    formSubjectBaptism: "Baptême ou adhésion",
    formSubjectPrayer: "Demande de prière",
    formSubjectOther: "Autre sujet",
    formMsgLabel: "Votre message *",
    formMsgPlaceholder: "Comment pouvons-nous vous aider ou vous accompagner ?",
    formSubmitting: "Envoi en cours...",
    formSubmitBtn: "Envoyer le message",

    // Visit Modal
    visitModalBadge: "Bienvenue chez vous",
    visitModalTitle: "Planifier votre visite à Béthanie",
    visitModalSubtitle:
      "Dites-nous quand vous venez et nous vous réserverons un accueil privilégié, un guide et un café de bienvenue !",
    visitSuccessTitle: "Nous avons hâte de vous rencontrer !",
    visitSuccessDesc1: "Merci",
    visitSuccessDesc2:
      "! Votre visite a été enregistrée. Notre équipe d'accueil vous attendra dès 10h15 ce dimanche au kiosque Bienvenue.",
    visitArrivalLabel: "Heure recommandée d'arrivée : 10h15",
    visitAddressLabel:
      "Adresse : 2401 avenue de l'abbé Giguere, Québec, QC G1C 0H4 (Stationnement gratuit sur place)",
    visitKidsNote:
      "👶 Vos enfants seront accueillis chaleureusement à Béthanie Kids pour des activités adaptées.",
    visitBtnDone: "Parfait, merci !",
    visitDateLabel: "Date du dimanche souhaité *",
    visitPeopleCountLabel: "Nombre d'adultes *",
    visitChildrenCountLabel: "Nombre d'enfants (Béthanie Kids)",
    visitQuestionsLabel:
      "Avez-vous des questions particulières ou besoins particuliers ?",
    visitQuestionsPlaceholder: "Ex: Accès mobilité réduite, garderie, etc.",
    visitParkingCheckbox:
      "Je souhaite recevoir les informations détaillées sur le stationnement",

    // Donation Modal
    donateModalBadge: "Générosité & Soutien",
    donateModalTitle: "Faire un don à l'œuvre de Dieu",
    donateVerse:
      "« Chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte, car Dieu aime celui qui donne avec joie. » — 2 Co 9:7",
    donateSuccessTitle: "Merci infiniment pour votre don !",
    donateSuccessP1: "Votre contribution de",
    donateSuccessP2: "envers",
    donateSuccessP3:
      "soutient activement les ministères, l'aide aux démunis et la proclamation de l'Évangile à Québec.",
    donateTaxNotice: "Reçu fiscal officiel émis aux fins de l'impôt au Canada.",
    donateEmailNotice:
      "Un courriel de confirmation et votre reçu électronique ont été enregistrés.",
    donateFundLabel: "Affectation du don *",
    donateFund1: "Dîmes & Offrandes",
    donateFund2: "Fonds de Mission",
    donateFund3: "Entraide & Diaconat",
    donateFund4: "Rénovations & Équipement",
    donateAmountLabel: "Montant du don (CAD) *",
    donateCustomAmountPlaceholder: "Autre montant ($)",
    donatePaymentMethodLabel: "Mode de paiement *",
    donateCardMethod: "Carte de crédit / Débit",
    donateInteracMethod: "Virement Interac",
    donateCardSecureDesc: "Paiement 100% sécurisé via Stripe / Moneris",
    donateInteracDesc: "Envoyez à finances@ccbethanie.ca (Dépôt direct activé)",
    donateNameLabel: "Votre nom complet *",
    donateNamePlaceholder: "Pour votre reçu fiscal",
    donateEmailLabel: "Courriel pour reçu d'impôt *",
    donateAnonymousLabel: "Faire ce don de manière anonyme",
    donateSubmitBtn: "Confirmer mon don de",

    // Prayer Modal
    prayerModalBadge: "Intercession & Écoute",
    prayerModalTitle: "Partager un sujet de prière",
    prayerModalVerse:
      "« Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications. » — Phil 4:6",
    prayerSuccessTitle: "Votre requête a été reçue",
    prayerSuccessDesc:
      "Notre équipe pastorale et les intercesseurs de Béthanie portent dès maintenant votre fardeau dans la foi et la prière.",
    prayerPublicNotice:
      "✨ Votre sujet est visible sur le Mur de Prière afin que l'assemblée s'unisse en prière.",
    prayerPrivateNotice:
      "🔒 Votre sujet est traité dans la stricte confidentialité par l'équipe pastorale.",
    prayerVisibilityLabel: "Visibilité de la prière *",
    prayerPublicTabTitle: "Mur de Prière",
    prayerPublicTabDesc: "Visible par la communauté pour prier ensemble",
    prayerPrivateTabTitle: "Confidentiel",
    prayerPrivateTabDesc: "Réservé uniquement aux pasteurs",
    prayerCategoryLabel: "Catégorie du sujet *",
    prayerCatHealth: "Santé & Guérison",
    prayerCatFamily: "Famille & Couples",
    prayerCatWork: "Travail & Études",
    prayerCatSpiritual: "Vie spirituelle",
    prayerCatThanks: "Action de grâce",
    prayerCatOther: "Autre besoin",
    prayerAuthorLabel: "Votre prénom ou nom *",
    prayerAuthorPlaceholder: "Ex: David M.",
    prayerAnonymousCheckbox: "Publier en anonyme",
    prayerTextLabel: "Votre intention ou sujet de prière *",
    prayerTextPlaceholder: "Décrivez votre situation avec vos mots...",
    prayerSubmitBtn: "Envoyer ma demande de prière",

    // Sermon Player Modal
    sermonDefaultSeries: "Prédication Béthanie",
    sermonAudioPlaying: "Lecture audio en cours...",
    sermonListenAudio: "Écouter l'enregistrement audio",
    sermonDurationLabel: "Durée :",
    sermonSpeakerRole: "Prédicateur",
    sermonScriptureLabel: "Passage biblique principal",
    sermonSummaryLabel: "Résumé du message",

    // Admin Page
    adminHeaderBadge: "Espace Administration",
    adminMainTitle: "Tableau de Bord Église",
    adminSubtitle:
      "Gestion centralisée des prédications, événements, requêtes de prière, visites et dons.",
    adminTabSermons: "Prédications",
    adminTabEvents: "Événements",
    adminTabPrayers: "Mur de Prière",
    adminTabVisits: "Visites Planifiées",
    adminTabContacts: "Messages Reçus",
    adminTabDonations: "Dons & Finances",
    adminBtnAddSermon: "+ Nouvelle Prédication",
    adminBtnAddEvent: "+ Nouvel Événement",
    adminRefreshBtn: "Rafraîchir les données",

    // Footer
    footerAbout:
      "Une communauté chaleureuse et vivante à Québec, enracinée dans l'Évangile de Jésus-Christ et engagée à servir notre métropole avec amour.",
    footerFollow: "Suivez nos activités",
    footerQuickLinks: "Navigation Rapide",
    footerMinistries: "Nos Ministères",
    footerContact: "Coordonnées",
    footerNewsletterTitle: "Restez informés",
    footerNewsletterSubtitle:
      "Recevez nos méditations hebdomadaires et l'actualité de la communauté.",
    footerNewsletterPlaceholder: "Votre courriel",
    footerNewsletterBtn: "S'inscrire",
    footerNewsletterSuccess: "Merci pour votre inscription !",
    footerRights: "Tous droits réservés.",
    footerPresbyterianAffiliation:
      "Membre de l'Église Presbytérienne au Canada (The Presbyterian Church in Canada)",
  },
  en: {
    // Header & Navigation
    worshipNotice: "Sunday Service:",
    worshipHours: "Every Sunday at 1:00 PM",
    churchAddress:
      "Church address : 2401 avenue de l'abbé Giguere, Québec, QC G1C 0H4",
    adminTitle: "Administration",
    navHome: "Home",
    navAbout: "Our Community",
    navMinistries: "Groups",
    navEvents: "Events",
    navPrayer: "Prayer Wall",
    navContact: "Contact Us",
    langFr: "FR",
    langEn: "EN",
    switchLangTooltip: "Switch to French",

    // Brand & Logo
    affiliation: "Presbyterian Church in Canada",
    affiliationEnShort: "The Presbyterian Church in Canada",
    churchName: "Bethany Christian",
    churchNameBold: "COMMUNITY",
    tagline: "Living and sharing faith in Jesus Christ",

    // Hero & Slogans
    heroTitleStart: "A community to live and share faith in ",
    heroTitleEnd: "Jesus Christ.",
    heroDescription:
      "Welcome to Bethany Christian Community. We believe in authentic faith, genuine relationships, and making a positive impact in our community.",

    // Actions & Buttons
    btnContact: "Contact Us",
    btnPlanVisit: "Plan a Visit",
    btnGive: "Make a Donation",
    btnPrayer: "Request Prayer",
    btnLearnMore: "Learn More",
    btnListen: "Listen",
    btnViewAll: "View All",
    btnSend: "Send",
    btnRegister: "Register / Attend",
    btnClose: "Close",
    btnShare: "Share",
    btnCopied: "Link copied!",
    btnContactPastor: "Contact the Pastor",
    btnRequestCounsel: "Request Pastoral Care",
    btnFullProfile: "Full Profile",
    btnJoinThisSunday: "Join us this Sunday",
    btnContactLeader: "Contact ministry leader",
    btnWriteLeader: "Write to the leader",
    btnSubmitPrayerIntent: "Submit a Prayer Request",
    btnAddMyRequest: "Add my request",
    btnIPrayed: "I prayed 🙏",
    btnIPrayForThis: "I'm praying for this",
    prayersCountSuffix: "prayer(s)",

    // Next Celebration Floating Card
    nextCelebrationTitle: "Next Sunday Service",
    inPersonBadge: "In Person",
    sundayTime: "Sunday 1:00 PM",
    sundayProgram:
      "Worship, Praise and Kids Sunday School (Welcome from 1:00 PM)",
    churchAddressFull: "2401 avenue de l'abbé Giguere",
    churchCityParking: "Québec, QC, G1C 0H4 (Free on-site parking)",
    openToAll: "Open to All",
    openToAllDesc: "Everyone is warmly welcome! Come as you are.",
    weAwaitForYou: "We look forward to seeing you",

    // Quick Access 3 Cards
    quickWhoTitle: "Who We Are",
    quickWhoDesc:
      "A member congregation of the Presbyterian Church in Canada, centered on Jesus Christ, open to all, and lovingly committed to God’s house.",
    quickEventsTitle: "Upcoming Events",
    quickEventsDesc:
      "Bible study, Teen Night, Moms' Group, Children's Service. Check out our calendar.",
    quickEventsBtn: "View Events",
    quickPrayerTitle: "Need Prayer?",
    quickPrayerDesc:
      "We would be honored to pray for you and your loved ones. Share your prayer request in confidence.",
    quickPrayerBtn: "Submit a Request",

    // Section: About Teaser (Home)
    aboutTeaserBadge: "ABOUT US",
    aboutTeaserTitleStart: "A Church centered on ",
    aboutTeaserTitleChrist: "Christ",
    aboutTeaserTitleAnd: " and on ",
    aboutTeaserTitlePeople: "people.",
    aboutTeaserP1:
      "Since 1998, Bethany Christian Community has been walking alongside individuals and families from all backgrounds in their spiritual growth in Montreal.",
    aboutTeaserP2:
      "Our vision is to see lives transformed by the love of Jesus Christ and genuine disciples making a tangible difference in their community.",
    aboutTeaserBtn: "Learn more about our church",

    // Section: Community Photos Carousel
    galleryBadge: "Bethany Christian Community Gallery",
    galleryTitle: "Our Community in Pictures",
    gallerySubtitle:
      "Moments of joy, praise, fellowship, and brotherly communion",
    prevPhoto: "Previous photo",
    nextPhoto: "Next photo",
    photoTagSunday: "Children's Service",
    photoTagYouth: "Consecration & Celebration",
    photoTagWelcome: "Special Ceremony",
    photoTagFellowship: "Choir & Ministry Team",
    photoTagFamily: "Worship & Communion",
    photoTagPrayer: "Bethany Kids",
    photoTagStudy: "Recognition",
    photoTagSanctuary: "Gathering & Worship",
    photoTitle1: "Bethany Kids Outdoor Fun",
    photoDesc1:
      "Our children bonding and having fun during an outing and outdoor games with their leaders.",
    photoTitle2: "Consecration Ceremony & Christmas",
    photoDesc2:
      "A solemn consecration celebrated with joy, surrounded by the decorations of the Christmas season.",
    photoTitle3: "Consecration & Praise on the Platform",
    photoDesc3:
      "Those being consecrated stand before the congregation to receive the blessing and guidance of our pastors.",
    photoTitle4: "Choir & Pastoral Team",
    photoDesc4:
      "Our choir members and pastoral team gathered together, united in service and worship.",
    photoTitle5: "Sunday Worship & Preaching",
    photoDesc5:
      "The congregation gathered to hear the preaching of the Word and grow together in faith.",
    photoTitle6: "Joyful Moments Among Children",
    photoDesc6:
      "Moments of connection and laughter shared by our children during our outdoor activities.",
    photoTitle7: "Presenting a Certificate of Recognition",
    photoDesc7:
      "Our pastor presents a certificate of recognition to a member for her dedication and service within the community.",
    photoTitle8: "Great Gathering & Community Worship",
    photoDesc8:
      "The whole community gathered in the sanctuary to sing and celebrate God's goodness together.",
    viewPhotoFull: "View enlarged photo",
    closeLightbox: "Close enlarged view",

    // Section: Testimonials & Pastor
    testimonialsBadge: "TESTIMONIALS",
    pastorBadge: "OUR PASTOR",
    pastorRoleBadge: "Senior Pastor",
    pastorTitle: "Senior Pastor & Shepherd of the Congregation",
    pastorShortBio:
      "Serving Bethany Christian Community for over 15 years with a passion for biblical teaching and pastoral counseling. Moved by a profound love for the Gospel, he devotes his ministry to preaching the Word, intercessory prayer, and caring for every person and family.",
    pastorQuote:
      "« Our deepest desire is for every man, woman, and child to discover the boundless love of Christ and find their home within this spiritual family. »",
    pastorAppointment: "Available by appointment for pastoral counseling",
    defaultTestimonialQuote:
      "Bethany has become a true family for me. I found God's love and friends I can always rely on.",
    defaultTestimonialRole: "Member for 4 years",

    // Section: Community Origins (EEC & EPC)
    originsBadge: "Diversity & Unity in Christ",
    originsTitle: "Our members come from...",
    originsDesc:
      "In fraternal communion and rooted in faith with sister churches and communities, we celebrate together the unity of the Body of Christ.",
    eecName: "Evangelical Church of Cameroon",
    eecSubtitle1: "Fraternal Fellowship & Evangelical Heritage",
    eecSubtitle2: "Faithfulness • Love • Witness in Christ",
    eecBadge1: "Evangelical Church",
    eecBadge2: "Fraternal Partnership",
    epcName: "Presbyterian Church of Cameroon",
    epcSubtitle1: "Presbyterian & Reformed Tradition",
    epcSubtitle2: "Unity in Christ • The Burning Bush",
    epcBadge1: "Presbyterian Church",
    epcBadge2: "Fraternal Fellowship",
    pccName: "Presbyterian Church in Canada",
    pccSubtitle1: "Official Affiliation & Canadian Roots",
    pccBadge1: "Presbyterian Church in Canada",
    siloeName: "Siloé Christian Community of Montreal",
    siloeSubtitle1: "Fraternal Fellowship & Local Roots",
    siloeBadge1: "Siloé Community",
    galatiansVerse:
      "« There is neither Jew nor Greek... for you are all one in Christ Jesus » — Galatians 3:28",

    // About Page Full
    aboutHeaderBadge: "Who We Are",
    aboutHeaderTitle: "Our Christian Community, Our Vision, Our Faith",
    aboutHeaderDesc:
      "Discover the history, doctrinal foundations, and vision of Bethany Christian Community, a dedicated member of the Presbyterian Church in Canada.",
    aboutIdentityBadge: "Our Identity",
    aboutIdentityTitle: "A home of hospitality, grace, and spiritual growth.",
    aboutHistoryP1:
      "The name « Bethany » in the Gospels calls to mind the peaceful village where Jesus loved to rest, surrounded by his friends Martha, Mary, and Lazarus. It was a place of resurrection, deep friendship, hospitality, and revelation.",
    aboutHistoryP2:
      "Bethany Christian Community strives to be that same spiritual haven: a welcoming community where everyone, regardless of their past, can encounter Christ and take root in lasting faith.",
    aboutVisionTitle: "Our Vision",
    aboutVisionDesc:
      "To build a multi-generational church, passionate for God and devoted to blessing the city.",
    aboutMissionTitle: "Our Mission",
    aboutMissionDesc:
      "To disciple faithfully, love our neighbors, and proclaim the Gospel with relevance and grace.",
    pccTraditionDesc:
      "A historic, biblical, and reformed Christian heritage committed to the glory of God and neighborly love.",
    pastorSectionBadge: "Spiritual Leadership & Care",
    pastorSectionTitle: "Our Pastor",
    pastorSectionSubtitle:
      "A servant dedicated to teaching Scripture and nurturing every soul",
    pastorDetailedP1:
      "Serving the Lord and Bethany Christian Community for over 15 years, Pastor Narcisse is driven by a deep devotion to faithful biblical preaching and making authentic disciples.",
    pastorDetailedP2:
      "Holding rigorous theological training and extensive pastoral experience in family guidance, he ensures the Church remains a safe harbor of love, peace, and spiritual renewal for all who enter.",
    pastorPillarsTitle: "Key Pillars of Ministry:",
    pastorPillar1: "Biblical Teaching & Preaching",
    pastorPillar2: "Pastoral Care & Counseling",
    pastorPillar3: "Prayer & Family Intercession",
    pastorPillar4: "Missionary Vision & Outreach",

    // Ministries Page
    minHeaderBadge: "Community Life",
    minHeaderTitle: "Our Life Groups",
    minHeaderDesc:
      "At Bethany, every member has a place to grow, build lifelong friendships, and serve using the gifts God has given them.",
    minTargetLabel: "Target Audience & Format:",

    // Events Page
    eventsHeaderBadge: "Church Calendar",
    eventsHeaderTitle: "Events & Gatherings",
    eventsHeaderDesc:
      "Explore our upcoming worship services, prayer vigils, youth outings, community brunches, and biblical seminars.",
    eventsCatLabel: "Categories:",
    eventsCatAll: "All Events",
    eventsCatWorship: "Worship",
    eventsCatTeaching: "Teaching",
    eventsCatPrayer: "Prayer",
    eventsCatYouth: "Youth",
    eventsCatCommunity: "Community",
    eventSpeakerLabel: "Speaker:",

    // Prayer Wall Page
    prayerHeaderBadge: "Community Intercession",
    prayerHeaderTitle: "Prayer Wall & Intercession",
    prayerHeaderVerse:
      "« Pray for one another, that you may be healed. The effective, fervent prayer of a righteous man avails much. » — James 5:16",
    prayerSectionTitle: "Requests & Praises",
    prayerSectionSubtitle:
      "Click on « I prayed for this » to share your brotherly support.",

    // Contact Page
    contactHeaderBadge: "Find Us & Write to Us",
    contactHeaderTitle: "Contact & Directions",
    contactHeaderDesc:
      "Have questions, need information, or plan to visit us this Sunday? Find all contact details and the worship location address below.",
    contactInfoTitle: "Church Information",
    contactAddressLabel: "Main Office & Secretariat",
    contactAddressValue: "2401 avenue de l'abbé Giguere, Québec, QC G1C 0H4",
    contactWorshipAddressLabel: "Worship Location Address",
    contactWorshipAddressValue:
      "2401 avenue de l'abbé Giguere, Québec, QC G1C 0H4",
    contactPostalAddressLabel: "Mailing Address",
    contactPostalAddressValue:
      "1340 rue des Adages Québec (Québec) G3K0T2 Canada",
    contactPostalAddressNote:
      "For letters, official correspondence, and administrative mail",
    contactWorshipScheduleNote:
      "Sunday celebration at 10:30 AM (Doors open at 10:00 AM) • Weekday Bible study and prayer",
    contactParkingNote:
      "📍 Free on-site parking available for all guests and members",
    contactEmailLabel: "Email & Secretariat",
    contactEmailHours:
      "info@ccbethanie.ca • Response within 24 to 48 business hours",
    contactOpenMapsBtn: "Open in Google Maps",
    contactGetDirections: "Get Directions",
    howToComeTitle: "How to Get Here?",
    byCarTitle: "By Car:",
    byCarDesc: "Easy access via major highways with free adjacent parking lot.",
    byTransitTitle: "By STM Transit:",
    byTransitDesc: "Easily reachable by metro and direct bus routes.",
    formSendMsgTitle: "Send Us a Message",
    formSendMsgSubtitle:
      "Fill out the form below and our pastoral or welcome team will get back to you shortly.",
    formSuccessTitle: "Message Sent Successfully!",
    formSuccessDesc:
      "Thank you for getting in touch. We have received your inquiry and will reply as soon as possible.",
    formSendAnother: "Send Another Message",
    formNameLabel: "Full Name *",
    formNamePlaceholder: "E.g.: John Smith",
    formEmailLabel: "Email *",
    formEmailPlaceholder: "name@example.com",
    formPhoneLabel: "Phone",
    formPhonePlaceholder: "(514) 000-0000",
    formSubjectLabel: "Subject *",
    formSubjectGen: "General Information",
    formSubjectVisit: "Plan a First Visit",
    formSubjectPastoral: "Meeting with the Pastor",
    formSubjectBaptism: "Baptism or Membership",
    formSubjectPrayer: "Prayer Request",
    formSubjectOther: "Other Inquiry",
    formMsgLabel: "Your Message *",
    formMsgPlaceholder: "How can we assist you or pray with you?",
    formSubmitting: "Sending message...",
    formSubmitBtn: "Send Message",

    // Visit Modal
    visitModalBadge: "Welcome Home",
    visitModalTitle: "Plan Your Visit to Bethany",
    visitModalSubtitle:
      "Let us know when you're coming and we'll have a guide, a warm welcome, and coffee ready for you!",
    visitSuccessTitle: "We Can't Wait to Meet You!",
    visitSuccessDesc1: "Thank you",
    visitSuccessDesc2:
      "! Your visit has been registered. Our welcome team will be waiting for you at 10:15 AM this Sunday at the Welcome Desk.",
    visitArrivalLabel: "Recommended arrival time: 10:15 AM",
    visitAddressLabel:
      "Address: 2401 avenue de l'abbé Giguere, Québec, QC G1C 0H4 (Free on-site parking)",
    visitKidsNote:
      "👶 Your children will be warmly welcomed at Bethany Kids with age-appropriate activities.",
    visitBtnDone: "Great, thank you!",
    visitDateLabel: "Preferred Sunday Date *",
    visitPeopleCountLabel: "Number of Adults *",
    visitChildrenCountLabel: "Number of Children (Bethany Kids)",
    visitQuestionsLabel:
      "Do you have any specific questions or accessibility needs?",
    visitQuestionsPlaceholder: "E.g.: Wheelchair access, nursery care, etc.",
    visitParkingCheckbox:
      "I would like to receive detailed parking information",

    // Donation Modal
    donateModalBadge: "Generosity & Support",
    donateModalTitle: "Give to God's Work",
    donateVerse:
      "« Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver. » — 2 Cor 9:7",
    donateSuccessTitle: "Thank You Generously for Your Gift!",
    donateSuccessP1: "Your contribution of",
    donateSuccessP2: "towards",
    donateSuccessP3:
      "actively supports church ministries, community outreach, and the proclamation of the Gospel in Montreal.",
    donateTaxNotice:
      "Official tax receipt issued for Canadian income tax purposes.",
    donateEmailNotice:
      "A confirmation email and your digital receipt have been recorded.",
    donateFundLabel: "Fund Designation *",
    donateFund1: "Tithes & Offerings",
    donateFund2: "Mission Fund",
    donateFund3: "Benevolence & Care",
    donateFund4: "Building & Renovations",
    donateAmountLabel: "Donation Amount (CAD) *",
    donateCustomAmountPlaceholder: "Other amount ($)",
    donatePaymentMethodLabel: "Payment Method *",
    donateCardMethod: "Credit / Debit Card",
    donateInteracMethod: "Interac e-Transfer",
    donateCardSecureDesc: "100% secure payment processing via Stripe / Moneris",
    donateInteracDesc:
      "Send to finances@ccbethanie.ca (Direct deposit enabled)",
    donateNameLabel: "Full Name *",
    donateNamePlaceholder: "For your official tax receipt",
    donateEmailLabel: "Email for Tax Receipt *",
    donateAnonymousLabel: "Make this donation anonymously",
    donateSubmitBtn: "Confirm my donation of",

    // Prayer Modal
    prayerModalBadge: "Intercession & Care",
    prayerModalTitle: "Share a Prayer Request",
    prayerModalVerse:
      "« Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. » — Phil 4:6",
    prayerSuccessTitle: "Your Request Has Been Received",
    prayerSuccessDesc:
      "Our pastoral team and Bethany intercessors are already lifting your prayer before God in faith.",
    prayerPublicNotice:
      "✨ Your request is displayed on the Prayer Wall so our congregation can join in prayer.",
    prayerPrivateNotice:
      "🔒 Your request will be kept strictly confidential within the pastoral team.",
    prayerVisibilityLabel: "Prayer Visibility *",
    prayerPublicTabTitle: "Prayer Wall",
    prayerPublicTabDesc: "Visible to the congregation to pray together",
    prayerPrivateTabTitle: "Confidential",
    prayerPrivateTabDesc: "Shared only with pastoral leadership",
    prayerCategoryLabel: "Prayer Category *",
    prayerCatHealth: "Health & Healing",
    prayerCatFamily: "Family & Marriage",
    prayerCatWork: "Work & Studies",
    prayerCatSpiritual: "Spiritual Life",
    prayerCatThanks: "Thanksgiving & Praise",
    prayerCatOther: "Other Need",
    prayerAuthorLabel: "Your First or Full Name *",
    prayerAuthorPlaceholder: "E.g.: David M.",
    prayerAnonymousCheckbox: "Post anonymously",
    prayerTextLabel: "Your Prayer Request or Praise *",
    prayerTextPlaceholder: "Describe your situation in your own words...",
    prayerSubmitBtn: "Submit Prayer Request",

    // Sermon Player Modal
    sermonDefaultSeries: "Bethany Sermon",
    sermonAudioPlaying: "Audio playing...",
    sermonListenAudio: "Listen to audio recording",
    sermonDurationLabel: "Duration:",
    sermonSpeakerRole: "Preacher",
    sermonScriptureLabel: "Main Scripture Passage",
    sermonSummaryLabel: "Message Summary",

    // Admin Page
    adminHeaderBadge: "Administration Portal",
    adminMainTitle: "Church Management Dashboard",
    adminSubtitle:
      "Centralized management of sermons, events, prayer wall requests, planned visits, and donations.",
    adminTabSermons: "Sermons",
    adminTabEvents: "Events",
    adminTabPrayers: "Prayer Wall",
    adminTabVisits: "Planned Visits",
    adminTabContacts: "Inquiries",
    adminTabDonations: "Donations & Giving",
    adminBtnAddSermon: "+ Add Sermon",
    adminBtnAddEvent: "+ Add Event",
    adminRefreshBtn: "Refresh Data",

    // Footer
    footerAbout:
      "A warm, vibrant community in Montreal, rooted in the Gospel of Jesus Christ and dedicated to serving our city with love.",
    footerFollow: "Follow Our Activities",
    footerQuickLinks: "Quick Navigation",
    footerMinistries: "Our Ministries",
    footerContact: "Contact Information",
    footerNewsletterTitle: "Stay Connected",
    footerNewsletterSubtitle:
      "Receive our weekly devotionals and community announcements.",
    footerNewsletterPlaceholder: "Your email address",
    footerNewsletterBtn: "Subscribe",
    footerNewsletterSuccess: "Thank you for subscribing!",
    footerRights: "All rights reserved.",
    footerPresbyterianAffiliation:
      "Member of The Presbyterian Church in Canada (Église Presbytérienne au Canada)",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("ccb_language");
      return saved === "en" ? "en" : "fr";
    } catch {
      return "fr";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ccb_language", language);
    } catch (e) {
      console.warn("LocalStorage unavailable for language preference", e);
    }
    // Set document lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
  };

  const t = (key) => {
    return translations[language]?.[key] || translations["fr"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
