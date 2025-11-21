from django.contrib.sitemaps import Sitemap

class ReactStaticSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return [
            "/", 
            "/circuits",
            "/voyages-sur-mesure",
            "/location-4x4",
            "/pangalanes",
            "/blog",
            "/programme-solidaire",
            "/objectif-association",
            "/contact",
            "/guides",
            "/testimonia",
        ]

    def location(self, item):
        return item
