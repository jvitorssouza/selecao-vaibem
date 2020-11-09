import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';

import { BiChevronDown } from 'react-icons/bi';

import useUser from '~/util/Hooks/UseUser';

import { MenuConfig, MenuInterface } from '~/configs/MenuConfig';

import {
    SystemNav,
    UserMenu,
    NavigationMenu,
    NavigationMenuItem,
} from './styles';

import LogoWhite from '~/assets/images/logo-white.svg';
import UserDefault from '~/assets/images/user-default.svg';

import { InitialUser } from '~/util/Contexts/Authentication';

const HeaderDesktop: React.FC = () => {
    const { user, setUser } = useUser();

    return (
        <>
            <SystemNav>
                <div className="logo">
                    <img src={LogoWhite} alt="" className="logo" />
                </div>

                <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                        <UserMenu id="user-popover">
                            <div className="user-info">
                                <img src={UserDefault} alt="" />

                                <div className="user-name-function">
                                    <span className="name"> {user.name} </span>
                                    <span className="function">
                                        {user.profile.name}
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <div className="buttons">
                                <button className="profile">Perfil</button>
                                <button
                                    className="logout"
                                    onClick={() => setUser(InitialUser)}
                                >
                                    Sair
                                </button>
                            </div>
                        </UserMenu>
                    }
                >
                    <span>
                        <img src={UserDefault} alt="" />
                        <span className="user__name">
                            Olá, <strong>{user.name.split(' ')[0]}</strong>
                        </span>
                        <BiChevronDown />
                    </span>
                </OverlayTrigger>
            </SystemNav>

            <NavigationMenu>
                {MenuConfig.map(
                    (item: MenuInterface, index: number) =>
                        user.permissions.includes(item.slug) && (
                            <NavigationMenuItem
                                itemActive={window.location.href.includes(
                                    item.page
                                )}
                                key={index}
                                to={item.page}
                            >
                                <item.icon /> {item.title}
                            </NavigationMenuItem>
                        )
                )}
            </NavigationMenu>
        </>
    );
};

export default HeaderDesktop;
