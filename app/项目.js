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

            // 如果点击的是加入项目，则生成加入项目卡片
            if (targetSection === 'join-project') {
                generateProjectCards('join-project');
            }
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
            <div class="project-actions">
                <button onclick="editProject('${project.id}')">修改</button>
                <button onclick="deleteProject('${project.id}')">删除</button>
            </div>
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
            <div class="project-actions">
                
                <button onclick="leaveProject('${project.id}')">退出</button>
            </div>
        `;
        joinedProjectsContainer.appendChild(card);
    });
}

function deleteProject(projectId) {
    let createdProjects = JSON.parse(localStorage.getItem('createdProjects')) || [];
    createdProjects = createdProjects.filter(project => project.id.toString() !== projectId.toString());
    localStorage.setItem('createdProjects', JSON.stringify(createdProjects)); // 更新 localStorage
    updateProjectManagement(); // 更新页面显示
}


// 动态生成项目卡片
function generateProjectCards(sectionId) {
    if (sectionId === 'join-project') {
        const container = document.querySelector('#join-project .cards-container');
        container.innerHTML = ''; // 清空现有项目卡片

        const projects = [
            {
                title: '创新工坊',
                creator: '李刚',
                description: '创新实验室和创业孵化器。',
                id: '创新工坊'
            },
            {
                title: '时空穿梭',
                creator: '胡与',
                description: '一个历史研究和考古项目。',
                id: '时空穿梭'
            },
            {
                title: '代码编织者',
                creator: '陈六',
                description: '一个编程教育平台，提供...',
                id: '代码编织者'
            },
            {
                title: '智能匹配项目',
                creator: '待定',
                description: '智能匹配项目。',
                id: '智能匹配项目'
            }
        ];

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>创建人：${project.creator}</p>
                <p>${project.description}</p>
                <button onclick="applyJoinProject('${project.id}')">申请加入</button>
            `;
            container.appendChild(card);
        });
    } else if (sectionId === 'project-management') {
        const joinedProjectsContainer = document.querySelector('#project-management .joined-projects');
        const createdProjectsContainer = document.querySelector('#project-management .created-projects');

        const joinedProjects  = [
            {
                name: '我加入的项目1',
                description: '我加入的项目1的描述',
                startDate: '2024-01-03',
                id:'joined-proj-1'
            },
            {
                name: '我加入的项目2',
                description: '我加入的项目2的描述',
                startDate: '2024-01-04',
                id: 'joined-proj-2'
            }
            ];

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

createProjectCards(joinedProjects, joinedProjectsContainer);
createProjectCards(JSON.parse(localStorage.getItem('createdProjects')) || [], createdProjectsContainer);
}
}

// 定义申请加入项目函数
// 函数applyJoinProject用于申请加入项目
// 定义申请加入项目函数
function applyJoinProject(projectId) {
    const projects = [
        { id: '创新工坊', name: '创新工坊', startDate: '2024-01-01', recruitPeople: 5, direction: '科研', tags: '科技', description: '创新实验室和创业孵化器。' },
        { id: '时空穿梭', name: '时空穿梭', startDate: '2024-01-02', recruitPeople: 3, direction: '历史', tags: '研究', description: '一个历史研究和考古项目。' },
        { id: '代码编织者', name: '代码编织者', startDate: '2024-01-03', recruitPeople: 10, direction: '教育', tags: '编程', description: '一个编程教育平台，提供... ' },
        { id: '智能匹配项目', name: '智能匹配项目', startDate: '2024-01-04', recruitPeople: 2, direction: '科技', tags: '智能', description: '智能匹配项目。' }
    ];

    const project = projects.find(p => p.id === projectId);
    if (project) {
        // 弹出确认框
        const confirmed = confirm('确认申请加入项目：' + project.name + ' 吗？');
        if (confirmed) {
            let joinedProjects = JSON.parse(localStorage.getItem('joinedProjects')) || [];
            joinedProjects.push(project); // 添加到已加入项目
            localStorage.setItem('joinedProjects', JSON.stringify(joinedProjects)); // 更新 localStorage
            
            updateProjectManagement(); // 更新项目管理显示
            
            // 找到对应的按钮并修改文本
            const button = document.querySelector(`button[onclick="applyJoinProject('${projectId}')"]`);
            if (button) {
                button.innerText = '已加入';
                button.setAttribute('disabled', 'true'); // 禁用按钮
            }

            alert('申请加入项目成功：' + projectId);
        }
    } else {
        alert('项目未找到：' + projectId);
    }
}


// 定义退出项目函数
function leaveProject(projectId) {
    let joinedProjects = JSON.parse(localStorage.getItem('joinedProjects')) || [];
    joinedProjects = joinedProjects.filter(project => project.id.toString() !== projectId.toString());
    localStorage.setItem('joinedProjects', JSON.stringify(joinedProjects)); // 更新 localStorage
    updateProjectManagement(); // 更新页面显示
}

// 定义修改项目函数
function editProject(projectId) {
    const createdProjects = JSON.parse(localStorage.getItem('createdProjects')) || [];
    const projectToEdit = createdProjects.find(project => project.id.toString() === projectId.toString());

    if (projectToEdit) {
        // 填充表单
        deleteProject(projectId); // 调用删除函数
        document.getElementById('project-name').value = projectToEdit.name;
        document.getElementById('start-date').value = projectToEdit.startDate;
        document.getElementById('recruit-people').value = projectToEdit.recruitPeople;
        document.getElementById('project-direction').value = projectToEdit.direction;
        document.getElementById('add-tags').value = projectToEdit.tags;
        document.getElementById('project-description').value = projectToEdit.description;

        // 显示表单
        document.getElementById('create-project').style.display = 'block';

        // 隐藏创建按钮，显示更新按钮
        const submitButton = document.getElementById('create-project-button');
        submitButton.style.display = 'none';
        const updateButton = document.getElementById('update-project-button');
        updateButton.style.display = 'block';

        // 绑定更新按钮事件
        updateButton.onclick = function() {
            const updatedProject = {
                name: document.getElementById('project-name').value,
                startDate: document.getElementById('start-date').value,
                recruitPeople: document.getElementById('recruit-people').value,
                direction: document.getElementById('project-direction').value,
                tags: document.getElementById('add-tags').value,
                description: document.getElementById('project-description').value,
                id: projectId
            };

            // 更新项目数据
            const updatedProjects = createdProjects.filter(project => project.id.toString() !== projectId.toString());
            updatedProjects.push(updatedProject);
            localStorage.setItem('createdProjects', JSON.stringify(updatedProjects));

            // 更新页面显示
            updateProjectManagement();
            document.getElementById('create-project').style.display = 'none';
        };

        // 删除项目卡片
        
    } else {
        alert('项目未找到：' + projectId);
    }
}
