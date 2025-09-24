// static/admin/js/youtube_admin.js
(function() {
    'use strict';
    
    // Attendre que le DOM soit chargé
    document.addEventListener('DOMContentLoaded', function() {
        
        // Fonction pour valider une URL YouTube
        function isValidYouTubeUrl(url) {
            const patterns = [
                /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
                /youtube\.com\/watch\?.*v=([^&\n?#]+)/
            ];
            
            return patterns.some(pattern => pattern.test(url));
        }
        
        // Fonction pour extraire l'ID YouTube
        function extractYouTubeId(url) {
            const patterns = [
                /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
                /youtube\.com\/watch\?.*v=([^&\n?#]+)/
            ];
            
            for (const pattern of patterns) {
                const match = url.match(pattern);
                if (match) {
                    return match[1];
                }
            }
            return null;
        }
        
        // Trouver le champ URL YouTube
        const youtubeUrlField = document.querySelector('input[name="youtube_url"]');
        const contentTypeField = document.querySelector('select[name="content_type"]');
        
        if (youtubeUrlField) {
            
            // Créer un élément pour afficher les messages de validation
            const validationMessage = document.createElement('div');
            validationMessage.style.marginTop = '5px';
            validationMessage.style.fontSize = '12px';
            youtubeUrlField.parentNode.appendChild(validationMessage);
            
            // Fonction pour afficher les messages
            function showMessage(message, isError = false) {
                validationMessage.textContent = message;
                validationMessage.style.color = isError ? '#cc0000' : '#00aa00';
            }
            
            // Validation en temps réel de l'URL YouTube
            youtubeUrlField.addEventListener('blur', function() {
                const url = this.value.trim();
                
                if (!url) {
                    showMessage('');
                    return;
                }
                
                if (isValidYouTubeUrl(url)) {
                    const videoId = extractYouTubeId(url);
                    showMessage(`✓ URL YouTube valide (ID: ${videoId})`);
                    
                    // Changer automatiquement le type de contenu si c'est encore "media"
                    if (contentTypeField && contentTypeField.value === 'media') {
                        contentTypeField.value = 'youtube';
                        showMessage(`✓ URL YouTube valide (ID: ${videoId}) - Type changé vers YouTube`);
                    }
                } else {
                    showMessage('✗ URL YouTube non valide. Formats acceptés: youtube.com/watch?v=..., youtu.be/...', true);
                }
            });
            
            // Validation lors de la soumission du formulaire
            const form = youtubeUrlField.closest('form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    const url = youtubeUrlField.value.trim();
                    const contentType = contentTypeField ? contentTypeField.value : '';
                    
                    // Si une URL YouTube est fournie mais le type n'est pas YouTube
                    if (url && contentType === 'youtube' && !isValidYouTubeUrl(url)) {
                        e.preventDefault();
                        alert('Veuillez fournir une URL YouTube valide ou changer le type de contenu.');
                        youtubeUrlField.focus();
                        return false;
                    }
                    
                    // Si le type est YouTube mais pas d'URL
                    if (contentType === 'youtube' && !url) {
                        e.preventDefault();
                        alert('Une URL YouTube est requise pour ce type de contenu.');
                        youtubeUrlField.focus();
                        return false;
                    }
                });
            }
        }
        
        // Afficher/masquer la section YouTube selon le type de contenu
        if (contentTypeField) {
            const youtubeFieldset = document.querySelector('.field-youtube_url').closest('fieldset');
            
            function toggleYouTubeSection() {
                const contentType = contentTypeField.value;
                if (youtubeFieldset) {
                    if (contentType === 'youtube' || contentType === 'mixed') {
                        youtubeFieldset.style.display = 'block';
                    } else {
                        youtubeFieldset.style.display = 'none';
                    }
                }
            }
            
            // Appliquer au chargement
            toggleYouTubeSection();
            
            // Appliquer lors du changement
            contentTypeField.addEventListener('change', toggleYouTubeSection);
        }
        
        // Amélioration de l'aperçu YouTube
        const youtubePreview = document.querySelector('.field-youtube_preview_admin');
        if (youtubePreview) {
            const iframe = youtubePreview.querySelector('iframe');
            if (iframe) {
                // Ajouter un bouton pour redimensionner la prévisualisation
                const resizeButton = document.createElement('button');
                resizeButton.type = 'button';
                resizeButton.textContent = 'Agrandir/Réduire';
                resizeButton.style.marginTop = '10px';
                resizeButton.style.padding = '5px 10px';
                resizeButton.style.fontSize = '12px';
                
                let isLarge = false;
                resizeButton.addEventListener('click', function() {
                    if (isLarge) {
                        iframe.width = '300';
                        iframe.height = '169';
                        resizeButton.textContent = 'Agrandir';
                    } else {
                        iframe.width = '560';
                        iframe.height = '315';
                        resizeButton.textContent = 'Réduire';
                    }
                    isLarge = !isLarge;
                });
                
                youtubePreview.appendChild(resizeButton);
            }
        }
    });
})();