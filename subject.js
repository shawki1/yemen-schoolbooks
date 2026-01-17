// فئة إدارة صفحة المادة التفصيلية
class SubjectManager {
    constructor() {
        this.currentGrade = this.getGradeFromURL();
        this.currentSubjectId = this.getSubjectIdFromURL();
        this.currentSubjectName = this.getSubjectNameFromURL();
        this.init();
    }
    
    // الحصول على المستوى من الرابط
    getGradeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('grade')) || 1;
    }
    
    // الحصول على معرف المادة من الرابط
    getSubjectIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('subject')) || 101;
    }
    
    // الحصول على اسم المادة من الرابط
    getSubjectNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return decodeURIComponent(urlParams.get('name')) || 'المادة الدراسية';
    }
    
    // تهيئة الصفحة
    init() {
        this.displaySubjectInfo();
        this.setupEventListeners();
        this.loadSubjectContent();
        console.log('✅ صفحة المادة جاهزة!', {
            grade: this.currentGrade,
            subjectId: this.currentSubjectId,
            subjectName: this.currentSubjectName
        });
    }
    
    // عرض معلومات المادة
    displaySubjectInfo() {
        const subjectTitle = document.getElementById('subjectTitle');
        const subjectDescription = document.getElementById('subjectDescription');
        const subjectBreadcrumb = document.getElementById('subjectBreadcrumb');
        
        subjectTitle.textContent = this.currentSubjectName;
        subjectBreadcrumb.textContent = this.currentSubjectName;
        
        // الحصول على وصف المادة من البيانات
        const subject = this.getSubjectDetails();
        if (subject) {
            subjectDescription.textContent = subject.description;
        }
    }
    
    // الحصول على تفاصيل المادة
    getSubjectDetails() {
        const subjects = subjectsData[this.currentGrade] || [];
        return subjects.find(subject => subject.id === this.currentSubjectId);
    }
    
    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // مستمعي الأحداث لأزرار التشغيل
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-primary') && e.target.closest('.lesson-item')) {
                this.playLesson(e.target.closest('.lesson-item'));
            }
            
            if (e.target.closest('.btn') && e.target.textContent.includes('بدء الاختبار')) {
                this.startExam();
            }
            
            if (e.target.closest('.btn') && e.target.textContent.includes('تحميل')) {
                this.downloadResource(e.target.closest('.resource-card'));
            }
        });
    }
    
    // تحميل محتوى المادة
    loadSubjectContent() {
        // محاكاة تحميل المحتوى من الخادم
        console.log('جاري تحميل محتوى المادة...');
        
        // في التطبيق الحقيقي، سنقوم بجلب البيانات من الخادم
        // هذا مجرد محاكاة
        setTimeout(() => {
            this.updateProgress();
        }, 1000);
    }
    
    // تشغيل الدرس
    playLesson(lessonElement) {
        const lessonTitle = lessonElement.querySelector('h6').textContent;
        alert(`🎬 تشغيل الدرس: ${lessonTitle}`);
        
        // في التطبيق الحقيقي، سنفتح مشغل الفيديو
        // window.location.href = `video-player.html?lesson=${lessonId}`;
        
        // تحديث حالة الدرس إلى مكتمل
        const icon = lessonElement.querySelector('.lesson-icon');
        icon.innerHTML = '<i class="fas fa-check"></i>';
        icon.classList.remove('text-primary');
        icon.classList.add('text-success');
        
        const button = lessonElement.querySelector('.btn');
        button.innerHTML = '<i class="fas fa-check me-1"></i> مكتمل';
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        button.disabled = true;
        
        this.updateProgress();
    }
    
    // بدء الاختبار
    startExam() {
        alert(`📝 بدء اختبار مادة ${this.currentSubjectName}`);
        // window.location.href = `exam.html?subject=${this.currentSubjectId}`;
    }
    
    // تحميل المورد
    downloadResource(resourceCard) {
        const resourceName = resourceCard.querySelector('h5').textContent;
        alert(`📥 جاري تحميل: ${resourceName}`);
        
        // محاكاة التحميل
        const button = resourceCard.querySelector('.btn');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> جاري التحميل';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check me-1"></i> تم التحميل';
            button.classList.remove('btn-primary', 'btn-outline-primary');
            button.classList.add('btn-success');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.classList.remove('btn-success');
                button.classList.add('btn-primary');
            }, 2000);
        }, 1500);
    }
    
    // تحديث التقدم
    updateProgress() {
        // محاكاة حساب التقدم
        const progress = Math.floor(Math.random() * 100);
        const progressElement = document.querySelector('.progress-text-small');
        if (progressElement) {
            progressElement.textContent = `${progress}%`;
        }
        
        // تحديث شريط التقدم في الحلقات
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            if (!bar.style.width || bar.style.width === '0%') {
                const randomProgress = Math.floor(Math.random() * 100);
                bar.style.width = `${randomProgress}%`;
                bar.textContent = `${randomProgress}% مكتمل`;
            }
        });
    }
}

// إضافة CSS إضافي لصفحة المادة
const subjectCSS = `
.progress-ring-small {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: conic-gradient(#2563eb 40%, #f1f1f1 0);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 auto;
}

.progress-ring-small::before {
    content: '';
    width: 60px;
    height: 60px;
    background: white;
    border-radius: 50%;
    position: absolute;
}

.progress-text-small {
    position: relative;
    z-index: 1;
    font-weight: bold;
    color: #2563eb;
}

.subject-progress {
    text-align: center;
}

.breadcrumb {
    background: none;
    padding: 0;
}

.breadcrumb-item a {
    color: rgba(255, 255, 255, 0.8) !important;
    text-decoration: none;
}

.breadcrumb-item a:hover {
    color: white !important;
}

.breadcrumb-item.active {
    color: white;
}
`;

// إضافة الـ CSS للصفحة
const styleSheet = document.createElement('style');
styleSheet.textContent = subjectCSS;
document.head.appendChild(styleSheet);

// تشغيل مدير المادة عند تحميل الصفحة
let subjectManager;
document.addEventListener('DOMContentLoaded', () => {
    subjectManager = new SubjectManager();
});