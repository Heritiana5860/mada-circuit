import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Circuits from "./pages/Circuits";
import CircuitDetail from "./pages/CircuitDetail";
import VoyagesSurMesure from "./pages/VoyagesSurMesure";
import Location4x4 from "./pages/Location4x4";
import VehicleDetailSimple from "./pages/VehicleDetailSimple";
import PangalanesPage from "./pages/PangalanesPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import ProgrammeSolidairePage from "./pages/ProgrammeSolidairePage";
import ObjectifsAssociationPage from "./pages/ObjectifsAssociationPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Reservation from "./pages/Reservation";
import PageGuide from "./pages/guide/PageGuide";
import PageGuideProfile from "./pages/guide/PageGuideProfile";
import PangalanesDetailPage from "./pages/pangalanes/PangalanesDetail";
import ProgrammeSolidaireDetail from "./pages/ProgrammeSolidaireDetail";
import Testimonia from "./pages/Testimonia";
import { UtilisateurProvider } from "./provider/UtilisateurProvider";
import { ReservationProvider } from "./provider/ReservationProvider";
import { FaqProvider } from "./provider/FaqProvider";
import { TestimoniaProvider } from "./provider/TestimoniaProvider";
import Admin from "./Admin";
import { SurMesureProvider } from "./provider/SurMesureProvider";
import { ReservationListProvider } from "./provider/ReservationListProvider";
import { AllTestimoniaProvider } from "./provider/AllTestimoniaProvider";
import CircuitProvider from "./provider/CircuitProvider";
import { AllUserProvider } from "./provider/AllUserProvider";
import { AllPersonnelProvider } from "./provider/AllPersonnelProvider";
import { AllBlogProvider } from "./provider/AllBlogProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <UtilisateurProvider>
          <ReservationProvider>
            <FaqProvider>
              <TestimoniaProvider>
                <AllTestimoniaProvider>
                  <SurMesureProvider>
                    <ReservationListProvider>
                      <CircuitProvider>
                        <AllUserProvider>
                          <AllPersonnelProvider>
                            <AllBlogProvider>
                              <Toaster />
                              <Sonner />
                              <BrowserRouter>
                                <Routes>
                                  <Route path="/" element={<Index />} />

                                  {/* Route admin protégée - SEULEMENT pour les ADMIN */}
                                  <Route
                                    path="/admin"
                                    element={
                                      <ProtectedRoute
                                        requireAuth={true}
                                        requireRole="ADMIN"
                                      >
                                        <Admin />
                                      </ProtectedRoute>
                                    }
                                  />

                                  {/* Routes d'authentification */}
                                  <Route
                                    path="/login"
                                    element={
                                      <ProtectedRoute requireAuth={false}>
                                        <Login />
                                      </ProtectedRoute>
                                    }
                                  />
                                  <Route
                                    path="/register"
                                    element={
                                      <ProtectedRoute requireAuth={false}>
                                        <Register />
                                      </ProtectedRoute>
                                    }
                                  />

                                  {/* Routes publiques */}
                                  <Route
                                    path="/circuits"
                                    element={<Circuits />}
                                  />
                                  <Route
                                    path="/circuits/:id"
                                    element={<CircuitDetail />}
                                  />
                                  <Route
                                    path="/voyages-sur-mesure"
                                    element={<VoyagesSurMesure />}
                                  />
                                  <Route
                                    path="/sur-mesure"
                                    element={
                                      <Navigate
                                        to="/voyages-sur-mesure"
                                        replace
                                      />
                                    }
                                  />
                                  <Route
                                    path="/location-4x4"
                                    element={<Location4x4 />}
                                  />
                                  <Route
                                    path="/location-4x4/:id"
                                    element={<VehicleDetailSimple />}
                                  />
                                  <Route
                                    path="/pangalanes"
                                    element={<PangalanesPage />}
                                  />
                                  <Route
                                    path="/pangalanes/:id"
                                    element={<PangalanesDetailPage />}
                                  />
                                  <Route
                                    path="/programme-solidaire"
                                    element={<ProgrammeSolidairePage />}
                                  />
                                  <Route
                                    path="/programme-solidaire/:id"
                                    element={<ProgrammeSolidaireDetail />}
                                  />
                                  <Route
                                    path="/objectif-association"
                                    element={<ObjectifsAssociationPage />}
                                  />
                                  <Route path="/blog" element={<Blog />} />
                                  <Route
                                    path="/blog/:id"
                                    element={<BlogPost />}
                                  />
                                  <Route
                                    path="/contact"
                                    element={<Contact />}
                                  />
                                  <Route
                                    path="/reservations"
                                    element={<Reservation />}
                                  />
                                  <Route
                                    path="/guides"
                                    element={<PageGuide />}
                                  />
                                  <Route
                                    path="/guidesprofile/:id"
                                    element={<PageGuideProfile />}
                                  />
                                  <Route
                                    path="/testimonia"
                                    element={<Testimonia />}
                                  />

                                  {/* Routes protégées */}
                                  <Route
                                    path="/profile"
                                    element={
                                      <ProtectedRoute>
                                        <Profile />
                                      </ProtectedRoute>
                                    }
                                  />

                                  <Route path="*" element={<NotFound />} />
                                </Routes>
                              </BrowserRouter>
                            </AllBlogProvider>
                          </AllPersonnelProvider>
                        </AllUserProvider>
                      </CircuitProvider>
                    </ReservationListProvider>
                  </SurMesureProvider>
                </AllTestimoniaProvider>
              </TestimoniaProvider>
            </FaqProvider>
          </ReservationProvider>
        </UtilisateurProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
