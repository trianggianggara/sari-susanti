export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          slug: string
          name: string
          name_en: string | null
          description: string | null
          description_en: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          name_en?: string | null
          description?: string | null
          description_en?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          name_en?: string | null
          description?: string | null
          description_en?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string
          slug: string
          name: string
          name_en: string | null
          short_description: string | null
          short_description_en: string | null
          description: string | null
          description_en: string | null
          price: number
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          slug: string
          name: string
          name_en?: string | null
          short_description?: string | null
          short_description_en?: string | null
          description?: string | null
          description_en?: string | null
          price: number
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          slug?: string
          name?: string
          name_en?: string | null
          short_description?: string | null
          short_description_en?: string | null
          description?: string | null
          description_en?: string | null
          price?: number
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      banners: {
        Row: {
          id: string
          title: string
          title_en: string | null
          subtitle: string | null
          subtitle_en: string | null
          image_url: string
          cta_text: string | null
          cta_text_en: string | null
          cta_link: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      testimonials: {
        Row: {
          id: string
          customer_name: string
          customer_role: string | null
          customer_avatar_url: string | null
          content: string
          content_en: string | null
          rating: number
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          question_en: string | null
          answer: string
          answer_en: string | null
          category: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          updated_at: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
