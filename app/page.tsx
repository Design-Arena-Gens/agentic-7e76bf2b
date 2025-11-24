'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Send, Trash2, Plus, Settings, Instagram } from 'lucide-react';

interface AutoReply {
  id: string;
  trigger: string;
  response: string;
  enabled: boolean;
}

export default function Home() {
  const [replies, setReplies] = useState<AutoReply[]>([]);
  const [newTrigger, setNewTrigger] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [botEnabled, setBotEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('autoReplies');
    if (saved) {
      setReplies(JSON.parse(saved));
    } else {
      const defaultReplies: AutoReply[] = [
        { id: '1', trigger: 'السلام عليكم', response: 'وعليكم السلام! كيف يمكنني مساعدتك؟', enabled: true },
        { id: '2', trigger: 'مرحبا', response: 'مرحباً بك! أهلاً وسهلاً 😊', enabled: true },
        { id: '3', trigger: 'السعر', response: 'يرجى التواصل مع الإدارة للحصول على قائمة الأسعار الكاملة', enabled: true },
      ];
      setReplies(defaultReplies);
    }

    const botStatus = localStorage.getItem('botEnabled');
    if (botStatus !== null) {
      setBotEnabled(JSON.parse(botStatus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('autoReplies', JSON.stringify(replies));
  }, [replies]);

  useEffect(() => {
    localStorage.setItem('botEnabled', JSON.stringify(botEnabled));
  }, [botEnabled]);

  const addReply = () => {
    if (newTrigger.trim() && newResponse.trim()) {
      const newReply: AutoReply = {
        id: Date.now().toString(),
        trigger: newTrigger.trim(),
        response: newResponse.trim(),
        enabled: true,
      };
      setReplies([...replies, newReply]);
      setNewTrigger('');
      setNewResponse('');
    }
  };

  const deleteReply = (id: string) => {
    setReplies(replies.filter(r => r.id !== id));
  };

  const toggleReply = (id: string) => {
    setReplies(replies.map(r =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-12 h-12 text-pink-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              بوت الرد الآلي على انستغرام
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            قم بإنشاء ردود تلقائية لرسائلك على انستغرام
          </p>
        </div>

        {/* Bot Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-gray-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">حالة البوت</h2>
                <p className="text-sm text-gray-500">
                  {botEnabled ? 'البوت يعمل الآن' : 'البوت متوقف'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setBotEnabled(!botEnabled)}
              className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors ${
                botEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-10 w-10 transform rounded-full bg-white shadow-lg transition-transform ${
                  botEnabled ? 'translate-x-1' : 'translate-x-12'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Add New Reply */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Plus className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">إضافة رد جديد</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الكلمة المفتاحية (التي ستطلق الرد)
              </label>
              <input
                type="text"
                value={newTrigger}
                onChange={(e) => setNewTrigger(e.target.value)}
                placeholder="مثال: مرحبا، السلام عليكم، السعر..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الرد التلقائي
              </label>
              <textarea
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                placeholder="اكتب الرد الذي سيتم إرساله تلقائياً..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none"
              />
            </div>

            <button
              onClick={addReply}
              disabled={!newTrigger.trim() || !newResponse.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              إضافة الرد
            </button>
          </div>
        </div>

        {/* Replies List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-pink-600" />
            <h2 className="text-xl font-bold text-gray-800">الردود التلقائية المحفوظة</h2>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
              {replies.length}
            </span>
          </div>

          {replies.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">لا توجد ردود محفوظة بعد</p>
              <p className="text-gray-400 text-sm mt-2">قم بإضافة أول رد تلقائي من الأعلى</p>
            </div>
          ) : (
            <div className="space-y-4">
              {replies.map((reply) => (
                <div
                  key={reply.id}
                  className={`border-2 rounded-xl p-5 transition-all ${
                    reply.enabled
                      ? 'border-purple-200 bg-purple-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-gray-500 mb-1">
                          الكلمة المفتاحية:
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 font-medium text-gray-800">
                          {reply.trigger}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-gray-500 mb-1">
                          الرد التلقائي:
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-gray-700">
                          {reply.response}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => toggleReply(reply.id)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                          reply.enabled
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        }`}
                      >
                        {reply.enabled ? 'مفعل' : 'معطل'}
                      </button>

                      <button
                        onClick={() => deleteReply(reply.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                        title="حذف"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
          <h3 className="font-bold text-blue-900 mb-3 text-lg">ℹ️ معلومات مهمة:</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="font-bold mt-1">•</span>
              <span>هذا التطبيق يعمل كلوحة تحكم لإدارة الردود التلقائية</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold mt-1">•</span>
              <span>جميع البيانات محفوظة محلياً في متصفحك</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold mt-1">•</span>
              <span>للربط الفعلي مع انستغرام، يتطلب استخدام Instagram Graph API</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold mt-1">•</span>
              <span>يمكنك إضافة وحذف وتعديل الردود في أي وقت</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>تم إنشاؤه بواسطة Claude Code | جميع الحقوق محفوظة © 2025</p>
        </div>
      </div>
    </div>
  );
}
