(function($) {
    'use strict';
    
    function toggleItineraireFields(row) {
        var typeField = row.find('select[name*="type_itineraire"]');
        var type = typeField.val();
        
        // Champs pour trajet
        var trajetFields = row.find('input[name*="lieu_depart"], input[name*="lieu_arrivee"], input[name*="distance_km"], input[name*="duree_trajet"]');
        var trajetCells = trajetFields.closest('td');
        
        // Champs pour séjour  
        var sejourFields = row.find('input[name*="lieu"], input[name*="nuitees"]');
        var sejourCells = sejourFields.closest('td');
        
        // Reset styles
        trajetCells.removeClass('trajet-fields');
        sejourCells.removeClass('sejour-fields');
        
        if (type === 'trajet') {
            trajetCells.show().addClass('trajet-fields');
            sejourCells.hide();
            sejourFields.val('');
        } else if (type === 'sejour') {
            trajetCells.hide();
            sejourCells.show().addClass('sejour-fields');
            trajetFields.val('');
        }
    }
    
    $(document).ready(function() {
        console.log('Initialisation des itinéraires...');
        
        // Initialiser les champs existants
        $('.itineraires-inline .form-row').each(function() {
            toggleItineraireFields($(this));
        });
        
        // Gestionnaire pour les changements de type
        $(document).on('change', 'select[name*="type_itineraire"]', function() {
            toggleItineraireFields($(this).closest('.form-row'));
        });
        
        // Gestionnaire pour les nouvelles lignes ajoutées
        $(document).on('click', '.add-row a', function() {
            setTimeout(function() {
                $('.itineraires-inline .form-row:last').each(function() {
                    toggleItineraireFields($(this));
                });
            }, 200);
        });
    });
})(django.jQuery);