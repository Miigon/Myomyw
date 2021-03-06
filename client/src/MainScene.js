var MainScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        var background = new cc.Sprite(res.MainSceneBG_png);
        background.attr({
            scale: Math.max(size.width / background.width, size.height / background.width),
            anchorX: 0.5,
            anchorY: 1,
            x: size.width / 2,
            y: size.height
        });
        this.addChild(background);
        
        scrollableLayer = new cc.Layer();
        this.addChild(scrollableLayer);

        //登录界面
        var loginUI = new ccui.Widget();
        scrollableLayer.addChild(loginUI);
        var titleLabel = creator.createLabel(txt.mainScene.loginTitle, 40);
        titleLabel.setPosition(size.width / 2, size.height / 2 + 100);
        loginUI.addChild(titleLabel);

        var nameBox = creator.createEditBox(txt.mainScene.enterName);
        nameBox.setPosition(size.width / 2, size.height / 2 + 20);
        loginUI.addChild(nameBox);

        if (cc.sys.isNative) {
            var addressBox = creator.createEditBox(txt.mainScene.enterAddress);
            addressBox.setPosition(size.width / 2, size.height / 2 - 50);
            loginUI.addChild(addressBox);
        }

        function moveToMainUI() {
            loginUI.enabled = false;
            mainUI.enabled = true;
            playOnlineButton.enabled = !player.guest;
            var moveAction = cc.moveTo(1, cc.p(-size.width, 0)).easing(cc.easeExponentialInOut());
            scrollableLayer.runAction(moveAction);
            updatePlayerLabel();
        }

        var loginButton = creator.createButton(txt.mainScene.login, cc.size(200, 40), function () {
            var address = cc.sys.isNative ? addressBox.getString() : "";
            player.login(nameBox.getString(), address, function () {
                moveToMainUI();
            }, function (error) {
                cc.log(error);
            })
        });
        loginButton.setPosition(size.width / 2, size.height / 2 - 120);
        loginUI.addChild(loginButton);

        guestButton = creator.createButton(txt.mainScene.loginAsGuest, cc.size(200, 40), function () {
            player.loginAsGuest();
            moveToMainUI();
        });
        guestButton.setPosition(size.width / 2, size.height / 2 - 180);
        loginUI.addChild(guestButton);

        //主界面层
        var mainUI = new ccui.Widget();
        mainUI.x = size.width;
        scrollableLayer.addChild(mainUI);

        var playOnlineButton = new ccui.Button(res.PlayOnlineButton_png);
        playOnlineButton.setPosition(size.width / 2, size.height / 2 + 60);
        playOnlineButton.addClickEventListener(function () {
            cc.director.runScene(new OnlineGameScene());
        });
        mainUI.addChild(playOnlineButton);

        var playWithAIButton = creator.createButton(txt.mainScene.playWithAI, cc.size(250, 40), function () {
            cc.director.runScene(new AIGameScene());
        });
        playWithAIButton.setPosition(size.width / 2, size.height / 2 - 40);
        mainUI.addChild(playWithAIButton);

        var playDoubleButton = creator.createButton(txt.mainScene.playDouble, cc.size(250, 40), function () {
            cc.director.runScene(new DoubleGameScene());
        });
        playDoubleButton.setPosition(size.width / 2, size.height / 2 - 100);
        mainUI.addChild(playDoubleButton);

        var logoutButton = creator.createButton(txt.mainScene.logout, cc.size(100, 40), function () {
            player.logout();
            loginUI.enabled = true;
            loginUI.visible = true;
            mainUI.enabled = false;
            var moveAction = cc.moveTo(1, cc.p(0, 0)).easing(cc.easeExponentialInOut());
            scrollableLayer.runAction(moveAction);
        });
        logoutButton.setPosition(size.width / 2, size.height / 2 - 200);
        mainUI.addChild(logoutButton);

        var playerLabel = creator.createLabel("", 25);
        mainUI.addChild(playerLabel);
        function updatePlayerLabel() {
            var str = player.name;
            if (!player.guest) {
                str += "   " + txt.mainScene.serverName + player.serverName;
            }
            playerLabel.string = str;
            playerLabel.setPosition(playerLabel.width / 2 + 20, size.height - playerLabel.height / 2 - 20);
        }

        if (player.logged) {
            loginUI.enabled = false;
            loginUI.visible = false;
            updatePlayerLabel();
            scrollableLayer.x = -size.width;
            playOnlineButton.enabled = !player.guest;
        } else {
            mainUI.enabled = false;
        }

        //固定界面
        var optionButton = new ccui.Button(res.OptionButtonN_png, res.OptionButtonS_png);
        optionButton.setPosition(optionButton.width / 2 + 10, optionButton.height / 2 + 10);
        optionButton.addClickEventListener(function () {
            cc.director.runScene(new OptionScene());
        });
        this.addChild(optionButton);
        return true;
    }
});
