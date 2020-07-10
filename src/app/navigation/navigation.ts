
export const navigation = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        translate: 'NAV.DASHBOARDS',
        type: 'item',
        url: '/dashboard',
    },
    {
        id: 'administration',
        title: 'Администрирование',
        translate: 'NAV.ADMIN',
        type: 'collapsable',
        icon: 'account_balance',
        children: [
            {
                id: 'organization',
                title: 'Организации',
                translate: 'NAV.ADMIN_CH.ORGANIZATIONS',
                type: 'item',
                icon: 'location_city',
                url: '/admin/organizations'
            },
            {
                id: 'user',
                title: 'Пользователи',
                translate: 'NAV.ADMIN_CH.USERS',
                type: 'item',
                icon: 'people',
                url: '/admin/users'
            },
            {
                id: 'roles',
                title: 'Роли',
                translate: 'NAV.ADMIN_CH.ROLES',
                type: 'item',
                icon: 'accessibility',
                url: '/admin/role'
            }, {
                id: 'rights',
                title: 'Права',
                translate: 'NAV.ADMIN_CH.RESOURCES',
                type: 'item',
                icon: 'lock_outline',
                url: '/admin/right'
            }, {
                id: 'resources',
                title: 'Ресурсы',
                translate: 'NAV.ADMIN_CH.RIGHTS',
                type: 'item',
                icon: 'toc',
                url: '/admin/resource'
            }, {
                id: 'projects',
                title: 'Прокты',
                translate: 'NAV.ADMIN_CH.PROJECTS',
                type: 'item',
                icon: 'assessment',
                url: '/admin/project-info'
            }
        ]
    },
    {
        id: 'bilgen',
        title: 'Bilgen',
        translate: 'NAV.BILGEN',
        type: 'group',
        icon: 'domain',
        children: [
            {
                id: 'olympiad',
                title: 'Olympiad',
                translate: 'NAV.BILGEN_CH.OLYMPIADS',
                type: 'item',
                icon: 'accessibility_new',
                url: '/bilgen/olympiad',
            },
            {
                id: 'template',
                title: 'Template',
                translate: 'NAV.BILGEN_CH.TEMPLATES',
                type: 'item',
                icon: 'ballot',
                url: '/bilgen/template',
            },
            {
                id: 'job',
                title: 'Job',
                translate: 'NAV.BILGEN_CH.TASKS',
                type: 'item',
                icon: 'business_center',
                url: '/bilgen/job',
            },
            {
                id: 'image-crop',
                title: 'ImageCrop',
                translate: 'NAV.BILGEN_CH.IMAGE_PROPERTY',
                type: 'item',
                icon: 'image_aspect_ratio',
                url: '/bilgen/image/crop',
            }
        ]
    },
    {
        id: 'serpin',
        title: 'Serpin',
        translate: 'NAV.SERPIN',
        type: 'group',
        icon: 'domain',
        children: [
            {
                id: 'university-cabinet',
                title: 'University cabinet',
                translate: 'NAV.SERPIN_CH.UNI_CABINET',
                type: 'item',
                icon: 'assignment_ind',
                url: '/serpin/university-cabinet',
            },
            {
                id: 'speciality',
                title: 'Speciality',
                translate: 'NAV.SERPIN_CH.SPECIALITY',
                type: 'item',
                icon: 'S',
                url: '/serpin/speciality',
            },
            {
                id: 'edulanguage',
                title: 'Education language',
                translate: 'NAV.SERPIN_CH.EDU_LANGAUGE',
                type: 'item',
                icon: 'language',
                url: '/serpin/edulang',
            },
            {
                id: 'universities',
                title: 'Universities',
                translate: 'NAV.SERPIN_CH.UNIVERSITIES',
                type: 'item',
                icon: 'account_balance',
                url: '/serpin/university-list',
            }
        ]
    },
];
