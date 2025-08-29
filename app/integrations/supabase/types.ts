
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_users: {
        Row: {
          id: string
          username: string
          name: string
          password: string
          photo_url: string | null
          wallpaper_url: string | null
          online: boolean
          last_seen: string
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          name: string
          password: string
          photo_url?: string | null
          wallpaper_url?: string | null
          online?: boolean
          last_seen?: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          name?: string
          password?: string
          photo_url?: string | null
          wallpaper_url?: string | null
          online?: boolean
          last_seen?: string
          created_at?: string
        }
        Relationships: []
      }
      channels: {
        Row: {
          id: string
          name: string
          handle: string | null
          description: string | null
          created_by: string | null
          created_at: string
          background_image_url: string | null
        }
        Insert: {
          id?: string
          name: string
          handle?: string | null
          description?: string | null
          created_by?: string | null
          created_at?: string
          background_image_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          handle?: string | null
          description?: string | null
          created_by?: string | null
          created_at?: string
          background_image_url?: string | null
        }
        Relationships: []
      }
      channel_members: {
        Row: {
          id: string
          channel_id: string | null
          user_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          channel_id?: string | null
          user_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          channel_id?: string | null
          user_id?: string
          joined_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_members_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          }
        ]
      }
      direct_chats: {
        Row: {
          id: string
          user1_id: string
          user2_id: string
          background_image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user1_id: string
          user2_id: string
          background_image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user1_id?: string
          user2_id?: string
          background_image_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          sender_id: string
          type: string
          text: string | null
          attachment_url: string | null
          file_name: string | null
          mime_type: string | null
          location: Json | null
          duration_sec: number | null
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          sender_id: string
          type: string
          text?: string | null
          attachment_url?: string | null
          file_name?: string | null
          mime_type?: string | null
          location?: Json | null
          duration_sec?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          sender_id?: string
          type?: string
          text?: string | null
          attachment_url?: string | null
          file_name?: string | null
          mime_type?: string | null
          location?: Json | null
          duration_sec?: number | null
          created_at?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
