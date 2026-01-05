import { Bell, Lock, Eye, Volume2, Moon, Save } from "lucide-react";
import { useState } from "react";

interface SettingsState {
  notifications: boolean;
  emailAlerts: boolean;
  soundAlerts: boolean;
  darkMode: boolean;
  twoFactor: boolean;
  autoTrade: boolean;
  riskLevel: string;
  language: string;
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    emailAlerts: true,
    soundAlerts: true,
    darkMode: true,
    twoFactor: false,
    autoTrade: false,
    riskLevel: "medium",
    language: "ar",
  });

  const handleToggle = (key: keyof SettingsState) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (key: keyof SettingsState, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          الإعدادات
        </h1>
        <p className="text-muted-foreground mb-8">إدارة تفضيلات حسابك والإشعارات</p>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="cyber-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell size={24} className="text-cyan-400" />
              <h2 className="text-xl font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                الإشعارات
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded bg-card/50 border border-border">
                <div>
                  <p className="font-bold text-foreground">تفعيل الإشعارات</p>
                  <p className="text-xs text-muted-foreground">استقبل إشعارات الإشارات والتنبيهات</p>
                </div>
                <button
                  onClick={() => handleToggle("notifications")}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.notifications ? "bg-lime-400" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-background transition-transform ${
                      settings.notifications ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded bg-card/50 border border-border">
                <div>
                  <p className="font-bold text-foreground">تنبيهات البريد الإلكتروني</p>
                  <p className="text-xs text-muted-foreground">استقبل تنبيهات عبر البريد الإلكتروني</p>
                </div>
                <button
                  onClick={() => handleToggle("emailAlerts")}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.emailAlerts ? "bg-lime-400" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-background transition-transform ${
                      settings.emailAlerts ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded bg-card/50 border border-border">
                <div>
                  <p className="font-bold text-foreground">تنبيهات صوتية</p>
                  <p className="text-xs text-muted-foreground">تشغيل أصوات التنبيهات</p>
                </div>
                <button
                  onClick={() => handleToggle("soundAlerts")}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.soundAlerts ? "bg-lime-400" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-background transition-transform ${
                      settings.soundAlerts ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="cyber-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock size={24} className="text-purple-400" />
              <h2 className="text-xl font-bold text-purple-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                الأمان
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded bg-card/50 border border-border">
                <div>
                  <p className="font-bold text-foreground">المصادقة الثنائية</p>
                  <p className="text-xs text-muted-foreground">تفعيل التحقق بخطوتين</p>
                </div>
                <button
                  onClick={() => handleToggle("twoFactor")}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.twoFactor ? "bg-lime-400" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-background transition-transform ${
                      settings.twoFactor ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <button className="w-full p-4 rounded bg-card/50 border border-border hover:border-cyan-400 transition-colors text-left font-bold text-cyan-400">
                تغيير كلمة المرور
              </button>
            </div>
          </div>

          {/* Trading */}
          <div className="cyber-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Eye size={24} className="text-lime-400" />
              <h2 className="text-xl font-bold text-lime-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                التداول
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded bg-card/50 border border-border">
                <div>
                  <p className="font-bold text-foreground">التداول التلقائي</p>
                  <p className="text-xs text-muted-foreground">السماح بتنفيذ الصفقات تلقائياً</p>
                </div>
                <button
                  onClick={() => handleToggle("autoTrade")}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.autoTrade ? "bg-lime-400" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-background transition-transform ${
                      settings.autoTrade ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 rounded bg-card/50 border border-border">
                <label className="block mb-3">
                  <p className="font-bold text-foreground mb-2">مستوى المخاطرة</p>
                  <select
                    value={settings.riskLevel}
                    onChange={(e) => handleChange("riskLevel", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-background border border-border text-foreground focus:outline-none focus:border-cyan-400"
                  >
                    <option value="low">منخفض</option>
                    <option value="medium">متوسط</option>
                    <option value="high">مرتفع</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="cyber-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Volume2 size={24} className="text-yellow-400" />
              <h2 className="text-xl font-bold text-yellow-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                التفضيلات
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded bg-card/50 border border-border">
                <div>
                  <p className="font-bold text-foreground">الوضع الليلي</p>
                  <p className="text-xs text-muted-foreground">تفعيل الوضع الليلي دائماً</p>
                </div>
                <button
                  onClick={() => handleToggle("darkMode")}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.darkMode ? "bg-lime-400" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-background transition-transform ${
                      settings.darkMode ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 rounded bg-card/50 border border-border">
                <label className="block">
                  <p className="font-bold text-foreground mb-2">اللغة</p>
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange("language", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-background border border-border text-foreground focus:outline-none focus:border-cyan-400"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full cyber-button flex items-center justify-center gap-2 py-3">
            <Save size={20} />
            حفظ الإعدادات
          </button>
        </div>

        {/* Account Info */}
        <div className="mt-8 cyber-card p-6 border-cyan-400/30 bg-cyan-400/5">
          <h3 className="font-bold text-cyan-400 mb-4">معلومات الحساب</h3>
          <div className="space-y-2 text-sm text-foreground">
            <p>البريد الإلكتروني: user@example.com</p>
            <p>معرف المستخدم: USER_12345</p>
            <p>تاريخ الانضمام: 2024-01-01</p>
            <p>آخر تحديث: 2024-01-05</p>
          </div>
        </div>
      </div>
    </div>
  );
}
