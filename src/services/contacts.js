import { Contact } from '../db/models/Contact.js';

export const getAllContacts = async () => {
  try {
    console.log('🔍 Veritabanı sorgusu yapılıyor...');
    const contacts = await Contact.find().lean();
    console.log(`✅ Veritabanından ${contacts.length} adet contact çekildi.`);

    if (contacts.length === 0) {
      console.log(
        '⚠️ Uyarı: Veritabanında veri yok veya koleksiyon adı uyuşmuyor!'
      );
    }

    return contacts;
  } catch (error) {
    console.error('❌ Veritabanı sorgu hatası:', error.message);
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId).lean();
  } catch (error) {
    console.error('getContactById hatası:', error);
    throw error;
  }
};
