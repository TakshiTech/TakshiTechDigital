import { Metadata } from 'next';
import { supabaseServer } from '@/lib/supabase/server';

export async function getSeoMetadata(path: string, defaultMetadata?: Metadata): Promise<Metadata> {
    try {
        const supabase = await supabaseServer();
        const { data } = await supabase
            .from('seo_metadata')
            .select('*')
            .eq('page_path', path)
            .single();

        if (!data) {
            return defaultMetadata || {};
        }

        return {
            title: data.title || defaultMetadata?.title,
            description: data.description || defaultMetadata?.description,
            keywords: data.keywords?.length ? data.keywords : defaultMetadata?.keywords,
            openGraph: {
                ...defaultMetadata?.openGraph,
                title: data.title || defaultMetadata?.openGraph?.title,
                description: data.description || defaultMetadata?.openGraph?.description,
                url: `https://www.takshitechdigital.com${path}`,
            },
        };
    } catch (error) {
        console.error(`Failed to fetch SEO for ${path}`, error);
        return defaultMetadata || {};
    }
}
