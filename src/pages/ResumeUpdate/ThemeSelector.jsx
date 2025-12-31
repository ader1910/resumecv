import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DUMMY_RESUME_DATA,
  resumeTemplates,
  themeColorPalette,
} from "../../utils/data";
import { CircleCheckBig } from "lucide-react";
import Tabs from "../../components/Tabs";
import TemplateCard from "../../components/Cards/TemplateCard";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import paymentService from "../../services/paymentService";

const TAB_DATA = [{ label: "Templates" }, { label: "Color Palettes" }];

const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) => {
  const { user, refreshUser } = useContext(UserContext);
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [templateRestrictions, setTemplateRestrictions] = useState({
    availableTemplates: [],
    allTemplates: [],
    subscriptionPlan: "basic",
    isPremium: false,
  });

  const [tabValue, setTabValue] = useState("Templates");
  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette,
    index: -1,
  });
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  // Fetch template restrictions
  useEffect(() => {
    const fetchTemplateRestrictions = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.TEMPLATES);
        setTemplateRestrictions(response.data);
      } catch (error) {
        console.error("Error fetching template restrictions:", error);
        toast.error("Failed to load template restrictions");
      }
    };

    if (user) {
      fetchTemplateRestrictions();
    }
  }, [user]);

  // Handle Theme Change
  const handleThemeSelection = () => {
    setSelectedTheme({
      colorPalette: selectedColorPalette?.colors,
      theme: selectedTemplate?.theme,
    });
    onClose();
  };

  // Handle locked template click
  const handleLockedTemplateClick = () => {
    toast("Upgrade to Premium to access all templates!", {
      icon: "🔒",
      style: {
        borderRadius: "10px",
        background: "#f97316",
        color: "#fff",
      },
    });
  };

  // Check if template is locked
  const isTemplateLocked = (templateId) => {
    // Template '01' is always available for basic users
    if (templateId === "01") {
      return false;
    }
    // Templates '02' and '03' are locked for basic users
    return !templateRestrictions.availableTemplates.includes(templateId);
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  // Handle upgrade to premium
  const handleUpgradeToPremium = async () => {
    try {
      toast.loading("Creating order...", { id: "payment" });

      // Create order
      const orderData = await paymentService.createOrder("premium");

      toast.loading("Opening payment gateway...", { id: "payment" });

      // Initiate payment
      const paymentResult = await paymentService.initiatePayment(
        orderData,
        user
      );

      toast.success("Payment successful! Welcome to Premium!", {
        id: "payment",
      });

      // Refresh user profile to update subscription plan
      await refreshUser();

      // Refresh template restrictions
      const response = await axiosInstance.get(API_PATHS.AUTH.TEMPLATES);
      setTemplateRestrictions(response.data);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.", {
        id: "payment",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Tabs
            tabs={TAB_DATA}
            activeTab={tabValue}
            setActiveTab={setTabValue}
          />
          {!templateRestrictions.isPremium && (
            <div className="flex items-center gap-2 ml-2">
              <div className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Basic
              </div>
              <button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg shadow-purple-900/20"
                onClick={handleUpgradeToPremium}
              >
                Upgrade to Premium
              </button>
            </div>
          )}
          {templateRestrictions.isPremium && (
            <div className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ml-2">
              Premium Plan
            </div>
          )}
        </div>

        <button
          className="btn-primary !w-auto !py-2 !px-8 !my-0"
          onClick={() => handleThemeSelection()}
        >
          <span className="flex items-center gap-2">
            <CircleCheckBig className="w-4 h-4" />
            Done
          </span>
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5">
          <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
            {tabValue === "Templates" &&
              resumeTemplates.map((template, index) => {
                const isLocked = isTemplateLocked(template.id);
                return (
                  <TemplateCard
                    key={`templates_${index}`}
                    thumbnailImg={template.thumbnailImg}
                    isSelected={selectedTemplate?.theme === template.id && !isLocked}
                    isLocked={isLocked}
                    onSelect={() =>
                      setSelectedTemplate({ theme: template.id, index })
                    }
                    onLockedClick={handleLockedTemplateClick}
                  />
                );
              })}

            {tabValue === "Color Palettes" &&
              themeColorPalette.themeOne.map((colors, index) => (
                <ColorPalette
                  key={`palette_${index}`}
                  colors={colors}
                  isSelected={selectedColorPalette?.index === index}
                  onSelect={() => setSelectedColorPalette({ colors, index })}
                />
              ))}
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-7">
          <div 
            className="bg-slate-800/40 border border-white/5 rounded-2xl p-6 h-[70vh] overflow-hidden relative shadow-inner"
            ref={resumeRef}
          >
            <div className="absolute inset-0 overflow-auto custom-scrollbar p-6">
              <RenderResume
                templateId={selectedTemplate?.theme || ""}
                resumeData={resumeData || DUMMY_RESUME_DATA}
                containerWidth={baseWidth - 48} // Account for padding
                colorPalette={selectedColorPalette?.colors || []}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;

const ColorPalette = ({ colors, isSelected, onSelect }) => {
  return (
    <div
      className={`h-24 bg-slate-800 flex rounded-xl overflow-hidden border-2 transition-all cursor-pointer shadow-lg
        ${isSelected ? "border-purple-500 scale-[0.98]" : "border-white/5 hover:border-white/20"}`}
      onClick={onSelect}
    >
      {colors.map((color, index) => (
        <div
          key={`color_${index}`}
          className="flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};
