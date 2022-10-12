import {FaClipboardList,FaRegListAlt,FaUserAlt} from 'react-icons/fa';
import {GrGroup,GrView} from 'react-icons/gr';
import {RiLockPasswordLine,RiFileList2Line} from 'react-icons/ri'
import {AiOutlineEdit,AiFillDelete,AiOutlineSearch,AiOutlineQrcode,AiOutlineUser,AiOutlinePoweroff,AiOutlinePlus,AiOutlineLeft,AiOutlineRight} from 'react-icons/ai'
import {MdRefresh,MdPending,MdDone} from 'react-icons/md'
import {GoLinkExternal} from 'react-icons/go';
import {TbHome} from 'react-icons/tb';
import {HiOutlineUserGroup,HiUpload} from 'react-icons/hi';
import {FiLogOut} from 'react-icons/fi';
import {ImQrcode} from 'react-icons/im';

// admin 
export const productList=<FaClipboardList/>;
export const group=<HiOutlineUserGroup/>;
export const change_pass=<RiLockPasswordLine/>;
export const store_list=<FaRegListAlt/>;
export const store_lists=<FaRegListAlt/>;

export const edit=<AiOutlineEdit/>
export const delet=<AiFillDelete color='white'/>
export const refresh = <MdRefresh/>
export const store_name=<TbHome/>

export const product=<RiFileList2Line/>
export const search=<AiOutlineSearch/>
export const search_icon=<AiOutlineSearch/>
export const link=<GoLinkExternal/>
export const user = <AiOutlineUser/>
export const suspend=<AiOutlinePoweroff color='white' size={20}/>
export const add =<AiOutlinePlus/>
export const add_plus =<AiOutlinePlus color='white' size={25}/>

export const left=<AiOutlineLeft size={26}/>
export const right=<AiOutlineRight/>

// manager 
export const pending =<MdPending/>
export const enable=<MdDone color='white' size={20}/>

// upload

export const upload=<HiUpload color='white' size={20}/>

// view
export const viewing=<GrView color='green' size={20}/>

// staffs
export const users=<FaUserAlt color='green' size={18} />

// stores
export const stores_icon=<TbHome color='green' size={16} />

// logout
export const logout =<FiLogOut color='white'/>

// code 
export const code = <ImQrcode color="white" />

// qr code
export const qrcode=<AiOutlineQrcode color="white" />