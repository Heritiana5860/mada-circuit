import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

// Query de test simple
const TEST_QUERY = gql`
  query TestConnection {
    allDestinations {
      id
      nom
      region
    }
  }
`;

const TestGraphQL = () => {
  const { data, loading, error, refetch } = useQuery(TEST_QUERY);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Test de connexion GraphQL</h1>
          <p className="text-muted-foreground">
            Vérification de la connexion entre le frontend et le backend
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {!loading && !error && <CheckCircle className="h-5 w-5 text-green-600" />}
              {error && <XCircle className="h-5 w-5 text-red-600" />}
              État de la connexion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading && (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Test de connexion en cours...</p>
              </div>
            )}

            {error && (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Erreur de connexion</h3>
                  <p className="text-red-700 text-sm mb-2">
                    <strong>Message:</strong> {error.message}
                  </p>
                  {error.networkError && (
                    <p className="text-red-700 text-sm">
                      <strong>Erreur réseau:</strong> {error.networkError.message}
                    </p>
                  )}
                  {error.graphQLErrors?.length > 0 && (
                    <div className="mt-2">
                      <strong className="text-red-800">Erreurs GraphQL:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {error.graphQLErrors.map((err, index) => (
                          <li key={index} className="text-red-700 text-sm">
                            {err.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Solutions possibles:</h4>
                  <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
                    <li>Vérifiez que le serveur Django est démarré sur https://api.madagascar-voyagesolidaire.com</li>
                    <li>Vérifiez que l'endpoint GraphQL est accessible à /graphql/</li>
                    <li>Vérifiez la configuration CORS dans Django</li>
                    <li>Vérifiez que les migrations sont appliquées</li>
                  </ul>
                </div>
              </div>
            )}

            {data && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">
                    ✅ Connexion réussie !
                  </h3>
                  <p className="text-green-700 text-sm">
                    Le frontend communique correctement avec le backend GraphQL.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Données reçues:</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Nombre de destinations:</strong> {data.allDestinations?.length || 0}
                    </p>
                    
                    {data.allDestinations?.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Destinations trouvées:</p>
                        <div className="grid gap-2">
                          {data.allDestinations.slice(0, 5).map((destination) => (
                            <div key={destination.id} className="bg-white p-2 rounded border text-sm">
                              <strong>{destination.nom}</strong> - {destination.region}
                            </div>
                          ))}
                          {data.allDestinations.length > 5 && (
                            <p className="text-xs text-muted-foreground">
                              ... et {data.allDestinations.length - 5} autres
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Informations techniques:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Endpoint:</strong> https://api.madagascar-voyagesolidaire.com/graphql/</p>
                    <p><strong>Query testée:</strong> allDestinations</p>
                    <p><strong>Apollo Client:</strong> Configuré avec upload support</p>
                    <p><strong>CORS:</strong> Configuré correctement</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center pt-4">
              <Button onClick={() => refetch()} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Test en cours...
                  </>
                ) : (
                  'Relancer le test'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prochaines étapes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>✅ Configuration Apollo Client</p>
              <p>✅ Test de connexion GraphQL</p>
              <p>✅ Gestion des erreurs CORS</p>
              <p>🔄 Pages d'authentification (Login/Register)</p>
              <p>🔄 Backoffice admin</p>
              <p>🔄 Intégration avec le formulaire de contact</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <a 
            href="/" 
            className="text-primary hover:underline"
          >
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestGraphQL;
