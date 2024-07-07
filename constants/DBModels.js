const sequelize = require("../utils/DBManager.js");
const { DataTypes } = require("sequelize");

module.exports = Object.freeze({
    contracts: sequelize.define('Contracts', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        HashName: {
            type: DataTypes.STRING(64),
            allowNull: true,
            unique: true,
        },
        IsSpecial: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        tableName: 'Contracts',
        timestamps: false
    }),
    users: sequelize.define('Users', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Username: {
            type: DataTypes.STRING(32),
            allowNull: true,
            unique: true,
        },
        DisplayName: {
            type: DataTypes.STRING(32),
            allowNull: true,
        },
        Photo: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        Password: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        PasswordResets: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        EmailResets: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        Language: {
            type: DataTypes.STRING(8),
            allowNull: true,
        },
        Banner: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        Email: {
            type: DataTypes.STRING(320),
            allowNull: true,
            unique: true,
        },
        Description: {
            type: DataTypes.STRING(5000),
            allowNull: true,
        },
        Status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            references: {
                model: 'UserStatus',
                key: 'ID',
            },
        },
        Permissions: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: 'UserPermissions',
                key: 'ID',
            },
        },
        ContractID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Contracts',
                key: 'ID',
            },
        },
        LastName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        FirstName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        BirthDate: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        UsernameCoolDown: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: 0,
        },
        DeletionDate: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
    }, {
        tableName: 'Users',
        timestamps: false,
    }),
    usersPunishments: sequelize.define('UsersPunishments', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LegalPunishment: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'ID'
            }
        },
        Ended: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        Reason: {
            type: DataTypes.STRING(350),
            allowNull: true
        },
        Duration: {
            type: DataTypes.BIGINT,
            allowNull: true
        }
    }, {
        tableName: 'UsersPunishments',
        timestamps: false
    }),
    usersFriendRequests: sequelize.define('UsersFriendRequests', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FROM: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'ID'
            }
        },
        TO: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'ID'
            }
        }
    }, {
        tableName: 'UsersFriendRequests',
        timestamps: false
    }),
    usersFriends: sequelize.define('UsersFriends', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        User: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'ID'
            }
        },
        User2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'ID'
            }
        }
    }, {
        tableName: 'UsersFriends',
        timestamps: false
    }),
    usersBlocks: sequelize.define('UsersBlocks', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FROM: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'ID'
            }
        },
        TO: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'ID'
            }
        }
    }, {
        tableName: 'UsersBlocks',
        timestamps: false
    }),
    chatsInfo: sequelize.define('ChatsInfo', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'ID'
            }
        },
        Unread: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        closed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'ChatsInfo',
        timestamps: false
    }),
    chats: sequelize.define('Chats', {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        User: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ChatsInfo',
                key: 'ID'
            }
        },
        User2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ChatsInfo',
                key: 'ID'
            }
        },
        LastMessageID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        Status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: 'ChatStatus',
                key: 'ID'
            }
        }
    }, {
        tableName: 'Chats',
        timestamps: false
    }),
    chatsPunishments: sequelize.define('ChatsPunishments', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LegalPunishment: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        Removed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        ChatID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Chats',
                key: 'ID'
            }
        },
        Reason: {
            type: DataTypes.STRING(350),
            allowNull: true
        }
    }, {
        tableName: 'ChatsPunishments',
        timestamps: false
    }),
    message: sequelize.define('Messages', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        ChatID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Chats',
                key: 'ID'
            }
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'ID'
            }
        },
        Content: {
            type: DataTypes.STRING(2000)
        },
        Attachments: {
            type: DataTypes.STRING(325)
        },
        PublicationDate: {
            type: DataTypes.BIGINT
        }
    }, {
        tableName: 'Messages',
        timestamps: false
    }),
    posts: sequelize.define('Posts', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PostID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'ID'
            }
        },
        Title: {
            type: DataTypes.STRING(32),
            allowNull: true
        },
        Content: {
            type: DataTypes.STRING(15000),
            allowNull: true
        },
        PublicationDate: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        Status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: 'PostStatus',
                key: 'ID'
            }
        }
    }, {
        tableName: 'Posts',
        timestamps: false
    }),
    postsPunishments: sequelize.define('PostsPunishments', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LegalPunishment: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        Removed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        PostID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Posts',
                key: 'ID'
            }
        },
        Reason: {
            type: DataTypes.STRING(350),
            allowNull: true
        }
    }, {
        tableName: 'PostsPunishments',
        timestamps: false
    }),
    postsOpinions: sequelize.define('PostsOpinions', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PostID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Posts',
                key: 'ID'
            }
        },
        IsLike: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'PostsOpinions',
        timestamps: false
    })
});