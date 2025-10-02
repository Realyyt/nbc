import api from '../lib/api';

export type AffiliateProgram = {
  id: string;
  title: string;
  description?: string;
  platform?: string;
  imageUrl?: string;
  affiliateLink: string;
  price?: number | string;
  rating?: number;
  instructor?: string;
  mode?: 'physical' | 'online' | 'hybrid' | string;
  priceType?: 'free' | 'paid' | 'sponsorship' | string;
  isPublished?: boolean;
};

export const affiliateProgramsApi = {
  async listPublic(): Promise<AffiliateProgram[]> {
    const { data } = await api.get('/affiliates/programs');
    return data.programs || [];
  },

  async listAdmin(): Promise<AffiliateProgram[]> {
    const { data } = await api.get('/admin/programs');
    return data.programs || [];
  },

  async create(program: Omit<AffiliateProgram, 'id'>): Promise<AffiliateProgram> {
    const { data } = await api.post('/admin/programs', {
      title: program.title,
      description: program.description,
      platform: program.platform,
      imageUrl: program.imageUrl,
      affiliateLink: program.affiliateLink,
      price: program.price,
      rating: program.rating,
      instructor: program.instructor,
      mode: program.mode,
      priceType: program.priceType,
      isPublished: program.isPublished ?? true,
    });
    return data.program;
  },

  async update(id: string, updates: Partial<Omit<AffiliateProgram, 'id'>>): Promise<AffiliateProgram> {
    const { data } = await api.put(`/admin/programs/${id}`, updates);
    return data.program;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/admin/programs/${id}`);
  }
};


