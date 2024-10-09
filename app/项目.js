document.addEventListener('DOMContentLoaded', function () {
    // 页面加载时显示项目管理部分
    updateProjectManagement();
    
    // 为侧边栏链接添加点击事件监听器
    document.querySelectorAll('.sidebar ul li a').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止链接默认行为

            const targetSection = this.getAttribute('href').substring(1);
            const sections = document.querySelectorAll('.project-content > div');

            // 隐藏所有内容部分
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // 移除所有侧边栏链接的激活状态
            document.querySelectorAll('.sidebar ul li a').forEach(link => {
                link.classList.remove('active');
            });

            // 激活当前链接
            this.classList.add('active');

            // 显示对应的内容部分
            document.getElementById(targetSection).style.display = 'block';
        });
    });

    // 监听创建项目表单的提交事件
    document.getElementById('project-form').addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止默认提交

        // 获取输入数据
        const project_name = document.getElementById('project-name').value;
        const start_date = document.getElementById('start-date').value;
        const recruit_people = document.getElementById('recruit-people').value;
        const project_direction = document.getElementById('project-direction').value;
        const add_tags = document.getElementById('add-tags').value;
        const project_description = document.getElementById('project-description').value;

        // 创建项目对象
        const newProject = {
            name: project_name,
            startDate: start_date,
            recruitPeople: recruit_people,
            direction: project_direction,
            tags: add_tags,
            description: project_description,
            id: Date.now() // 使用时间戳作为项目ID
        };

        // 添加到项目数组
        let createdProjects = JSON.parse(localStorage.getItem('createdProjects')) || [];
        createdProjects.push(newProject);
        localStorage.setItem('createdProjects', JSON.stringify(createdProjects));

        // 更新页面显示
        updateProjectManagement();

        // 隐藏创建项目表单
        document.getElementById('create-project').style.display = 'none';
    });
});

// 更新项目管理界面的函数
function updateProjectManagement() {
    const createdProjectsContainer = document.getElementById('created-projects');
    const joinedProjectsContainer = document.getElementById('joined-projects');

    // 获取存储的创建项目和加入项目数据
    const createdProjects = JSON.parse(localStorage.getItem('createdProjects')) || [];
    const joinedProjects = JSON.parse(localStorage.getItem('joinedProjects')) || [];

    // 清空现有项目卡片
    createdProjectsContainer.innerHTML = '';
    joinedProjectsContainer.innerHTML = '';

    // 创建已创建项目卡片
    createdProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>开始日期: ${project.startDate}</p>
            <p>招募人数: ${project.recruitPeople}</p>
            <p>项目方向: ${project.direction}</p>
            <p>标签: ${project.tags}</p>
            <p>描述: ${project.description}</p>
        `;
        createdProjectsContainer.appendChild(card);
    });

    // 创建已加入项目卡片
    joinedProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>开始日期: ${project.startDate}</p>
            <p>招募人数: ${project.recruitPeople}</p>
            <p>项目方向: ${project.direction}</p>
            <p>标签: ${project.tags}</p>
            <p>描述: ${project.description}</p>
        `;
        joinedProjectsContainer.appendChild(card);
    });
}

// 动态生成项目卡片
function generateProjectCards(sectionId) {
    if (sectionId === 'join-project') {
        const container = document.querySelector('#join-project .cards-container');
        container.innerHTML = ''; // 清空现有项目卡片

        const projects = [
            { name: '项目1', description: '项目1的描述', startDate: '2024-01-01', id: 'proj-1' },
            { name: '项目2', description: '项目2的描述', startDate: '2024-01-02', id: 'proj-2' },
            // 更多项目数据
        ];

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <p>${project.startDate}</p>
                <button onclick="applyJoinProject('${project.id}')">申请加入</button>
            `;
            container.appendChild(card);
        });
    } else if (sectionId === 'project-management') {
        const joinedProjectsContainer = document.querySelector('#project-management .joined-projects');
        const createdProjectsContainer = document.querySelector('#project-management .created-projects');

        const joinedProjects = [
            { name: '我加入的项目1', description: '我加入的项目1的描述', startDate: '2024-01-03', id: 'joined-proj-1' },
            { name: '我加入的项目2', description: '我加入的项目2的描述', startDate: '2024-01-04', id: 'joined-proj-2' },
            // 更多项目数据
        ];

        // 创建项目卡片函数
        function createProjectCards(projects, container) {
            container.innerHTML = ''; // 清空现有项目卡片
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <p>${project.startDate}</p>
                    <div class="project-actions">
                        <button onclick="editProject('${project.id}')">修改</button>
                        <button onclick="leaveProject('${project.id}')">退出</button>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        // 创建已加入项目和已创建项目卡片
        createProjectCards(joinedProjects, joinedProjectsContainer);
        createProjectCards(JSON.parse(localStorage.getItem('createdProjects')) || [], createdProjectsContainer);
    }
}

// 定义申请加入项目函数
function applyJoinProject(projectId) {
    alert('申请加入项目：' + projectId);
    // 实现申请加入项目的逻辑
}

// 定义退出项目函数
function leaveProject(projectId) {
    alert('退出项目：' + projectId);
    // 实现退出项目的逻辑
}

// 定义修改项目函数
function editProject(projectId) {
    alert('修改项目：' + projectId);
    // 实现修改项目的逻辑
}