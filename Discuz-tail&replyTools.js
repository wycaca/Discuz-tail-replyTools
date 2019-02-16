// ==UserScript==
// @name           Good Tail
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Very Good Tail.Hello!
// @version        2.01.29
// @create         2013-01-19
// @lastmodified   2013-09-29
// @include        http*/thread*
// @include        http*forum.php?mod=viewthread&tid=*
// @include        http*forum.php?mod=post&action=reply&fid=*
// @include        http://*/forum.php?mod=post&action=newthread&fid=*
// @copyright      2013+, Yulei
// ==/UserScript==

(function () {
    window.addEventListener(
        "DOMContentLoaded",
        function () {
            var _Q = function (d) {
                return document.querySelector(d)
            };
            var w = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;

            function $(id) {
                return !id ? null : document.getElementById(id);
            }
            //discuz_uid fid tid
            if (w.discuz_uid > 0 || _Q('#um')) { //是否登录，否则退出
                //var inp=document.createElement('input');inp.type="checkbox";inp.id="mUA";inp.checked=true;
                var bar = _Q('.fpd') || _Q('.bar');
                //ptm.appendChild(inp);
                //代码参考：forum.js
                var Psfm = $('postform'),
                    Fps = $('fastpostform');
                var pos = Psfm || Fps;

                //插入尾巴
                function MUA(P) { //Custom 为自定尾巴信息，各喜好修改！
                    var Custom = '[list][/list][float=left]\r\r\r[color=FFFFCC]\
藏起来的小尾巴,不让你看! \ ';
                    //\r——'+ Gtl +'[/color][/size]         [/float]


                    P.value = w.parseurl(P.value) + Custom;
                }
                var Gtl = w.getcookie("GTL") ? w.getcookie("GTL") : "";

                //截获提交
                function gform(pos) { //fm
                    pos.onsubmit = function () {
                        if ($('mUA').checked) {
                            MUA(pos.message);
                        }
                        return w.validate(this);
                    }
                }
                gform(pos);

                //截获快捷键
                if (!window.opera) {
                    w.keyDown = function () {};
                } //非O，USERJS优先权比较低
                function mess(PS) {
                    var fwin = $('fwin_reply');
                    PS.onkeydown = function (event) {
                        if ((event.ctrlKey && event.keyCode == 13 || event.altKey && event.keyCode == 83) || (event.altKey && event.keyCode == 83)) {
                            if (!fwin) {
                                if ($('mUA').checked) {
                                    MUA(PS);
                                }
                            }
                            if (Psfm) {
                                w.ctlent(event)
                            } else if (fwin) {
                                location.href = "javascript:$('postsubmit').click()";
                            } else {
                                w.seditor_ctlent(event, 'fastpostvalidate($(\'fastpostform\'))')
                            };
                        }
                    }
                }
                //创建选项
                var Sts = document.createElement("style");
                Sts.type = "text/css";
                Sts.textContent = "#mUA{ \
margin-top:5px;border:1px solid #f6f;color:red;outline:1px solid #f6f; \
animation:yu 6s -1 alternate;} \
@keyframes yu{0%{background:red} 35%{background:yellow}} ";
                document.head.appendChild(Sts);
                var Bos = document.createElement("input");
                Bos.id = "mUA";
                Bos.type = "checkbox";
                Bos.title = "加入签名(尾巴);双击设置哦";
                Bos.checked = true;
                if (bar) {
                    bar.appendChild(Bos);
                    mess(pos.message)
                };
                if ($('mUA')) {
                    $('mUA').ondblclick = function () {
                        var Gin = '<input type="text" id="GIN" value="' + Gtl + '" /> <input type="button" value="设置" onclick="setcookie(\'GTL\',$(\'GIN\').value,\'31536000\');hideMenu(\'fwin_dialog\',\'dialog\')" />';
                        w.showDialog(Gin, 'right', '设置你的信息', null, true, null, '', '', '', 180);
                    }
                }

                //if(getcookie('fastpostrefresh') == 1) {$('mUA').checked=true;}

                //劫持楼层回复
                var ShowW = w.showWindow;
                w.showWindow = function (k, url, mode, cache, menuv) {
                    setTimeout(function () {
                        var pof = $('postform');
                        _Q('.bar').appendChild(Bos);
                        mess(pof.message);
                        gform(pof);
                    }, 1300);
                    return ShowW(k, url, mode, cache, menuv);
                }

            }
        }, false
    );

    /* （支持：Opera12；兼容其它C/F；系统DZ）
     *  好尾巴，你值得拥有.
     * 简单成就精彩 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，否则追究，后果自负 */
})();
