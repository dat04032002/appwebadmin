import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiOutlineLibrary
	
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Trang Chủ',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'products',
		label: 'Quản lý sản phẩm',
		path: '/products',
		icon: <HiOutlineCube />
	},
	{
		key: 'orders',
		label: 'Quản lý đơn hàng',
		path: '/orders',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'customers',
		label: 'Quản lý khách hàng',
		path: '/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'warehouse',
		label: 'Quản lý kho',
		path: '/warehouse',
		icon: <HiOutlineLibrary />
	},
	{
		key: 'productCategories',
		label: 'Quản lý danh mục sản phẩm',
		path: '/productCategories',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	
]
