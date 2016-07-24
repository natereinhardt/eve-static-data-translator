

/**
 1 - Mining Barge

 17476       Covetor
 17478       Retriever
 17480       Procurer

 2 - Exhumer

 22548       Mackinaw
 22546       Skiff
 22544       Hulk

 3 - Mining Frigate

 32880       Venture
 33697       Prospect
 353428      Endurance

 4 - Industrial Command Ship

 28606       Orca
 28352       Rorqual

 5 - Hauler

 ~AMAR
 1944        Bestower
 19744       Sigil
 12733       Prorator
 12753       Impel
 20183       Providence
 28850       Ark
 ~CALDARI
 648         Badger
 649         Tayra
 12729       Crane
 12731       Bustard
 20185       Charon
 28844       Rhea
 ~GALLENTE
 650         Nereus
 654         Kryos
 655         Epithal
 656         Miasmos
 657         Iteron Mark V
 12743       Viator
 12745       Occator
 20187       Obelisk
 28848       Anshar

 ~MINMATAR
 651         Hoarder
 652         Mammoth
 653         Wreathe
 12735       Prowler
 12747       Mastodon
 20189       Fenrir
 28846       Nomad



 ships = [<item id of mining/hauling ships>]
 * 1) Call Item Types "https://crest-tq.eveonline.com/inventory/types/{shipIds}
 * ---- a) Create Ship in DB
 *          i) Set ship type (Number 1-3)
 *          1 - Mining Barge
 *          2 - Exhumer
 *          3 - Mining Frigate
 *          4 - Industrial Command Ship
 *          5 - Hauler
 *
 *
 * NOTE: Build imageUrls
 *
 * 1) imgUrlSml: https://imageserver.eveonline.com/Type/{typeId}_32.png
 * 2) imgUrlLrg: https://imageserver.eveonline.com/Type/{typeId}_62.png
 * 3) renderUrl: https://imageserver.eveonline.com/Render/{typeID}_256.png
 *
 *
 * */