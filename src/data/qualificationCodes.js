export const QUALIFICATION_CODES = [
  {
    code: '2001',
    degree: 'Ortaöğretim',
    category: 'Genel',
    title: 'Herhangi bir ortaöğretim (lise veya dengi) programından mezun olmak',
    description: 'Düz lise, Anadolu lisesi, fen lisesi veya meslek lisesi fark etmeksizin tüm lise mezunlarının başvurabileceği genel lise kadro kodudur.',
    tips: 'En yüksek rekabetin olduğu ve genellikle 85+ puanlarla kapatan lise kodudur.'
  },
  {
    code: '3001',
    degree: 'Ön Lisans',
    category: 'Genel',
    title: 'Herhangi bir ön lisans programından mezun olmak',
    description: 'Bölüm ayrımı gözetmeksizin herhangi bir 2 yıllık üniversite (MYO) programından mezun olan tüm adayların tercih edebileceği genel ön lisans kodudur.',
    tips: 'Bölüm şartı aramayan memurluk, şoförlük, hizmetli veya büro kadrolarında sıkça kullanılır.'
  },
  {
    code: '4001',
    degree: 'Lisans',
    category: 'Genel',
    title: 'Herhangi bir lisans programından mezun olmak',
    description: '4 yıllık herhangi bir fakülte veya yüksekokul lisans programından mezun olan tüm KPSS lisans adaylarının başvurabildiği üniversite genel kodudur.',
    tips: 'Merkezi atamalarda VHKİ, ambar memurluğu, büro personeli gibi kadrolarda çok yaygındır.'
  },
  {
    code: '4531',
    degree: 'Lisans',
    category: 'Mühendislik & Bilişim',
    title: 'Bilgisayar Mühendisliği lisans programından mezun olmak',
    description: 'Bilgisayar Mühendisliği, Bilgisayar Bilimleri Mühendisliği veya Yazılım Mühendisliği mezunları için açılan teknik kadro kodudur.',
    tips: 'Kamuda Mühendis, Bilişim Personeli, Sistem Analisti ve Programcı unvanlarında kullanılır.'
  },
  {
    code: '4421',
    degree: 'Lisans',
    category: 'Hukuk',
    title: 'Hukuk lisans programından mezun olmak',
    description: 'Hukuk Fakültesi mezunlarının başvuru yapabildiği kadro kodudur.',
    tips: 'Avukatlık, Hukuk Müşavirliği ve Bakanlık uzman yardımcılıklarında aranır.'
  },
  {
    code: '4431',
    degree: 'Lisans',
    category: 'İİBF',
    title: 'İşletme lisans programından mezun olmak',
    description: 'İşletme, İşletmecilik veya eşdeğer lisans programlarından mezuniyeti şart koşan koddur.',
    tips: 'Maliye, SGK, Gelir İdaresi ve KİT pozisyonlarında sıklıkla 4429 ve 4459 kodlarıyla birlikte verilir.'
  },
  {
    code: '4429',
    degree: 'Lisans',
    category: 'İİBF',
    title: 'İktisat lisans programından mezun olmak',
    description: 'İktisat, Ekonomi veya eşdeğer lisans programlarından mezun adaylar içindir.',
    tips: 'Mali hizmet uzmanlıkları ve denetmen yardımcılıklarında temel koddur.'
  },
  {
    code: '4459',
    degree: 'Lisans',
    category: 'İİBF',
    title: 'Maliye lisans programından mezun olmak',
    description: 'Maliye veya Maliye-Muhasebe lisans mezunları için geçerlidir.',
    tips: 'Gelir Uzmanlığı (GUY) ve Defterdarlık kadrolarının en çok talep gören kodudur.'
  },
  {
    code: '4605',
    degree: 'Lisans',
    category: 'Sağlık',
    title: 'Hemşirelik lisans programından mezun olmak',
    description: 'Hemşirelik veya Sağlık Memurluğu lisans programı mezunları için geçerlidir.',
    tips: 'Sağlık Bakanlığı merkezi atamalarında en büyük kontenjan bu koda ayrılır.'
  },
  {
    code: '3005',
    degree: 'Ön Lisans',
    category: 'Sağlık',
    title: 'Tıbbi Dokümantasyon ve Sekreterlik ön lisans mezunu olmak',
    description: 'Sağlık kurumlarında tıbbi sekreter kadrolarına atanmak için aranan ön lisans kodudur.',
    tips: 'Hastaneler ve il sağlık müdürlüklerindeki alımlarda yüzlerce kontenjan açılmaktadır.'
  },
  {
    code: '3007',
    degree: 'Ön Lisans',
    category: 'Adalet',
    title: 'Adalet ön lisans programından mezun olmak',
    description: 'Adalet MYO veya Adalet Meslek Eğitimi mezunları için geçerlidir.',
    tips: 'Adalet Bakanlığı Zabıt Katibi, Cezaevi Katibi ve İcra Katibi alımlarında önceliklidir.'
  },
  {
    code: '3249',
    degree: 'Ön Lisans',
    category: 'Mühendislik & Bilişim',
    title: 'Bilgisayar Programcılığı ön lisans programından mezun olmak',
    description: 'Bilgisayar Programcılığı, Bilgisayar Operatörlüğü MYO mezunları için geçerlidir.',
    tips: 'Tekniker ve Bilgisayar İşletmeni kadrolarında ön lisansta en sık aranan kodlardandır.'
  },
  {
    code: '3248',
    degree: 'Ön Lisans',
    category: 'Büro',
    title: 'Büro Yönetimi ve Yönetici Asistanlığı ön lisans mezunu olmak',
    description: 'Büro Hizmetleri, Yönetici Asistanlığı veya Sekreterlik mezunları içindir.',
    tips: 'Üniversiteler ve bakanlıkların taşra büro personeli kadrolarında yoğun talep görür.'
  },
  {
    code: '4639',
    degree: 'Lisans',
    category: 'Teknik',
    title: 'İnşaat Mühendisliği lisans programından mezun olmak',
    description: 'İnşaat Mühendisliği lisans programı mezunları için aranır.',
    tips: 'DSİ, Karayolları, Çevre Şehircilik Bakanlığı ve Belediyelerde mühendis kadroları içindir.'
  },
  {
    code: '4611',
    degree: 'Lisans',
    category: 'Teknik',
    title: 'Elektrik veya Elektrik-Elektronik Mühendisliği lisans programı',
    description: 'Elektrik Mühendisliği, Elektrik-Elektronik Mühendisliği lisans mezunları içindir.',
    tips: 'TEİAŞ, TEDAŞ, TCDD ve kamu altyapı kurumlarında yaygındır.'
  },
  {
    code: '6225',
    degree: 'Özel Şart',
    category: 'Sertifika',
    title: 'M.E.B.\'den Onaylı Bilgisayar İşletmeni Sertifikasına Sahip Olmak',
    description: 'Milli Eğitim Bakanlığı onaylı en az 120 veya 160 saatlik Bilgisayar İşletmeni Sertifikasına sahip olmak veya üniversite öğrenimi sırasında transkriptinde bilgisayar/bilişim dersi almış ve başarılı olduğunu belgelemek.',
    tips: 'Üniversitede bilgisayar dersi gördüyseniz transkriptiniz sertifika yerine geçer!'
  },
  {
    code: '6506',
    degree: 'Özel Şart',
    category: 'Ehliyet',
    title: 'B Sınıfı Sürücü Belgesine Sahip Olmak',
    description: 'En az B sınıfı otomobil sürücü belgesine sahip olmak.',
    tips: 'Şoför, denetim görevlisi, orman muhafaza memuru ve saha personeli alımlarında aranır.'
  },
  {
    code: '6511',
    degree: 'Özel Şart',
    category: 'Ehliyet',
    title: 'C Sınıfı Sürücü Belgesine Sahip Olmak',
    description: 'Kamyon veya çekici kullanmaya yetkili C sınıfı ehliyete sahip olmak.',
    tips: 'Belediyeler, Karayolları ve İtfaiye birimlerinde kamyon/ağır vasıta şoförü kadrolarında aranır.'
  },
  {
    code: '7111',
    degree: 'Özel Şart',
    category: 'Sınav',
    title: 'KPSS İlgili Puan Türünden Asgari Puanı Almış Olmak',
    description: 'İlan edilen kadro için belirlenen asgari taban puanı (örneğin 60, 65 veya 70) almış olmak.',
    tips: 'Merkezi atamada taban puan aranmaz (puan sıralaması geçerlidir), açıktan alımlarda kurum baraj koyar.'
  },
  {
    code: '7101',
    degree: 'Özel Şart',
    category: 'Yabancı Dil',
    title: 'YDS İngilizce En Az (C) Düzeyinde Puan Almış Olmak',
    description: 'ÖSYM Yabancı Dil Bilgisi Seviye Tespit Sınavından (veya ÖSYM denkliği olan sınavlardan) en az 70 puan almış olmak.',
    tips: 'Uzman yardımcılığı, AB uzmanlığı ve kariyer mesleklerinde zorunludur.'
  },
  {
    code: '7225',
    degree: 'Özel Şart',
    category: 'Mevzuat',
    title: 'Güvenlik Tahkikatı ve Arşiv Araştırması Olumlu Olmak',
    description: '7315 sayılı Kanun uyarınca atanacak kişinin arşiv araştırmasının veya güvenlik soruşturmasının olumlu sonuçlanması şartıdır.',
    tips: 'Kamuda ilk defa göreve başlayacak tüm adaylar için yasal zorunluluktur.'
  },
  {
    code: '7300',
    degree: 'Özel Şart',
    category: 'Çalışma Şartı',
    title: 'Vardiyalı ve Gece Çalışmasına Uygun Olmak',
    description: '24 saat esasına göre nöbetleşe vardiya usulü çalışmaya engel sağlık ve bedensel durumu bulunmamak.',
    tips: 'Zabıt Katipliği, Güvenlik, Sağlık, İnfaz Koruma ve Havalimanı personeli kadrolarında sıkça yer alır.'
  },
  {
    code: '7322',
    degree: 'Özel Şart',
    category: 'Yaş',
    title: 'Giriş Sınavının Yapıldığı Yılın Ocak Ayının Birinci Günü İtibarıyla 35 Yaşını Doldurmamış Olmak',
    description: 'Kariyer mesleklerde (Uzman Yardımcılığı, Müfettiş Yardımcılığı) aranan yasal yaş şartıdır.',
    tips: 'A Grubu kadroların çoğunda 35 yaş sınırı kesin kuraldır; B Grubu düz memurlukta ise genel olarak yaş sınırı yoktur.'
  }
];
