import axios from 'axios';

export const api  = axios.create({
    baseURL: 'https://xjzklmdrlopnuxieyoyb.supabase.co/rest/v1/posts?select=id',
    headers: {
        apikey: " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqemtsbWRybG9wbnV4aWV5b3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTA3NzEsImV4cCI6MjA3ODM4Njc3MX0.AKuxh51aQCkwTLF4t3LrWs9byHiqw8x6A2UNAB7wWRU",
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqemtsbWRybG9wbnV4aWV5b3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTA3NzEsImV4cCI6MjA3ODM4Njc3MX0.AKuxh51aQCkwTLF4t3LrWs9byHiqw8x6A2UNAB7wWRU"
    }
})