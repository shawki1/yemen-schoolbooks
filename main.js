// بيانات المستويات الدراسية (مؤقتة - سنربطها بقاعدة بيانات لاحقاً)
const gradesData = [
    {
        id: 1,
        name: "الصف الأول الأساسي",
        description: "جميع كتب الصف الاول",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#4CAF50"
    },
    {
        id: 2,
        name: "الصف الثاني الأساسي",
        description: "جميع كتب الصف الثاني",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#2196F3"
    },
    {
        id: 3,
        name: "الصف الثالث الأساسي",
        description: "جميع كتب الصف الثالث",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#FF9800"
    },
    {
        id: 4,
        name: "الصف الرابع الأساسي",
        description: "جميع كتب الصف الرابع",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#9C27B0"
    },
    {
        id: 5,
        name: "الصف الخامس الأساسي",
        description: "جميع كتب الصف الخامس",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#F44336"
    },
    {
        id: 6,
        name: "الصف السادس الأساسي",
        description: "جميع كتب الصف السادس",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#607D8B"
    },
     {
        id: 7,
        name: "الصف السابع الأساسي",
        description: "جميع كتب الصف السابع",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#9C27B0"
    },
     {
        id: 8,
        name: "الصف الثامن الأساسي",
        description: "جميع كتب الصف الثامن",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#9C27B0"
    },
     {
        id: 9,
        name: "الصف التاسع الأساسي",
        description: "جميع كتب الصف التاسع",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#9C27B0"
    },
     {
        id: 10,
        name: "الصف الأول الثانوي ",
        description:"جميع كتب الصف الاول الثانوي",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#9C27B0"
    },
     {
        id: 11,
        name: "الصف الثاني الثانوي ",
        description:"جميع كتب الصف الثاني الثانوي",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#9C27B0"
    },
     {
        id: 12,
        name: " الصف الثالث الثانوي ",
        description: "جميع كتب الصف الثالث الثانوي",
        image: "images/٢٠٢٥١١٢٣_١٨٣١٢٨.jpg",
        color: "#9C27B0"
    }
     

];

// فئة إدارة المنصة التعليمية
class EducationPlatform {
    constructor() {
        this.grades = gradesData;
        this.init();
    }
    
    // تهيئة التطبيق
    init() {
        this.displayGrades();
        this.setupEventListeners();
        console.log('✅ المنصة التعليمية جاهزة!');
    }
    
    // عرض المستويات الدراسية
    displayGrades() {
        const grid = document.getElementById('gradesGrid');
        
        if (!grid) {
            console.error('❌ لم يتم العثور على عنصر gradesGrid');
            return;
        }
        
        grid.innerHTML = this.grades.map(grade => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card grade-card h-100" onclick="platform.selectGrade(${grade.id})">
                    <img src="${grade.image}" class="card-img-top" alt="${grade.name}" 
                         onerror="this.src='images/default-grade.jpg'">
                    <div class="card-body">
                        <h5 class="card-title">${grade.name}</h5>
                        <p class="card-text">${grade.description}</p>
                        <div class="d-grid">
                            <button class="btn btn-primary">استعرض المواد</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // اختيار مستوى دراسي
    selectGrade(gradeId) {
        const selectedGrade = this.grades.find(grade => grade.id === gradeId);
        if (selectedGrade) {
            alert(`🔄 جاري تحميل مواد ${selectedGrade.name}`);
            // نقوم بتوجيه المستخدم لصفحة المواد
            this.navigateToGradesPage(gradeId);
        }
    }
    
    // إعداد مستمعي الأحداث
    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }
        
        // إضافة مستمعي الأحداث لأزرار التنقل إذا وجدت
        const gradesBtn = document.getElementById('gradesBtn');
        const videosBtn = document.getElementById('videosBtn');
        
        if (gradesBtn) {
            gradesBtn.addEventListener('click', () => this.navigateToGradesPage());
        }
        
        if (videosBtn) {
            videosBtn.addEventListener('click', () => this.navigateToVideosPage());
        }
    }
    
    // معالجة البحث
    handleSearch(event) {
        const query = event.target.value.toLowerCase();
        if (query.length > 2) {
            this.searchContent(query);
        }
    }
    
    // محاكاة البحث (سنطوره لاحقاً)
    searchContent(query) {
        console.log(`🔍 البحث عن: ${query}`);
        // سنربط هذا بوظيفة البحث الحقيقية لاحقاً
    }
    
    // التنقل لصفحة المواد الدراسية
    navigateToGradesPage(gradeId = null) {
        if (gradeId) {
            window.location.href = `pages/grades.html?grade=${gradeId}`;
        } else {
            window.location.href = 'pages/grades.html';
        }
    }
    
    // التنقل لصفحة الفيديوهات
    navigateToVideosPage() {
        window.location.href = 'pages/videos.html';
    }
    
    // التنقل للصفحة الرئيسية
    navigateToHome() {
        window.location.href = 'index.html';
    }
}

// إنشاء نسخة من المنصة عند تحميل الصفحة
let platform;
document.addEventListener('DOMContentLoaded', () => {
    platform = new EducationPlatform();
});

// وظائف مساعدة عامة
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
    
}

// وظائف للاستخدام العام في الصفحات
window.EducationPlatform = EducationPlatform;
