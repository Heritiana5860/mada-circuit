import { Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactInfoDetail = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="pt-4 border-t">
        <h4 className="font-semibold mb-3">{t("common.need", "Need help?")}</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            +33 7 44 89 44 08 | +261 34 52 981 05
          </div>
          <div className="flex items-center text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            info@madagascar-voyagesolidaire.com
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfoDetail;
