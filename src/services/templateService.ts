import api from './api';

export const templateService = {
  // Get all exercises (from Admin Library)
  getExercises: async () => {
    try {
      const response = await api.get('/v1/coach/templates/exercises');
      return response.data;
    } catch (error: any) {
      console.error('Get exercises error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get all templates for the coach
  getTemplates: async () => {
    try {
      const response = await api.get('/v1/coach/templates');
      return response.data;
    } catch (error: any) {
      console.error('Get templates error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get single template
  getTemplate: async (id: string) => {
    try {
      const response = await api.get(`/v1/coach/templates/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Get template error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Create a new template
  createTemplate: async (templateData: any) => {
    try {
      const response = await api.post('/v1/coach/templates', templateData);
      return response.data;
    } catch (error: any) {
      console.error('Create template error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Update template
  updateTemplate: async (id: string, templateData: any) => {
    try {
      const response = await api.put(`/v1/coach/templates/${id}`, templateData);
      return response.data;
    } catch (error: any) {
      console.error('Update template error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Delete template
  deleteTemplate: async (id: string) => {
    try {
      const response = await api.delete(`/v1/coach/templates/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete template error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Assign template to athletes
  assignTemplate: async (templateId: string, athleteIds: string[], startDate: string) => {
    try {
      const response = await api.post(`/v1/coach/templates/${templateId}/assign`, {
        athleteIds,
        startDate
      });
      return response.data;
    } catch (error: any) {
      console.error('Assign template error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Generate AI Template
  generateAITemplate: async (params: { style: string, focusArea: string, duration: number, difficulty: string }) => {
    try {
      const response = await api.post('/v1/coach/templates/generate-ai', params);
      return response.data;
    } catch (error: any) {
      console.error('Generate AI template error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  }
};
