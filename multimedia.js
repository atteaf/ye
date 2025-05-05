// تبويبات الوسائط المتعددة
document.addEventListener('DOMContentLoaded', function() {
    // تبديل التبويبات
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // إزالة النشاط من جميع الأزرار والمحتويات
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // إضافة النشاط للعناصر المحددة
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // تأثير التكبير للصور (اختياري)
    const zoomableImages = document.querySelectorAll('.zoomable');
    zoomableImages.forEach(img => {
      img.addEventListener('click', function() {
        this.classList.toggle('zoomed');
        
        // إضافة/إزالة الطبقة الشفافة عند التكبير
        if (this.classList.contains('zoomed')) {
          document.body.style.overflow = 'hidden';
          const overlay = document.createElement('div');
          overlay.className = 'zoom-overlay';
          overlay.addEventListener('click', () => {
            this.classList.remove('zoomed');
            overlay.remove();
            document.body.style.overflow = '';
          });
          document.body.appendChild(overlay);
        } else {
          document.querySelector('.zoom-overlay')?.remove();
          document.body.style.overflow = '';
        }
      });
    });
  });

  // أضف للجافاسكريبت
document.querySelectorAll('.infographic-item').forEach(item => {
    item.addEventListener('click', function() {
      const modal = document.getElementById('infographic-modal');
      const modalImg = document.getElementById('infographic-full');
      const caption = document.getElementById('caption');
      
      modal.style.display = "block";
      modalImg.src = this.querySelector('img').src;
      caption.innerHTML = this.querySelector('h4').innerHTML;
      
      document.querySelector('.close').onclick = function() {
        modal.style.display = "none";
      }
      
      modal.onclick = function(e) {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      }
    });
  });
  // إظهار التلميح عند التحميل لمدة 5 ثواني
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.infographic-item');
    
    items.forEach(item => {
      item.classList.add('load-hint');
      
      setTimeout(() => {
        item.classList.remove('load-hint');
      }, 5000);
      
      // بقية كود التكبير...
    });
  });

  document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email-input').value;
    const message = document.getElementById('subscription-message');
    
    // محاكاة تأخير الشبكة
    setTimeout(() => {
      // التحقق البسيط من صيغة الإيميل
      if (email.includes('@') && email.includes('.')) {
        message.textContent = '🎉 تم الاشتراك بنجاح! شكراً لك';
        message.style.color = '#4CAF50';
      } else {
        message.textContent = '⚠️ الرجاء إدخال بريد إلكتروني صحيح';
        message.style.color = '#f44336';
      }
      
      message.style.display = 'block';
      
      // إخفاء الرسالة بعد 5 ثواني
      setTimeout(() => {
        message.style.display = 'none';
      }, 5000);
      
      // إفراغ الحقل بعد "الإرسال"
      e.target.reset();
    }, 800); // تأخير محاكاة للشبكة
  });

  const contactBtn = document.getElementById('contactBtn');
  const contactMenu = document.getElementById('contactMenu');
  
  contactBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // منع إغلاق القائمة مباشرة
    contactMenu.style.display = contactMenu.style.display === 'block' ? 'none' : 'block';
  });
  
  // إغلاق القائمة عند النقر خارجها
  document.addEventListener('click', function() {
    contactMenu.style.display = 'none';
  });




  // وظيفة المشاركة الرئيسية
function shareContent() {
  const currentUrl = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  
  // Web Share API (للأجهزة المحمولة)
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: 'شاهد هذا المحتوى المميز: ',
      url: window.location.href
    }).catch(err => {
      console.error('Error sharing:', err);
      showShareOptions(currentUrl, title); // عرض الخيارات البديلة
    });
  } else {
    showShareOptions(currentUrl, title); // للشاشات الكبيرة
  }
}

// عرض خيارات المشاركة البديلة
function showShareOptions(url, title) {
  // إنشاء عنصر الشريط المنبثق
  const sharePanel = document.createElement('div');
  sharePanel.className = 'share-panel';
  sharePanel.innerHTML = `
    <div class="share-options">
      <button class="share-btn facebook" onclick="shareOnFacebook('${url}')">
        <i class="fab fa-facebook-f"></i>
      </button>
      <button class="share-btn twitter" onclick="shareOnTwitter('${url}', '${title}')">
        <i class="fab fa-twitter"></i>
      </button>
      <button class="share-btn whatsapp" onclick="shareOnWhatsApp('${url}', '${title}')">
        <i class="fab fa-whatsapp"></i>
      </button>
      <button class="share-btn copy" onclick="copyLink('${url}')">
        <i class="fas fa-copy"></i>
      </button>
      <button class="share-close" onclick="closeSharePanel()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  document.body.appendChild(sharePanel);
  document.body.style.overflow = 'hidden'; // منع التمرير
}

// دوال المشاركة الفردية
function shareOnFacebook(url) {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  closeSharePanel();
}

function shareOnTwitter(url, title) {
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
  closeSharePanel();
}

function shareOnWhatsApp(url, title) {
  window.open(`https://wa.me/?text=${title} ${url}`, '_blank');
  closeSharePanel();
}

function copyLink(url) {
  navigator.clipboard.writeText(url)
    .then(() => {
      alert('تم نسخ الرابط بنجاح!');
      closeSharePanel();
    })
    .catch(() => {
      prompt('انسخ الرابط يدوياً:', url);
    });
}

function closeSharePanel() {
  const panel = document.querySelector('.share-panel');
  if (panel) {
    panel.remove();
    document.body.style.overflow = 'auto';
  }
}

// إضافة حدث النقر لأيقونة المشاركة
document.addEventListener('DOMContentLoaded', () => {
  const shareBtn = document.querySelector('.share-pin');
  if (shareBtn) {
    shareBtn.addEventListener('click', shareContent);
  }
});