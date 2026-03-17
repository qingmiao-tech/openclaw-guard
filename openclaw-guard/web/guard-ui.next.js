/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Pt(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ce = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, bn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], xe = () => {
}, $i = () => !1, Zn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), xo = (e) => e.startsWith("onUpdate:"), ye = Object.assign, Gs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Ic = Object.prototype.hasOwnProperty, ne = (e, t) => Ic.call(e, t), B = Array.isArray, sn = (e) => eo(e) === "[object Map]", ki = (e) => eo(e) === "[object Set]", wr = (e) => eo(e) === "[object Date]", K = (e) => typeof e == "function", _e = (e) => typeof e == "string", st = (e) => typeof e == "symbol", ee = (e) => e !== null && typeof e == "object", Ws = (e) => (ee(e) || K(e)) && K(e.then) && K(e.catch), Mi = Object.prototype.toString, eo = (e) => Mi.call(e), Ks = (e) => eo(e).slice(8, -1), ji = (e) => eo(e) === "[object Object]", Go = (e) => _e(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Fn = /* @__PURE__ */ Pt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), $c = /* @__PURE__ */ Pt(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Wo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, kc = /-\w/g, Ue = Wo(
  (e) => e.replace(kc, (t) => t.slice(1).toUpperCase())
), Mc = /\B([A-Z])/g, qt = Wo(
  (e) => e.replace(Mc, "-$1").toLowerCase()
), Ko = Wo((e) => e.charAt(0).toUpperCase() + e.slice(1)), en = Wo(
  (e) => e ? `on${Ko(e)}` : ""
), _t = (e, t) => !Object.is(e, t), Rn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Co = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, jc = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Sr;
const to = () => Sr || (Sr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function zs(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = _e(o) ? Uc(o) : zs(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else if (_e(e) || ee(e))
    return e;
}
const Lc = /;(?![^(]*\))/g, Fc = /:([^]+)/, Hc = /\/\*[^]*?\*\//g;
function Uc(e) {
  const t = {};
  return e.replace(Hc, "").split(Lc).forEach((n) => {
    if (n) {
      const o = n.split(Fc);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function zo(e) {
  let t = "";
  if (_e(e))
    t = e;
  else if (B(e))
    for (let n = 0; n < e.length; n++) {
      const o = zo(e[n]);
      o && (t += o + " ");
    }
  else if (ee(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Bc = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Gc = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Wc = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Kc = /* @__PURE__ */ Pt(Bc), zc = /* @__PURE__ */ Pt(Gc), qc = /* @__PURE__ */ Pt(Wc), Jc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Yc = /* @__PURE__ */ Pt(Jc);
function Li(e) {
  return !!e || e === "";
}
function Qc(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = qs(e[o], t[o]);
  return n;
}
function qs(e, t) {
  if (e === t) return !0;
  let n = wr(e), o = wr(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = st(e), o = st(t), n || o)
    return e === t;
  if (n = B(e), o = B(t), n || o)
    return n && o ? Qc(e, t) : !1;
  if (n = ee(e), o = ee(t), n || o) {
    if (!n || !o)
      return !1;
    const s = Object.keys(e).length, r = Object.keys(t).length;
    if (s !== r)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), c = t.hasOwnProperty(i);
      if (l && !c || !l && c || !qs(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Fi = (e) => !!(e && e.__v_isRef === !0), F = (e) => _e(e) ? e : e == null ? "" : B(e) || ee(e) && (e.toString === Mi || !K(e.toString)) ? Fi(e) ? F(e.value) : JSON.stringify(e, Hi, 2) : String(e), Hi = (e, t) => Fi(t) ? Hi(e, t.value) : sn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], r) => (n[ns(o, r) + " =>"] = s, n),
    {}
  )
} : ki(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ns(n))
} : st(t) ? ns(t) : ee(t) && !B(t) && !ji(t) ? String(t) : t, ns = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    st(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function We(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Pe;
class Ui {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = Pe, !t && Pe && (this.index = (Pe.scopes || (Pe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Pe;
      try {
        return Pe = this, t();
      } finally {
        Pe = n;
      }
    } else process.env.NODE_ENV !== "production" && We("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Pe, Pe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Pe = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Bi(e) {
  return new Ui(e);
}
function Gi() {
  return Pe;
}
function Xc(e, t = !1) {
  Pe ? Pe.cleanups.push(e) : process.env.NODE_ENV !== "production" && !t && We(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let ie;
const os = /* @__PURE__ */ new WeakSet();
class Wi {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Pe && Pe.active && Pe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, os.has(this) && (os.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || zi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Dr(this), qi(this);
    const t = ie, n = tt;
    ie = this, tt = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && ie !== this && We(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Ji(this), ie = t, tt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Qs(t);
      this.deps = this.depsTail = void 0, Dr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? os.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Es(this) && this.run();
  }
  get dirty() {
    return Es(this);
  }
}
let Ki = 0, Hn, Un;
function zi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Un, Un = e;
    return;
  }
  e.next = Hn, Hn = e;
}
function Js() {
  Ki++;
}
function Ys() {
  if (--Ki > 0)
    return;
  if (Un) {
    let t = Un;
    for (Un = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Hn; ) {
    let t = Hn;
    for (Hn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (o) {
          e || (e = o);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function qi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ji(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), Qs(o), Zc(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function Es(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Yi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Yi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Kn) || (e.globalVersion = Kn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Es(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ie, o = tt;
  ie = e, tt = !0;
  try {
    qi(e);
    const s = e.fn(e._value);
    (t.version === 0 || _t(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    ie = n, tt = o, Ji(e), e.flags &= -3;
  }
}
function Qs(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = s), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Qs(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Zc(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let tt = !0;
const Qi = [];
function rt() {
  Qi.push(tt), tt = !1;
}
function it() {
  const e = Qi.pop();
  tt = e === void 0 ? !0 : e;
}
function Dr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ie;
    ie = void 0;
    try {
      t();
    } finally {
      ie = n;
    }
  }
}
let Kn = 0;
class ea {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Xs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!ie || !tt || ie === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ie)
      n = this.activeLink = new ea(ie, this), ie.deps ? (n.prevDep = ie.depsTail, ie.depsTail.nextDep = n, ie.depsTail = n) : ie.deps = ie.depsTail = n, Xi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = ie.depsTail, n.nextDep = void 0, ie.depsTail.nextDep = n, ie.depsTail = n, ie.deps === n && (ie.deps = o);
    }
    return process.env.NODE_ENV !== "production" && ie.onTrack && ie.onTrack(
      ye(
        {
          effect: ie
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, Kn++, this.notify(t);
  }
  notify(t) {
    Js();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            ye(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ys();
    }
  }
}
function Xi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        Xi(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Ao = /* @__PURE__ */ new WeakMap(), rn = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), ys = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), zn = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Ve(e, t, n) {
  if (tt && ie) {
    let o = Ao.get(e);
    o || Ao.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new Xs()), s.map = o, s.key = n), process.env.NODE_ENV !== "production" ? s.track({
      target: e,
      type: t,
      key: n
    }) : s.track();
  }
}
function vt(e, t, n, o, s, r) {
  const i = Ao.get(e);
  if (!i) {
    Kn++;
    return;
  }
  const l = (c) => {
    c && (process.env.NODE_ENV !== "production" ? c.trigger({
      target: e,
      type: t,
      key: n,
      newValue: o,
      oldValue: s,
      oldTarget: r
    }) : c.trigger());
  };
  if (Js(), t === "clear")
    i.forEach(l);
  else {
    const c = B(e), d = c && Go(n);
    if (c && n === "length") {
      const u = Number(o);
      i.forEach((a, p) => {
        (p === "length" || p === zn || !st(p) && p >= u) && l(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && l(i.get(n)), d && l(i.get(zn)), t) {
        case "add":
          c ? d && l(i.get("length")) : (l(i.get(rn)), sn(e) && l(i.get(ys)));
          break;
        case "delete":
          c || (l(i.get(rn)), sn(e) && l(i.get(ys)));
          break;
        case "set":
          sn(e) && l(i.get(rn));
          break;
      }
  }
  Ys();
}
function ta(e, t) {
  const n = Ao.get(e);
  return n && n.get(t);
}
function pn(e) {
  const t = /* @__PURE__ */ q(e);
  return t === e ? t : (Ve(t, "iterate", zn), /* @__PURE__ */ Ie(e) ? t : t.map(ct));
}
function qo(e) {
  return Ve(e = /* @__PURE__ */ q(e), "iterate", zn), e;
}
function mt(e, t) {
  return /* @__PURE__ */ lt(e) ? Sn(/* @__PURE__ */ nt(e) ? ct(t) : t) : ct(t);
}
const na = {
  __proto__: null,
  [Symbol.iterator]() {
    return ss(this, Symbol.iterator, (e) => mt(this, e));
  },
  concat(...e) {
    return pn(this).concat(
      ...e.map((t) => B(t) ? pn(t) : t)
    );
  },
  entries() {
    return ss(this, "entries", (e) => (e[1] = mt(this, e[1]), e));
  },
  every(e, t) {
    return Ot(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ot(
      this,
      "filter",
      e,
      t,
      (n) => n.map((o) => mt(this, o)),
      arguments
    );
  },
  find(e, t) {
    return Ot(
      this,
      "find",
      e,
      t,
      (n) => mt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Ot(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ot(
      this,
      "findLast",
      e,
      t,
      (n) => mt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ot(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ot(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return rs(this, "includes", e);
  },
  indexOf(...e) {
    return rs(this, "indexOf", e);
  },
  join(e) {
    return pn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return rs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ot(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Pn(this, "pop");
  },
  push(...e) {
    return Pn(this, "push", e);
  },
  reduce(e, ...t) {
    return Vr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Vr(this, "reduceRight", e, t);
  },
  shift() {
    return Pn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ot(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Pn(this, "splice", e);
  },
  toReversed() {
    return pn(this).toReversed();
  },
  toSorted(e) {
    return pn(this).toSorted(e);
  },
  toSpliced(...e) {
    return pn(this).toSpliced(...e);
  },
  unshift(...e) {
    return Pn(this, "unshift", e);
  },
  values() {
    return ss(this, "values", (e) => mt(this, e));
  }
};
function ss(e, t, n) {
  const o = qo(e), s = o[t]();
  return o !== e && !/* @__PURE__ */ Ie(e) && (s._next = s.next, s.next = () => {
    const r = s._next();
    return r.done || (r.value = n(r.value)), r;
  }), s;
}
const oa = Array.prototype;
function Ot(e, t, n, o, s, r) {
  const i = qo(e), l = i !== e && !/* @__PURE__ */ Ie(e), c = i[t];
  if (c !== oa[t]) {
    const a = c.apply(e, r);
    return l ? ct(a) : a;
  }
  let d = n;
  i !== e && (l ? d = function(a, p) {
    return n.call(this, mt(e, a), p, e);
  } : n.length > 2 && (d = function(a, p) {
    return n.call(this, a, p, e);
  }));
  const u = c.call(i, d, o);
  return l && s ? s(u) : u;
}
function Vr(e, t, n, o) {
  const s = qo(e), r = s !== e && !/* @__PURE__ */ Ie(e);
  let i = n, l = !1;
  s !== e && (r ? (l = o.length === 0, i = function(d, u, a) {
    return l && (l = !1, d = mt(e, d)), n.call(this, d, mt(e, u), a, e);
  }) : n.length > 3 && (i = function(d, u, a) {
    return n.call(this, d, u, a, e);
  }));
  const c = s[t](i, ...o);
  return l ? mt(e, c) : c;
}
function rs(e, t, n) {
  const o = /* @__PURE__ */ q(e);
  Ve(o, "iterate", zn);
  const s = o[t](...n);
  return (s === -1 || s === !1) && /* @__PURE__ */ wn(n[0]) ? (n[0] = /* @__PURE__ */ q(n[0]), o[t](...n)) : s;
}
function Pn(e, t, n = []) {
  rt(), Js();
  const o = (/* @__PURE__ */ q(e))[t].apply(e, n);
  return Ys(), it(), o;
}
const sa = /* @__PURE__ */ Pt("__proto__,__v_isRef,__isVue"), Zi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(st)
);
function ra(e) {
  st(e) || (e = String(e));
  const t = /* @__PURE__ */ q(this);
  return Ve(t, "has", e), t.hasOwnProperty(e);
}
class el {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    if (n === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return o === (s ? r ? il : rl : r ? sl : ol).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = B(t);
    if (!s) {
      let c;
      if (i && (c = na[n]))
        return c;
      if (n === "hasOwnProperty")
        return ra;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ue(t) ? t : o
    );
    if ((st(n) ? Zi.has(n) : sa(n)) || (s || Ve(t, "get", n), r))
      return l;
    if (/* @__PURE__ */ ue(l)) {
      const c = i && Go(n) ? l : l.value;
      return s && ee(c) ? /* @__PURE__ */ Ns(c) : c;
    }
    return ee(l) ? s ? /* @__PURE__ */ Ns(l) : /* @__PURE__ */ no(l) : l;
  }
}
class tl extends el {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let r = t[n];
    const i = B(t) && Go(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ lt(r);
      if (!/* @__PURE__ */ Ie(o) && !/* @__PURE__ */ lt(o) && (r = /* @__PURE__ */ q(r), o = /* @__PURE__ */ q(o)), !i && /* @__PURE__ */ ue(r) && !/* @__PURE__ */ ue(o))
        return d ? (process.env.NODE_ENV !== "production" && We(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = o, !0);
    }
    const l = i ? Number(n) < t.length : ne(t, n), c = Reflect.set(
      t,
      n,
      o,
      /* @__PURE__ */ ue(t) ? t : s
    );
    return t === /* @__PURE__ */ q(s) && (l ? _t(o, r) && vt(t, "set", n, o, r) : vt(t, "add", n, o)), c;
  }
  deleteProperty(t, n) {
    const o = ne(t, n), s = t[n], r = Reflect.deleteProperty(t, n);
    return r && o && vt(t, "delete", n, void 0, s), r;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!st(n) || !Zi.has(n)) && Ve(t, "has", n), o;
  }
  ownKeys(t) {
    return Ve(
      t,
      "iterate",
      B(t) ? "length" : rn
    ), Reflect.ownKeys(t);
  }
}
class nl extends el {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && We(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && We(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const ia = /* @__PURE__ */ new tl(), la = /* @__PURE__ */ new nl(), ca = /* @__PURE__ */ new tl(!0), aa = /* @__PURE__ */ new nl(!0), bs = (e) => e, ao = (e) => Reflect.getPrototypeOf(e);
function ua(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = /* @__PURE__ */ q(s), i = sn(r), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, d = s[e](...o), u = n ? bs : t ? Sn : ct;
    return !t && Ve(
      r,
      "iterate",
      c ? ys : rn
    ), ye(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: a, done: p } = d.next();
          return p ? { value: a, done: p } : {
            value: l ? [u(a[0]), u(a[1])] : u(a),
            done: p
          };
        }
      }
    );
  };
}
function uo(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      We(
        `${Ko(e)} operation ${n}failed: target is readonly.`,
        /* @__PURE__ */ q(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function fa(e, t) {
  const n = {
    get(s) {
      const r = this.__v_raw, i = /* @__PURE__ */ q(r), l = /* @__PURE__ */ q(s);
      e || (_t(s, l) && Ve(i, "get", s), Ve(i, "get", l));
      const { has: c } = ao(i), d = t ? bs : e ? Sn : ct;
      if (c.call(i, s))
        return d(r.get(s));
      if (c.call(i, l))
        return d(r.get(l));
      r !== i && r.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && Ve(/* @__PURE__ */ q(s), "iterate", rn), s.size;
    },
    has(s) {
      const r = this.__v_raw, i = /* @__PURE__ */ q(r), l = /* @__PURE__ */ q(s);
      return e || (_t(s, l) && Ve(i, "has", s), Ve(i, "has", l)), s === l ? r.has(s) : r.has(s) || r.has(l);
    },
    forEach(s, r) {
      const i = this, l = i.__v_raw, c = /* @__PURE__ */ q(l), d = t ? bs : e ? Sn : ct;
      return !e && Ve(c, "iterate", rn), l.forEach((u, a) => s.call(r, d(u), d(a), i));
    }
  };
  return ye(
    n,
    e ? {
      add: uo("add"),
      set: uo("set"),
      delete: uo("delete"),
      clear: uo("clear")
    } : {
      add(s) {
        const r = /* @__PURE__ */ q(this), i = ao(r), l = /* @__PURE__ */ q(s), c = !t && !/* @__PURE__ */ Ie(s) && !/* @__PURE__ */ lt(s) ? l : s;
        return i.has.call(r, c) || _t(s, c) && i.has.call(r, s) || _t(l, c) && i.has.call(r, l) || (r.add(c), vt(r, "add", c, c)), this;
      },
      set(s, r) {
        !t && !/* @__PURE__ */ Ie(r) && !/* @__PURE__ */ lt(r) && (r = /* @__PURE__ */ q(r));
        const i = /* @__PURE__ */ q(this), { has: l, get: c } = ao(i);
        let d = l.call(i, s);
        d ? process.env.NODE_ENV !== "production" && xr(i, l, s) : (s = /* @__PURE__ */ q(s), d = l.call(i, s));
        const u = c.call(i, s);
        return i.set(s, r), d ? _t(r, u) && vt(i, "set", s, r, u) : vt(i, "add", s, r), this;
      },
      delete(s) {
        const r = /* @__PURE__ */ q(this), { has: i, get: l } = ao(r);
        let c = i.call(r, s);
        c ? process.env.NODE_ENV !== "production" && xr(r, i, s) : (s = /* @__PURE__ */ q(s), c = i.call(r, s));
        const d = l ? l.call(r, s) : void 0, u = r.delete(s);
        return c && vt(r, "delete", s, void 0, d), u;
      },
      clear() {
        const s = /* @__PURE__ */ q(this), r = s.size !== 0, i = process.env.NODE_ENV !== "production" ? sn(s) ? new Map(s) : new Set(s) : void 0, l = s.clear();
        return r && vt(
          s,
          "clear",
          void 0,
          void 0,
          i
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = ua(s, e, t);
  }), n;
}
function Jo(e, t) {
  const n = fa(e, t);
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    ne(n, s) && s in o ? n : o,
    s,
    r
  );
}
const da = {
  get: /* @__PURE__ */ Jo(!1, !1)
}, pa = {
  get: /* @__PURE__ */ Jo(!1, !0)
}, ha = {
  get: /* @__PURE__ */ Jo(!0, !1)
}, ga = {
  get: /* @__PURE__ */ Jo(!0, !0)
};
function xr(e, t, n) {
  const o = /* @__PURE__ */ q(n);
  if (o !== n && t.call(e, o)) {
    const s = Ks(e);
    We(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const ol = /* @__PURE__ */ new WeakMap(), sl = /* @__PURE__ */ new WeakMap(), rl = /* @__PURE__ */ new WeakMap(), il = /* @__PURE__ */ new WeakMap();
function ma(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function _a(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ma(Ks(e));
}
// @__NO_SIDE_EFFECTS__
function no(e) {
  return /* @__PURE__ */ lt(e) ? e : Yo(
    e,
    !1,
    ia,
    da,
    ol
  );
}
// @__NO_SIDE_EFFECTS__
function ll(e) {
  return Yo(
    e,
    !1,
    ca,
    pa,
    sl
  );
}
// @__NO_SIDE_EFFECTS__
function Ns(e) {
  return Yo(
    e,
    !0,
    la,
    ha,
    rl
  );
}
// @__NO_SIDE_EFFECTS__
function Et(e) {
  return Yo(
    e,
    !0,
    aa,
    ga,
    il
  );
}
function Yo(e, t, n, o, s) {
  if (!ee(e))
    return process.env.NODE_ENV !== "production" && We(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = _a(e);
  if (r === 0)
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const l = new Proxy(
    e,
    r === 2 ? o : n
  );
  return s.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function nt(e) {
  return /* @__PURE__ */ lt(e) ? /* @__PURE__ */ nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function lt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ie(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function wn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function q(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ q(t) : e;
}
function Bt(e) {
  return !ne(e, "__v_skip") && Object.isExtensible(e) && Co(e, "__v_skip", !0), e;
}
const ct = (e) => ee(e) ? /* @__PURE__ */ no(e) : e, Sn = (e) => ee(e) ? /* @__PURE__ */ Ns(e) : e;
// @__NO_SIDE_EFFECTS__
function ue(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Je(e) {
  return cl(e, !1);
}
// @__NO_SIDE_EFFECTS__
function va(e) {
  return cl(e, !0);
}
function cl(e, t) {
  return /* @__PURE__ */ ue(e) ? e : new Ea(e, t);
}
class Ea {
  constructor(t, n) {
    this.dep = new Xs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ q(t), this._value = n ? t : ct(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || /* @__PURE__ */ Ie(t) || /* @__PURE__ */ lt(t);
    t = o ? t : /* @__PURE__ */ q(t), _t(t, n) && (this._rawValue = t, this._value = o ? t : ct(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function w(e) {
  return /* @__PURE__ */ ue(e) ? e.value : e;
}
const ya = {
  get: (e, t, n) => t === "__v_raw" ? e : w(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return /* @__PURE__ */ ue(s) && !/* @__PURE__ */ ue(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function al(e) {
  return /* @__PURE__ */ nt(e) ? e : new Proxy(e, ya);
}
// @__NO_SIDE_EFFECTS__
function Cr(e) {
  process.env.NODE_ENV !== "production" && !/* @__PURE__ */ wn(e) && We("toRefs() expects a reactive object but received a plain one.");
  const t = B(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = ul(e, n);
  return t;
}
class ba {
  constructor(t, n, o) {
    this._object = t, this._key = n, this._defaultValue = o, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ q(t);
    let s = !0, r = t;
    if (!B(t) || !Go(String(n)))
      do
        s = !/* @__PURE__ */ wn(r) || /* @__PURE__ */ Ie(r);
      while (s && (r = r.__v_raw));
    this._shallow = s;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = w(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ ue(this._raw[this._key])) {
      const n = this._object[this._key];
      if (/* @__PURE__ */ ue(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return ta(this._raw, this._key);
  }
}
class Na {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function is(e, t, n) {
  return /* @__PURE__ */ ue(e) ? e : K(e) ? new Na(e) : ee(e) && arguments.length > 1 ? ul(e, t, n) : /* @__PURE__ */ Je(e);
}
function ul(e, t, n) {
  return new ba(e, t, n);
}
class Oa {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Xs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Kn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ie !== this)
      return zi(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Yi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && We("Write operation failed: computed value is readonly");
  }
}
// @__NO_SIDE_EFFECTS__
function wa(e, t, n = !1) {
  let o, s;
  K(e) ? o = e : (o = e.get, s = e.set);
  const r = new Oa(o, s, n);
  return process.env.NODE_ENV, r;
}
const fo = {}, Ro = /* @__PURE__ */ new WeakMap();
let tn;
function Sa(e, t = !1, n = tn) {
  if (n) {
    let o = Ro.get(n);
    o || Ro.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && We(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Da(e, t, n = ce) {
  const { immediate: o, deep: s, once: r, scheduler: i, augmentJob: l, call: c } = n, d = ($) => {
    (n.onWarn || We)(
      "Invalid watch source: ",
      $,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = ($) => s ? $ : /* @__PURE__ */ Ie($) || s === !1 || s === 0 ? Ut($, 1) : Ut($);
  let a, p, g, O, b = !1, L = !1;
  if (/* @__PURE__ */ ue(e) ? (p = () => e.value, b = /* @__PURE__ */ Ie(e)) : /* @__PURE__ */ nt(e) ? (p = () => u(e), b = !0) : B(e) ? (L = !0, b = e.some(($) => /* @__PURE__ */ nt($) || /* @__PURE__ */ Ie($)), p = () => e.map(($) => {
    if (/* @__PURE__ */ ue($))
      return $.value;
    if (/* @__PURE__ */ nt($))
      return u($);
    if (K($))
      return c ? c($, 2) : $();
    process.env.NODE_ENV !== "production" && d($);
  })) : K(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (g) {
      rt();
      try {
        g();
      } finally {
        it();
      }
    }
    const $ = tn;
    tn = a;
    try {
      return c ? c(e, 3, [O]) : e(O);
    } finally {
      tn = $;
    }
  } : (p = xe, process.env.NODE_ENV !== "production" && d(e)), t && s) {
    const $ = p, re = s === !0 ? 1 / 0 : s;
    p = () => Ut($(), re);
  }
  const H = Gi(), P = () => {
    a.stop(), H && H.active && Gs(H.effects, a);
  };
  if (r && t) {
    const $ = t;
    t = (...re) => {
      $(...re), P();
    };
  }
  let M = L ? new Array(e.length).fill(fo) : fo;
  const oe = ($) => {
    if (!(!(a.flags & 1) || !a.dirty && !$))
      if (t) {
        const re = a.run();
        if (s || b || (L ? re.some((j, Oe) => _t(j, M[Oe])) : _t(re, M))) {
          g && g();
          const j = tn;
          tn = a;
          try {
            const Oe = [
              re,
              // pass undefined as the old value when it's changed for the first time
              M === fo ? void 0 : L && M[0] === fo ? [] : M,
              O
            ];
            M = re, c ? c(t, 3, Oe) : (
              // @ts-expect-error
              t(...Oe)
            );
          } finally {
            tn = j;
          }
        }
      } else
        a.run();
  };
  return l && l(oe), a = new Wi(p), a.scheduler = i ? () => i(oe, !1) : oe, O = ($) => Sa($, !1, a), g = a.onStop = () => {
    const $ = Ro.get(a);
    if ($) {
      if (c)
        c($, 4);
      else
        for (const re of $) re();
      Ro.delete(a);
    }
  }, process.env.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? o ? oe(!0) : M = a.run() : i ? i(oe.bind(null, !0), !0) : a.run(), P.pause = a.pause.bind(a), P.resume = a.resume.bind(a), P.stop = P, P;
}
function Ut(e, t = 1 / 0, n) {
  if (t <= 0 || !ee(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ ue(e))
    Ut(e.value, t, n);
  else if (B(e))
    for (let o = 0; o < e.length; o++)
      Ut(e[o], t, n);
  else if (ki(e) || sn(e))
    e.forEach((o) => {
      Ut(o, t, n);
    });
  else if (ji(e)) {
    for (const o in e)
      Ut(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && Ut(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const ln = [];
function go(e) {
  ln.push(e);
}
function mo() {
  ln.pop();
}
let ls = !1;
function x(e, ...t) {
  if (ls) return;
  ls = !0, rt();
  const n = ln.length ? ln[ln.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = Va();
  if (o)
    xn(
      o,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((r) => {
          var i, l;
          return (l = (i = r.toString) == null ? void 0 : i.call(r)) != null ? l : JSON.stringify(r);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: r }) => `at <${lo(n, r.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...xa(s)), console.warn(...r);
  }
  it(), ls = !1;
}
function Va() {
  let e = ln[ln.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function xa(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Ca(n));
  }), t;
}
function Ca({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${lo(
    e.component,
    e.type,
    o
  )}`, r = ">" + n;
  return e.props ? [s, ...Aa(e.props), r] : [s + r];
}
function Aa(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...fl(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function fl(e, t, n) {
  return _e(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : /* @__PURE__ */ ue(t) ? (t = fl(e, /* @__PURE__ */ q(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : K(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ q(t), n ? t : [`${e}=`, t]);
}
const Zs = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function xn(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    oo(s, t, n);
  }
}
function Nt(e, t, n, o) {
  if (K(e)) {
    const s = xn(e, t, n, o);
    return s && Ws(s) && s.catch((r) => {
      oo(r, t, n);
    }), s;
  }
  if (B(e)) {
    const s = [];
    for (let r = 0; r < e.length; r++)
      s.push(Nt(e[r], t, n, o));
    return s;
  } else process.env.NODE_ENV !== "production" && x(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function oo(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ce;
  if (t) {
    let l = t.parent;
    const c = t.proxy, d = process.env.NODE_ENV !== "production" ? Zs[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let a = 0; a < u.length; a++)
          if (u[a](e, c, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      rt(), xn(r, null, 10, [
        e,
        c,
        d
      ]), it();
      return;
    }
  }
  Ra(e, n, s, o, i);
}
function Ra(e, t, n, o = !0, s = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = Zs[t];
    if (n && go(n), x(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && mo(), o)
      throw e;
    console.error(e);
  } else {
    if (s)
      throw e;
    console.error(e);
  }
}
const je = [];
let gt = -1;
const Nn = [];
let Ft = null, En = 0;
const dl = /* @__PURE__ */ Promise.resolve();
let Po = null;
const Pa = 100;
function To(e) {
  const t = Po || dl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ta(e) {
  let t = gt + 1, n = je.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = je[o], r = qn(s);
    r < e || r === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Qo(e) {
  if (!(e.flags & 1)) {
    const t = qn(e), n = je[je.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= qn(n) ? je.push(e) : je.splice(Ta(t), 0, e), e.flags |= 1, pl();
  }
}
function pl() {
  Po || (Po = dl.then(ml));
}
function hl(e) {
  B(e) ? Nn.push(...e) : Ft && e.id === -1 ? Ft.splice(En + 1, 0, e) : e.flags & 1 || (Nn.push(e), e.flags |= 1), pl();
}
function Ar(e, t, n = gt + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < je.length; n++) {
    const o = je[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && er(t, o))
        continue;
      je.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function gl(e) {
  if (Nn.length) {
    const t = [...new Set(Nn)].sort(
      (n, o) => qn(n) - qn(o)
    );
    if (Nn.length = 0, Ft) {
      Ft.push(...t);
      return;
    }
    for (Ft = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), En = 0; En < Ft.length; En++) {
      const n = Ft[En];
      process.env.NODE_ENV !== "production" && er(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Ft = null, En = 0;
  }
}
const qn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ml(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => er(e, n) : xe;
  try {
    for (gt = 0; gt < je.length; gt++) {
      const n = je[gt];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), xn(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; gt < je.length; gt++) {
      const n = je[gt];
      n && (n.flags &= -2);
    }
    gt = -1, je.length = 0, gl(e), Po = null, (je.length || Nn.length) && ml(e);
  }
}
function er(e, t) {
  const n = e.get(t) || 0;
  if (n > Pa) {
    const o = t.i, s = o && Ql(o.type);
    return oo(
      `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let yt = !1;
const _o = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (to().__VUE_HMR_RUNTIME__ = {
  createRecord: cs(_l),
  rerender: cs(ka),
  reload: cs(Ma)
});
const un = /* @__PURE__ */ new Map();
function Ia(e) {
  const t = e.type.__hmrId;
  let n = un.get(t);
  n || (_l(t, e.type), n = un.get(t)), n.instances.add(e);
}
function $a(e) {
  un.get(e.type.__hmrId).instances.delete(e);
}
function _l(e, t) {
  return un.has(e) ? !1 : (un.set(e, {
    initialDef: Io(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Io(e) {
  return Xl(e) ? e.__vccOpts : e;
}
function ka(e, t) {
  const n = un.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Io(o.type).render = t), o.renderCache = [], yt = !0, o.job.flags & 8 || o.update(), yt = !1;
  }));
}
function Ma(e, t) {
  const n = un.get(e);
  if (!n) return;
  t = Io(t), Rr(n.initialDef, t);
  const o = [...n.instances];
  for (let s = 0; s < o.length; s++) {
    const r = o[s], i = Io(r.type);
    let l = _o.get(i);
    l || (i !== n.initialDef && Rr(i, t), _o.set(i, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? Qo(() => {
      r.job.flags & 8 || (yt = !0, r.parent.update(), yt = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(i);
  }
  hl(() => {
    _o.clear();
  });
}
function Rr(e, t) {
  ye(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function cs(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let Ze, Mn = [], Os = !1;
function so(e, ...t) {
  Ze ? Ze.emit(e, ...t) : Os || Mn.push({ event: e, args: t });
}
function tr(e, t) {
  var n, o;
  Ze = e, Ze ? (Ze.enabled = !0, Mn.forEach(({ event: s, args: r }) => Ze.emit(s, ...r)), Mn = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    tr(r, t);
  }), setTimeout(() => {
    Ze || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Os = !0, Mn = []);
  }, 3e3)) : (Os = !0, Mn = []);
}
function ja(e, t) {
  so("app:init", e, t, {
    Fragment: be,
    Text: ro,
    Comment: Be,
    Static: bo
  });
}
function La(e) {
  so("app:unmount", e);
}
const Fa = /* @__PURE__ */ nr(
  "component:added"
  /* COMPONENT_ADDED */
), vl = /* @__PURE__ */ nr(
  "component:updated"
  /* COMPONENT_UPDATED */
), Ha = /* @__PURE__ */ nr(
  "component:removed"
  /* COMPONENT_REMOVED */
), Ua = (e) => {
  Ze && typeof Ze.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Ze.cleanupBuffer(e) && Ha(e);
};
// @__NO_SIDE_EFFECTS__
function nr(e) {
  return (t) => {
    so(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const Ba = /* @__PURE__ */ El(
  "perf:start"
  /* PERFORMANCE_START */
), Ga = /* @__PURE__ */ El(
  "perf:end"
  /* PERFORMANCE_END */
);
function El(e) {
  return (t, n, o) => {
    so(e, t.appContext.app, t.uid, t, n, o);
  };
}
function Wa(e, t, n) {
  so(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let Ae = null, yl = null;
function $o(e) {
  const t = Ae;
  return Ae = e, yl = e && e.type.__scopeId || null, t;
}
function et(e, t = Ae, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && Fo(-1);
    const r = $o(t);
    let i;
    try {
      i = e(...s);
    } finally {
      $o(r), o._d && Fo(1);
    }
    return process.env.NODE_ENV !== "production" && vl(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function bl(e) {
  $c(e) && x("Do not use built-in directive ids as custom directive id: " + e);
}
function Xt(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let c = l.dir[o];
    c && (rt(), Nt(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), it());
  }
}
function vo(e, t) {
  if (process.env.NODE_ENV !== "production" && (!De || De.isMounted) && x("provide() can only be used inside setup()."), De) {
    let n = De.provides;
    const o = De.parent && De.parent.provides;
    o === n && (n = De.provides = Object.create(o)), n[e] = t;
  }
}
function ot(e, t, n = !1) {
  const o = Cn();
  if (o || an) {
    let s = an ? an._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && K(t) ? t.call(o && o.proxy) : t;
    process.env.NODE_ENV !== "production" && x(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && x("inject() can only be used inside setup() or functional components.");
}
function Ka() {
  return !!(Cn() || an);
}
const za = /* @__PURE__ */ Symbol.for("v-scx"), qa = () => {
  {
    const e = ot(za);
    return e || process.env.NODE_ENV !== "production" && x(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Ja(e, t) {
  return or(e, null, t);
}
function At(e, t, n) {
  return process.env.NODE_ENV !== "production" && !K(t) && x(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), or(e, t, n);
}
function or(e, t, n = ce) {
  const { immediate: o, deep: s, flush: r, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (o !== void 0 && x(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && x(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && x(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = ye({}, n);
  process.env.NODE_ENV !== "production" && (l.onWarn = x);
  const c = t && o || !t && r !== "post";
  let d;
  if (Qn) {
    if (r === "sync") {
      const g = qa();
      d = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!c) {
      const g = () => {
      };
      return g.stop = xe, g.resume = xe, g.pause = xe, g;
    }
  }
  const u = De;
  l.call = (g, O, b) => Nt(g, u, O, b);
  let a = !1;
  r === "post" ? l.scheduler = (g) => {
    He(g, u && u.suspense);
  } : r !== "sync" && (a = !0, l.scheduler = (g, O) => {
    O ? g() : Qo(g);
  }), l.augmentJob = (g) => {
    t && (g.flags |= 4), a && (g.flags |= 2, u && (g.id = u.uid, g.i = u));
  };
  const p = Da(e, t, l);
  return Qn && (d ? d.push(p) : c && p()), p;
}
function Ya(e, t, n) {
  const o = this.proxy, s = _e(e) ? e.includes(".") ? Nl(o, e) : () => o[e] : e.bind(o, o);
  let r;
  K(t) ? r = t : (r = t.handler, n = t);
  const i = io(this), l = or(s, r.bind(o), n);
  return i(), l;
}
function Nl(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const Qa = /* @__PURE__ */ Symbol("_vte"), Xa = (e) => e.__isTeleport, Za = /* @__PURE__ */ Symbol("_leaveCb");
function sr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, sr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Tt(e, t) {
  return K(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ye({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ol(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Pr = /* @__PURE__ */ new WeakSet();
function Tr(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const ko = /* @__PURE__ */ new WeakMap();
function Bn(e, t, n, o, s = !1) {
  if (B(e)) {
    e.forEach(
      (b, L) => Bn(
        b,
        t && (B(t) ? t[L] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (On(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && Bn(e, t, n, o.component.subTree);
    return;
  }
  const r = o.shapeFlag & 4 ? pr(o.component) : o.el, i = s ? null : r, { i: l, r: c } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    x(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, u = l.refs === ce ? l.refs = {} : l.refs, a = l.setupState, p = /* @__PURE__ */ q(a), g = a === ce ? $i : (b) => process.env.NODE_ENV !== "production" && (ne(p, b) && !/* @__PURE__ */ ue(p[b]) && x(
    `Template ref "${b}" used on a non-ref value. It will not work in the production build.`
  ), Pr.has(p[b])) || Tr(u, b) ? !1 : ne(p, b), O = (b, L) => !(process.env.NODE_ENV !== "production" && Pr.has(b) || L && Tr(u, L));
  if (d != null && d !== c) {
    if (Ir(t), _e(d))
      u[d] = null, g(d) && (a[d] = null);
    else if (/* @__PURE__ */ ue(d)) {
      const b = t;
      O(d, b.k) && (d.value = null), b.k && (u[b.k] = null);
    }
  }
  if (K(c))
    xn(c, l, 12, [i, u]);
  else {
    const b = _e(c), L = /* @__PURE__ */ ue(c);
    if (b || L) {
      const H = () => {
        if (e.f) {
          const P = b ? g(c) ? a[c] : u[c] : O(c) || !e.k ? c.value : u[e.k];
          if (s)
            B(P) && Gs(P, r);
          else if (B(P))
            P.includes(r) || P.push(r);
          else if (b)
            u[c] = [r], g(c) && (a[c] = u[c]);
          else {
            const M = [r];
            O(c, e.k) && (c.value = M), e.k && (u[e.k] = M);
          }
        } else b ? (u[c] = i, g(c) && (a[c] = i)) : L ? (O(c, e.k) && (c.value = i), e.k && (u[e.k] = i)) : process.env.NODE_ENV !== "production" && x("Invalid template ref type:", c, `(${typeof c})`);
      };
      if (i) {
        const P = () => {
          H(), ko.delete(e);
        };
        P.id = -1, ko.set(e, P), He(P, n);
      } else
        Ir(e), H();
    } else process.env.NODE_ENV !== "production" && x("Invalid template ref type:", c, `(${typeof c})`);
  }
}
function Ir(e) {
  const t = ko.get(e);
  t && (t.flags |= 8, ko.delete(e));
}
to().requestIdleCallback;
to().cancelIdleCallback;
const On = (e) => !!e.type.__asyncLoader, rr = (e) => e.type.__isKeepAlive;
function eu(e, t) {
  wl(e, "a", t);
}
function tu(e, t) {
  wl(e, "da", t);
}
function wl(e, t, n = De) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Xo(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      rr(s.parent.vnode) && nu(o, t, n, s), s = s.parent;
  }
}
function nu(e, t, n, o) {
  const s = Xo(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Sl(() => {
    Gs(o[t], s);
  }, n);
}
function Xo(e, t, n = De, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      rt();
      const l = io(n), c = Nt(t, n, e, i);
      return l(), it(), c;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = en(Zs[e].replace(/ hook$/, ""));
    x(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const It = (e) => (t, n = De) => {
  (!Qn || e === "sp") && Xo(e, (...o) => t(...o), n);
}, ou = It("bm"), ir = It("m"), su = It(
  "bu"
), ru = It("u"), iu = It(
  "bum"
), Sl = It("um"), lu = It(
  "sp"
), cu = It("rtg"), au = It("rtc");
function uu(e, t = De) {
  Xo("ec", e, t);
}
const fu = /* @__PURE__ */ Symbol.for("v-ndc");
function Eo(e, t, n, o) {
  let s;
  const r = n, i = B(e);
  if (i || _e(e)) {
    const l = i && /* @__PURE__ */ nt(e);
    let c = !1, d = !1;
    l && (c = !/* @__PURE__ */ Ie(e), d = /* @__PURE__ */ lt(e), e = qo(e)), s = new Array(e.length);
    for (let u = 0, a = e.length; u < a; u++)
      s[u] = t(
        c ? d ? Sn(ct(e[u])) : ct(e[u]) : e[u],
        u,
        void 0,
        r
      );
  } else if (typeof e == "number")
    if (process.env.NODE_ENV !== "production" && (!Number.isInteger(e) || e < 0))
      x(
        `The v-for range expects a positive integer value but got ${e}.`
      ), s = [];
    else {
      s = new Array(e);
      for (let l = 0; l < e; l++)
        s[l] = t(l + 1, l, void 0, r);
    }
  else if (ee(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (l, c) => t(l, c, void 0, r)
      );
    else {
      const l = Object.keys(e);
      s = new Array(l.length);
      for (let c = 0, d = l.length; c < d; c++) {
        const u = l[c];
        s[c] = t(e[u], u, c, r);
      }
    }
  else
    s = [];
  return s;
}
function $r(e, t, n = {}, o, s) {
  if (Ae.ce || Ae.parent && On(Ae.parent) && Ae.parent.ce) {
    const d = Object.keys(n).length > 0;
    return t !== "default" && (n.name = t), ae(), Yn(
      be,
      null,
      [he("slot", n, o)],
      d ? -2 : 64
    );
  }
  let r = e[t];
  process.env.NODE_ENV !== "production" && r && r.length > 1 && (x(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), r = () => []), r && r._c && (r._d = !1), ae();
  const i = r && Dl(r(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, c = Yn(
    be,
    {
      key: (l && !st(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && o ? "_fb" : "")
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), r && r._c && (r._d = !0), c;
}
function Dl(e) {
  return e.some((t) => fn(t) ? !(t.type === Be || t.type === be && !Dl(t.children)) : !0) ? e : null;
}
const ws = (e) => e ? Jl(e) ? pr(e) : ws(e.parent) : null, cn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ye(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Et(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Et(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Et(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Et(e.refs) : e.refs,
    $parent: (e) => ws(e.parent),
    $root: (e) => ws(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Cl(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Qo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = To.bind(e.proxy)),
    $watch: (e) => Ya.bind(e)
  })
), lr = (e) => e === "_" || e === "$", as = (e, t) => e !== ce && !e.__isScriptSetup && ne(e, t), Vl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: l, appContext: c } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (t[0] !== "$") {
      const p = i[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (as(o, t))
          return i[t] = 1, o[t];
        if (s !== ce && ne(s, t))
          return i[t] = 2, s[t];
        if (ne(r, t))
          return i[t] = 3, r[t];
        if (n !== ce && ne(n, t))
          return i[t] = 4, n[t];
        Ss && (i[t] = 0);
      }
    }
    const d = cn[t];
    let u, a;
    if (d)
      return t === "$attrs" ? (Ve(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && jo()) : process.env.NODE_ENV !== "production" && t === "$slots" && Ve(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== ce && ne(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      a = c.config.globalProperties, ne(a, t)
    )
      return a[t];
    process.env.NODE_ENV !== "production" && Ae && (!_e(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== ce && lr(t[0]) && ne(s, t) ? x(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Ae && x(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return as(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && ne(s, t) ? (x(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== ce && ne(o, t) ? (o[t] = n, !0) : ne(e.props, t) ? (process.env.NODE_ENV !== "production" && x(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && x(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, props: r, type: i }
  }, l) {
    let c;
    return !!(n[l] || e !== ce && l[0] !== "$" && ne(e, l) || as(t, l) || ne(r, l) || ne(o, l) || ne(cn, l) || ne(s.config.globalProperties, l) || (c = i.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ne(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Vl.ownKeys = (e) => (x(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function du(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(cn).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => cn[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: xe
    });
  }), t;
}
function pu(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: xe
    });
  });
}
function hu(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(/* @__PURE__ */ q(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (lr(o[0])) {
        x(
          `setup() return property ${JSON.stringify(
            o
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: xe
      });
    }
  });
}
function kr(e) {
  return B(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function gu() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? x(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Ss = !0;
function mu(e) {
  const t = Cl(e), n = e.proxy, o = e.ctx;
  Ss = !1, t.beforeCreate && Mr(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: l,
    provide: c,
    inject: d,
    // lifecycle
    created: u,
    beforeMount: a,
    mounted: p,
    beforeUpdate: g,
    updated: O,
    activated: b,
    deactivated: L,
    beforeDestroy: H,
    beforeUnmount: P,
    destroyed: M,
    unmounted: oe,
    render: $,
    renderTracked: re,
    renderTriggered: j,
    errorCaptured: Oe,
    serverPrefetch: fe,
    // public API
    expose: k,
    inheritAttrs: T,
    // assets
    components: Z,
    directives: ge,
    filters: at
  } = t, Re = process.env.NODE_ENV !== "production" ? gu() : null;
  if (process.env.NODE_ENV !== "production") {
    const [Q] = e.propsOptions;
    if (Q)
      for (const J in Q)
        Re("Props", J);
  }
  if (d && _u(d, o, Re), i)
    for (const Q in i) {
      const J = i[Q];
      K(J) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, Q, {
        value: J.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[Q] = J.bind(n), process.env.NODE_ENV !== "production" && Re("Methods", Q)) : process.env.NODE_ENV !== "production" && x(
        `Method "${Q}" has type "${typeof J}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !K(s) && x(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const Q = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && Ws(Q) && x(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !ee(Q))
      process.env.NODE_ENV !== "production" && x("data() should return an object.");
    else if (e.data = /* @__PURE__ */ no(Q), process.env.NODE_ENV !== "production")
      for (const J in Q)
        Re("Data", J), lr(J[0]) || Object.defineProperty(o, J, {
          configurable: !0,
          enumerable: !0,
          get: () => Q[J],
          set: xe
        });
  }
  if (Ss = !0, r)
    for (const Q in r) {
      const J = r[Q], pe = K(J) ? J.bind(n, n) : K(J.get) ? J.get.bind(n, n) : xe;
      process.env.NODE_ENV !== "production" && pe === xe && x(`Computed property "${Q}" has no getter.`);
      const Qt = !K(J) && K(J.set) ? J.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        x(
          `Write operation failed: computed property "${Q}" is readonly.`
        );
      } : xe, $t = Ne({
        get: pe,
        set: Qt
      });
      Object.defineProperty(o, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => $t.value,
        set: (ut) => $t.value = ut
      }), process.env.NODE_ENV !== "production" && Re("Computed", Q);
    }
  if (l)
    for (const Q in l)
      xl(l[Q], o, n, Q);
  if (c) {
    const Q = K(c) ? c.call(n) : c;
    Reflect.ownKeys(Q).forEach((J) => {
      vo(J, Q[J]);
    });
  }
  u && Mr(u, e, "c");
  function we(Q, J) {
    B(J) ? J.forEach((pe) => Q(pe.bind(n))) : J && Q(J.bind(n));
  }
  if (we(ou, a), we(ir, p), we(su, g), we(ru, O), we(eu, b), we(tu, L), we(uu, Oe), we(au, re), we(cu, j), we(iu, P), we(Sl, oe), we(lu, fe), B(k))
    if (k.length) {
      const Q = e.exposed || (e.exposed = {});
      k.forEach((J) => {
        Object.defineProperty(Q, J, {
          get: () => n[J],
          set: (pe) => n[J] = pe,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  $ && e.render === xe && (e.render = $), T != null && (e.inheritAttrs = T), Z && (e.components = Z), ge && (e.directives = ge), fe && Ol(e);
}
function _u(e, t, n = xe) {
  B(e) && (e = Ds(e));
  for (const o in e) {
    const s = e[o];
    let r;
    ee(s) ? "default" in s ? r = ot(
      s.from || o,
      s.default,
      !0
    ) : r = ot(s.from || o) : r = ot(s), /* @__PURE__ */ ue(r) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[o] = r, process.env.NODE_ENV !== "production" && n("Inject", o);
  }
}
function Mr(e, t, n) {
  Nt(
    B(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function xl(e, t, n, o) {
  let s = o.includes(".") ? Nl(n, o) : () => n[o];
  if (_e(e)) {
    const r = t[e];
    K(r) ? At(s, r) : process.env.NODE_ENV !== "production" && x(`Invalid watch handler specified by key "${e}"`, r);
  } else if (K(e))
    At(s, e.bind(n));
  else if (ee(e))
    if (B(e))
      e.forEach((r) => xl(r, t, n, o));
    else {
      const r = K(e.handler) ? e.handler.bind(n) : t[e.handler];
      K(r) ? At(s, r, e) : process.env.NODE_ENV !== "production" && x(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && x(`Invalid watch option: "${o}"`, e);
}
function Cl(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let c;
  return l ? c = l : !s.length && !n && !o ? c = t : (c = {}, s.length && s.forEach(
    (d) => Mo(c, d, i, !0)
  ), Mo(c, t, i)), ee(t) && r.set(t, c), c;
}
function Mo(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && Mo(e, r, n, !0), s && s.forEach(
    (i) => Mo(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && x(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = vu[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const vu = {
  data: jr,
  props: Lr,
  emits: Lr,
  // objects
  methods: jn,
  computed: jn,
  // lifecycle
  beforeCreate: ke,
  created: ke,
  beforeMount: ke,
  mounted: ke,
  beforeUpdate: ke,
  updated: ke,
  beforeDestroy: ke,
  beforeUnmount: ke,
  destroyed: ke,
  unmounted: ke,
  activated: ke,
  deactivated: ke,
  errorCaptured: ke,
  serverPrefetch: ke,
  // assets
  components: jn,
  directives: jn,
  // watch
  watch: yu,
  // provide / inject
  provide: jr,
  inject: Eu
};
function jr(e, t) {
  return t ? e ? function() {
    return ye(
      K(e) ? e.call(this, this) : e,
      K(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Eu(e, t) {
  return jn(Ds(e), Ds(t));
}
function Ds(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ke(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function jn(e, t) {
  return e ? ye(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Lr(e, t) {
  return e ? B(e) && B(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ye(
    /* @__PURE__ */ Object.create(null),
    kr(e),
    kr(t ?? {})
  ) : t;
}
function yu(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ye(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = ke(e[o], t[o]);
  return n;
}
function Al() {
  return {
    app: null,
    config: {
      isNativeTag: $i,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let bu = 0;
function Nu(e, t) {
  return function(o, s = null) {
    K(o) || (o = ye({}, o)), s != null && !ee(s) && (process.env.NODE_ENV !== "production" && x("root props passed to app.mount() must be an object."), s = null);
    const r = Al(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const d = r.app = {
      _uid: bu++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: Yr,
      get config() {
        return r.config;
      },
      set config(u) {
        process.env.NODE_ENV !== "production" && x(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(u, ...a) {
        return i.has(u) ? process.env.NODE_ENV !== "production" && x("Plugin has already been applied to target app.") : u && K(u.install) ? (i.add(u), u.install(d, ...a)) : K(u) ? (i.add(u), u(d, ...a)) : process.env.NODE_ENV !== "production" && x(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(u) {
        return r.mixins.includes(u) ? process.env.NODE_ENV !== "production" && x(
          "Mixin has already been applied to target app" + (u.name ? `: ${u.name}` : "")
        ) : r.mixins.push(u), d;
      },
      component(u, a) {
        return process.env.NODE_ENV !== "production" && Rs(u, r.config), a ? (process.env.NODE_ENV !== "production" && r.components[u] && x(`Component "${u}" has already been registered in target app.`), r.components[u] = a, d) : r.components[u];
      },
      directive(u, a) {
        return process.env.NODE_ENV !== "production" && bl(u), a ? (process.env.NODE_ENV !== "production" && r.directives[u] && x(`Directive "${u}" has already been registered in target app.`), r.directives[u] = a, d) : r.directives[u];
      },
      mount(u, a, p) {
        if (c)
          process.env.NODE_ENV !== "production" && x(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && u.__vue_app__ && x(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const g = d._ceVNode || he(o, s);
          return g.appContext = r, p === !0 ? p = "svg" : p === !1 && (p = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const O = Jt(g);
            O.el = null, e(O, u, p);
          }), e(g, u, p), c = !0, d._container = u, u.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = g.component, ja(d, Yr)), pr(g.component);
        }
      },
      onUnmount(u) {
        process.env.NODE_ENV !== "production" && typeof u != "function" && x(
          `Expected function as first argument to app.onUnmount(), but got ${typeof u}`
        ), l.push(u);
      },
      unmount() {
        c ? (Nt(
          l,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, La(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && x("Cannot unmount an app that is not mounted.");
      },
      provide(u, a) {
        return process.env.NODE_ENV !== "production" && u in r.provides && (ne(r.provides, u) ? x(
          `App already provides property with key "${String(u)}". It will be overwritten with the new value.`
        ) : x(
          `App already provides property with key "${String(u)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[u] = a, d;
      },
      runWithContext(u) {
        const a = an;
        an = d;
        try {
          return u();
        } finally {
          an = a;
        }
      }
    };
    return d;
  };
}
let an = null;
const Ou = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ue(t)}Modifiers`] || e[`${qt(t)}Modifiers`];
function wu(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || ce;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: u,
      propsOptions: [a]
    } = e;
    if (u)
      if (!(t in u))
        (!a || !(en(Ue(t)) in a)) && x(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${en(Ue(t))}" prop.`
        );
      else {
        const p = u[t];
        K(p) && (p(...n) || x(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && Ou(o, t.slice(7));
  if (i && (i.trim && (s = n.map((u) => _e(u) ? u.trim() : u)), i.number && (s = n.map(jc))), process.env.NODE_ENV !== "production" && Wa(e, t, s), process.env.NODE_ENV !== "production") {
    const u = t.toLowerCase();
    u !== t && o[en(u)] && x(
      `Event "${u}" is emitted in component ${lo(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${qt(
        t
      )}" instead of "${t}".`
    );
  }
  let l, c = o[l = en(t)] || // also try camelCase event handler (#2249)
  o[l = en(Ue(t))];
  !c && r && (c = o[l = en(qt(t))]), c && Nt(
    c,
    e,
    6,
    s
  );
  const d = o[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Nt(
      d,
      e,
      6,
      s
    );
  }
}
const Su = /* @__PURE__ */ new WeakMap();
function Rl(e, t, n = !1) {
  const o = n ? Su : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, l = !1;
  if (!K(e)) {
    const c = (d) => {
      const u = Rl(d, t, !0);
      u && (l = !0, ye(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !l ? (ee(e) && o.set(e, null), null) : (B(r) ? r.forEach((c) => i[c] = null) : ye(i, r), ee(e) && o.set(e, i), i);
}
function Zo(e, t) {
  return !e || !Zn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ne(e, t[0].toLowerCase() + t.slice(1)) || ne(e, qt(t)) || ne(e, t));
}
let Vs = !1;
function jo() {
  Vs = !0;
}
function Fr(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    propsOptions: [r],
    slots: i,
    attrs: l,
    emit: c,
    render: d,
    renderCache: u,
    props: a,
    data: p,
    setupState: g,
    ctx: O,
    inheritAttrs: b
  } = e, L = $o(e);
  let H, P;
  process.env.NODE_ENV !== "production" && (Vs = !1);
  try {
    if (n.shapeFlag & 4) {
      const $ = s || o, re = process.env.NODE_ENV !== "production" && g.__isScriptSetup ? new Proxy($, {
        get(j, Oe, fe) {
          return x(
            `Property '${String(
              Oe
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(j, Oe, fe);
        }
      }) : $;
      H = Xe(
        d.call(
          re,
          $,
          u,
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Et(a) : a,
          g,
          p,
          O
        )
      ), P = l;
    } else {
      const $ = t;
      process.env.NODE_ENV !== "production" && l === a && jo(), H = Xe(
        $.length > 1 ? $(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Et(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return jo(), /* @__PURE__ */ Et(l);
            },
            slots: i,
            emit: c
          } : { attrs: l, slots: i, emit: c }
        ) : $(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Et(a) : a,
          null
        )
      ), P = t.props ? l : Du(l);
    }
  } catch ($) {
    Gn.length = 0, oo($, e, 1), H = he(Be);
  }
  let M = H, oe;
  if (process.env.NODE_ENV !== "production" && H.patchFlag > 0 && H.patchFlag & 2048 && ([M, oe] = Pl(H)), P && b !== !1) {
    const $ = Object.keys(P), { shapeFlag: re } = M;
    if ($.length) {
      if (re & 7)
        r && $.some(xo) && (P = Vu(
          P,
          r
        )), M = Jt(M, P, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !Vs && M.type !== Be) {
        const j = Object.keys(l), Oe = [], fe = [];
        for (let k = 0, T = j.length; k < T; k++) {
          const Z = j[k];
          Zn(Z) ? xo(Z) || Oe.push(Z[2].toLowerCase() + Z.slice(3)) : fe.push(Z);
        }
        fe.length && x(
          `Extraneous non-props attributes (${fe.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), Oe.length && x(
          `Extraneous non-emits event listeners (${Oe.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !Hr(M) && x(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), M = Jt(M, null, !1, !0), M.dirs = M.dirs ? M.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Hr(M) && x(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), sr(M, n.transition)), process.env.NODE_ENV !== "production" && oe ? oe(M) : H = M, $o(L), H;
}
const Pl = (e) => {
  const t = e.children, n = e.dynamicChildren, o = cr(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Pl(o);
  } else return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Xe(o), i];
};
function cr(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if (fn(s)) {
      if (s.type !== Be || s.children === "v-if") {
        if (n)
          return;
        if (n = s, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return cr(n.children);
      }
    } else
      return;
  }
  return n;
}
const Du = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Zn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Vu = (e, t) => {
  const n = {};
  for (const o in e)
    (!xo(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, Hr = (e) => e.shapeFlag & 7 || e.type === Be;
function xu(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: c } = t, d = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && yt || t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return o ? Ur(o, i, d) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let a = 0; a < u.length; a++) {
        const p = u[a];
        if (Tl(i, o, p) && !Zo(d, p))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? Ur(o, i, d) : !0 : !!i;
  return !1;
}
function Ur(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (Tl(t, e, r) && !Zo(n, r))
      return !0;
  }
  return !1;
}
function Tl(e, t, n) {
  const o = e[n], s = t[n];
  return n === "style" && ee(o) && ee(s) ? !qs(o, s) : o !== s;
}
function Cu({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Il = {}, $l = () => Object.create(Il), kl = (e) => Object.getPrototypeOf(e) === Il;
function Au(e, t, n, o = !1) {
  const s = {}, r = $l();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ml(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && Ll(t || {}, s, e), n ? e.props = o ? s : /* @__PURE__ */ ll(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function Ru(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function Pu(e, t, n, o) {
  const {
    props: s,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = /* @__PURE__ */ q(s), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && Ru(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let a = 0; a < u.length; a++) {
        let p = u[a];
        if (Zo(e.emitsOptions, p))
          continue;
        const g = t[p];
        if (c)
          if (ne(r, p))
            g !== r[p] && (r[p] = g, d = !0);
          else {
            const O = Ue(p);
            s[O] = xs(
              c,
              l,
              O,
              g,
              e,
              !1
            );
          }
        else
          g !== r[p] && (r[p] = g, d = !0);
      }
    }
  } else {
    Ml(e, t, s, r) && (d = !0);
    let u;
    for (const a in l)
      (!t || // for camelCase
      !ne(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = qt(a)) === a || !ne(t, u))) && (c ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[u] !== void 0) && (s[a] = xs(
        c,
        l,
        a,
        void 0,
        e,
        !0
      )) : delete s[a]);
    if (r !== l)
      for (const a in r)
        (!t || !ne(t, a)) && (delete r[a], d = !0);
  }
  d && vt(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Ll(t || {}, s, e);
}
function Ml(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Fn(c))
        continue;
      const d = t[c];
      let u;
      s && ne(s, u = Ue(c)) ? !r || !r.includes(u) ? n[u] = d : (l || (l = {}))[u] = d : Zo(e.emitsOptions, c) || (!(c in o) || d !== o[c]) && (o[c] = d, i = !0);
    }
  if (r) {
    const c = /* @__PURE__ */ q(n), d = l || ce;
    for (let u = 0; u < r.length; u++) {
      const a = r[u];
      n[a] = xs(
        s,
        c,
        a,
        d[a],
        e,
        !ne(d, a)
      );
    }
  }
  return i;
}
function xs(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const l = ne(i, "default");
    if (l && o === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && K(c)) {
        const { propsDefaults: d } = s;
        if (n in d)
          o = d[n];
        else {
          const u = io(s);
          o = d[n] = c.call(
            null,
            t
          ), u();
        }
      } else
        o = c;
      s.ce && s.ce._setProp(n, o);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !l ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === qt(n)) && (o = !0));
  }
  return o;
}
const Tu = /* @__PURE__ */ new WeakMap();
function jl(e, t, n = !1) {
  const o = n ? Tu : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, l = [];
  let c = !1;
  if (!K(e)) {
    const u = (a) => {
      c = !0;
      const [p, g] = jl(a, t, !0);
      ye(i, p), g && l.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!r && !c)
    return ee(e) && o.set(e, bn), bn;
  if (B(r))
    for (let u = 0; u < r.length; u++) {
      process.env.NODE_ENV !== "production" && !_e(r[u]) && x("props must be strings when using array syntax.", r[u]);
      const a = Ue(r[u]);
      Br(a) && (i[a] = ce);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !ee(r) && x("invalid props options", r);
    for (const u in r) {
      const a = Ue(u);
      if (Br(a)) {
        const p = r[u], g = i[a] = B(p) || K(p) ? { type: p } : ye({}, p), O = g.type;
        let b = !1, L = !0;
        if (B(O))
          for (let H = 0; H < O.length; ++H) {
            const P = O[H], M = K(P) && P.name;
            if (M === "Boolean") {
              b = !0;
              break;
            } else M === "String" && (L = !1);
          }
        else
          b = K(O) && O.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = b, g[
          1
          /* shouldCastTrue */
        ] = L, (b || ne(g, "default")) && l.push(a);
      }
    }
  }
  const d = [i, l];
  return ee(e) && o.set(e, d), d;
}
function Br(e) {
  return e[0] !== "$" && !Fn(e) ? !0 : (process.env.NODE_ENV !== "production" && x(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Iu(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Ll(e, t, n) {
  const o = /* @__PURE__ */ q(t), s = n.propsOptions[0], r = Object.keys(e).map((i) => Ue(i));
  for (const i in s) {
    let l = s[i];
    l != null && $u(
      i,
      o[i],
      l,
      process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Et(o) : o,
      !r.includes(i)
    );
  }
}
function $u(e, t, n, o, s) {
  const { type: r, required: i, validator: l, skipCheck: c } = n;
  if (i && s) {
    x('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (r != null && r !== !0 && !c) {
      let d = !1;
      const u = B(r) ? r : [r], a = [];
      for (let p = 0; p < u.length && !d; p++) {
        const { valid: g, expectedType: O } = Mu(t, u[p]);
        a.push(O || ""), d = g;
      }
      if (!d) {
        x(ju(e, t, a));
        return;
      }
    }
    l && !l(t, o) && x('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const ku = /* @__PURE__ */ Pt(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Mu(e, t) {
  let n;
  const o = Iu(t);
  if (o === "null")
    n = e === null;
  else if (ku(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else o === "Object" ? n = ee(e) : o === "Array" ? n = B(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function ju(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Ko).join(" | ")}`;
  const s = n[0], r = Ks(t), i = Gr(t, s), l = Gr(t, r);
  return n.length === 1 && Wr(s) && !Lu(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, Wr(r) && (o += `with value ${l}.`), o;
}
function Gr(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Wr(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Lu(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const ar = (e) => e === "_" || e === "_ctx" || e === "$stable", ur = (e) => B(e) ? e.map(Xe) : [Xe(e)], Fu = (e, t, n) => {
  if (t._n)
    return t;
  const o = et((...s) => (process.env.NODE_ENV !== "production" && De && !(n === null && Ae) && !(n && n.root !== De.root) && x(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), ur(t(...s))), n);
  return o._c = !1, o;
}, Fl = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (ar(s)) continue;
    const r = e[s];
    if (K(r))
      t[s] = Fu(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && x(
        `Non-function value encountered for slot "${s}". Prefer function slots for better performance.`
      );
      const i = ur(r);
      t[s] = () => i;
    }
  }
}, Hl = (e, t) => {
  process.env.NODE_ENV !== "production" && !rr(e.vnode) && x(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = ur(t);
  e.slots.default = () => n;
}, Cs = (e, t, n) => {
  for (const o in t)
    (n || !ar(o)) && (e[o] = t[o]);
}, Hu = (e, t, n) => {
  const o = e.slots = $l();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Cs(o, t, n), n && Co(o, "_", s, !0)) : Fl(t, o);
  } else t && Hl(e, t);
}, Uu = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = ce;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && yt ? (Cs(s, t, n), vt(e, "set", "$slots")) : n && l === 1 ? r = !1 : Cs(s, t, n) : (r = !t.$stable, Fl(t, s)), i = t;
  } else t && (Hl(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !ar(l) && i[l] == null && delete s[l];
};
let Tn, Vt;
function hn(e, t) {
  e.appContext.config.performance && Lo() && Vt.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && Ba(e, t, Lo() ? Vt.now() : Date.now());
}
function gn(e, t) {
  if (e.appContext.config.performance && Lo()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", s = `<${lo(e, e.type)}> ${t}`;
    Vt.mark(o), Vt.measure(s, n, o), Vt.clearMeasures(s), Vt.clearMarks(n), Vt.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && Ga(e, t, Lo() ? Vt.now() : Date.now());
}
function Lo() {
  return Tn !== void 0 || (typeof window < "u" && window.performance ? (Tn = !0, Vt = window.performance) : Tn = !1), Tn;
}
function Bu() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const He = qu;
function Gu(e) {
  return Wu(e);
}
function Wu(e, t) {
  Bu();
  const n = to();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && tr(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: s,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: c,
    setText: d,
    setElementText: u,
    parentNode: a,
    nextSibling: p,
    setScopeId: g = xe,
    insertStaticContent: O
  } = e, b = (f, h, m, E = null, v = null, y = null, C = void 0, V = null, D = process.env.NODE_ENV !== "production" && yt ? !1 : !!h.dynamicChildren) => {
    if (f === h)
      return;
    f && !In(f, h) && (E = I(f), ze(f, v, y, !0), f = null), h.patchFlag === -2 && (D = !1, h.dynamicChildren = null);
    const { type: N, ref: W, shapeFlag: A } = h;
    switch (N) {
      case ro:
        L(f, h, m, E);
        break;
      case Be:
        H(f, h, m, E);
        break;
      case bo:
        f == null ? P(h, m, E, C) : process.env.NODE_ENV !== "production" && M(f, h, m, C);
        break;
      case be:
        ge(
          f,
          h,
          m,
          E,
          v,
          y,
          C,
          V,
          D
        );
        break;
      default:
        A & 1 ? re(
          f,
          h,
          m,
          E,
          v,
          y,
          C,
          V,
          D
        ) : A & 6 ? at(
          f,
          h,
          m,
          E,
          v,
          y,
          C,
          V,
          D
        ) : A & 64 || A & 128 ? N.process(
          f,
          h,
          m,
          E,
          v,
          y,
          C,
          V,
          D,
          z
        ) : process.env.NODE_ENV !== "production" && x("Invalid VNode type:", N, `(${typeof N})`);
    }
    W != null && v ? Bn(W, f && f.ref, y, h || f, !h) : W == null && f && f.ref != null && Bn(f.ref, null, y, f, !0);
  }, L = (f, h, m, E) => {
    if (f == null)
      o(
        h.el = l(h.children),
        m,
        E
      );
    else {
      const v = h.el = f.el;
      h.children !== f.children && d(v, h.children);
    }
  }, H = (f, h, m, E) => {
    f == null ? o(
      h.el = c(h.children || ""),
      m,
      E
    ) : h.el = f.el;
  }, P = (f, h, m, E) => {
    [f.el, f.anchor] = O(
      f.children,
      h,
      m,
      E,
      f.el,
      f.anchor
    );
  }, M = (f, h, m, E) => {
    if (h.children !== f.children) {
      const v = p(f.anchor);
      $(f), [h.el, h.anchor] = O(
        h.children,
        m,
        v,
        E
      );
    } else
      h.el = f.el, h.anchor = f.anchor;
  }, oe = ({ el: f, anchor: h }, m, E) => {
    let v;
    for (; f && f !== h; )
      v = p(f), o(f, m, E), f = v;
    o(h, m, E);
  }, $ = ({ el: f, anchor: h }) => {
    let m;
    for (; f && f !== h; )
      m = p(f), s(f), f = m;
    s(h);
  }, re = (f, h, m, E, v, y, C, V, D) => {
    if (h.type === "svg" ? C = "svg" : h.type === "math" && (C = "mathml"), f == null)
      j(
        h,
        m,
        E,
        v,
        y,
        C,
        V,
        D
      );
    else {
      const N = f.el && f.el._isVueCE ? f.el : null;
      try {
        N && N._beginPatch(), k(
          f,
          h,
          v,
          y,
          C,
          V,
          D
        );
      } finally {
        N && N._endPatch();
      }
    }
  }, j = (f, h, m, E, v, y, C, V) => {
    let D, N;
    const { props: W, shapeFlag: A, transition: U, dirs: Y } = f;
    if (D = f.el = i(
      f.type,
      y,
      W && W.is,
      W
    ), A & 8 ? u(D, f.children) : A & 16 && fe(
      f.children,
      D,
      null,
      E,
      v,
      us(f, y),
      C,
      V
    ), Y && Xt(f, null, E, "created"), Oe(D, f, f.scopeId, C, E), W) {
      for (const de in W)
        de !== "value" && !Fn(de) && r(D, de, null, W[de], y, E);
      "value" in W && r(D, "value", null, W.value, y), (N = W.onVnodeBeforeMount) && ht(N, E, f);
    }
    process.env.NODE_ENV !== "production" && (Co(D, "__vnode", f, !0), Co(D, "__vueParentComponent", E, !0)), Y && Xt(f, null, E, "beforeMount");
    const te = Ku(v, U);
    te && U.beforeEnter(D), o(D, h, m), ((N = W && W.onVnodeMounted) || te || Y) && He(() => {
      N && ht(N, E, f), te && U.enter(D), Y && Xt(f, null, E, "mounted");
    }, v);
  }, Oe = (f, h, m, E, v) => {
    if (m && g(f, m), E)
      for (let y = 0; y < E.length; y++)
        g(f, E[y]);
    if (v) {
      let y = v.subTree;
      if (process.env.NODE_ENV !== "production" && y.patchFlag > 0 && y.patchFlag & 2048 && (y = cr(y.children) || y), h === y || Gl(y.type) && (y.ssContent === h || y.ssFallback === h)) {
        const C = v.vnode;
        Oe(
          f,
          C,
          C.scopeId,
          C.slotScopeIds,
          v.parent
        );
      }
    }
  }, fe = (f, h, m, E, v, y, C, V, D = 0) => {
    for (let N = D; N < f.length; N++) {
      const W = f[N] = V ? xt(f[N]) : Xe(f[N]);
      b(
        null,
        W,
        h,
        m,
        E,
        v,
        y,
        C,
        V
      );
    }
  }, k = (f, h, m, E, v, y, C) => {
    const V = h.el = f.el;
    process.env.NODE_ENV !== "production" && (V.__vnode = h);
    let { patchFlag: D, dynamicChildren: N, dirs: W } = h;
    D |= f.patchFlag & 16;
    const A = f.props || ce, U = h.props || ce;
    let Y;
    if (m && Zt(m, !1), (Y = U.onVnodeBeforeUpdate) && ht(Y, m, h, f), W && Xt(h, f, m, "beforeUpdate"), m && Zt(m, !0), process.env.NODE_ENV !== "production" && yt && (D = 0, C = !1, N = null), (A.innerHTML && U.innerHTML == null || A.textContent && U.textContent == null) && u(V, ""), N ? (T(
      f.dynamicChildren,
      N,
      V,
      m,
      E,
      us(h, v),
      y
    ), process.env.NODE_ENV !== "production" && yo(f, h)) : C || pe(
      f,
      h,
      V,
      null,
      m,
      E,
      us(h, v),
      y,
      !1
    ), D > 0) {
      if (D & 16)
        Z(V, A, U, m, v);
      else if (D & 2 && A.class !== U.class && r(V, "class", null, U.class, v), D & 4 && r(V, "style", A.style, U.style, v), D & 8) {
        const te = h.dynamicProps;
        for (let de = 0; de < te.length; de++) {
          const le = te[de], Le = A[le], Fe = U[le];
          (Fe !== Le || le === "value") && r(V, le, Le, Fe, v, m);
        }
      }
      D & 1 && f.children !== h.children && u(V, h.children);
    } else !C && N == null && Z(V, A, U, m, v);
    ((Y = U.onVnodeUpdated) || W) && He(() => {
      Y && ht(Y, m, h, f), W && Xt(h, f, m, "updated");
    }, E);
  }, T = (f, h, m, E, v, y, C) => {
    for (let V = 0; V < h.length; V++) {
      const D = f[V], N = h[V], W = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        D.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (D.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !In(D, N) || // - In the case of a component, it could contain anything.
        D.shapeFlag & 198) ? a(D.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      b(
        D,
        N,
        W,
        null,
        E,
        v,
        y,
        C,
        !0
      );
    }
  }, Z = (f, h, m, E, v) => {
    if (h !== m) {
      if (h !== ce)
        for (const y in h)
          !Fn(y) && !(y in m) && r(
            f,
            y,
            h[y],
            null,
            v,
            E
          );
      for (const y in m) {
        if (Fn(y)) continue;
        const C = m[y], V = h[y];
        C !== V && y !== "value" && r(f, y, V, C, v, E);
      }
      "value" in m && r(f, "value", h.value, m.value, v);
    }
  }, ge = (f, h, m, E, v, y, C, V, D) => {
    const N = h.el = f ? f.el : l(""), W = h.anchor = f ? f.anchor : l("");
    let { patchFlag: A, dynamicChildren: U, slotScopeIds: Y } = h;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (yt || A & 2048) && (A = 0, D = !1, U = null), Y && (V = V ? V.concat(Y) : Y), f == null ? (o(N, m, E), o(W, m, E), fe(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      m,
      W,
      v,
      y,
      C,
      V,
      D
    )) : A > 0 && A & 64 && U && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === U.length ? (T(
      f.dynamicChildren,
      U,
      m,
      v,
      y,
      C,
      V
    ), process.env.NODE_ENV !== "production" ? yo(f, h) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (h.key != null || v && h === v.subTree) && yo(
        f,
        h,
        !0
        /* shallow */
      )
    )) : pe(
      f,
      h,
      m,
      W,
      v,
      y,
      C,
      V,
      D
    );
  }, at = (f, h, m, E, v, y, C, V, D) => {
    h.slotScopeIds = V, f == null ? h.shapeFlag & 512 ? v.ctx.activate(
      h,
      m,
      E,
      C,
      D
    ) : Re(
      h,
      m,
      E,
      v,
      y,
      C,
      D
    ) : we(f, h, D);
  }, Re = (f, h, m, E, v, y, C) => {
    const V = f.component = tf(
      f,
      E,
      v
    );
    if (process.env.NODE_ENV !== "production" && V.type.__hmrId && Ia(V), process.env.NODE_ENV !== "production" && (go(f), hn(V, "mount")), rr(f) && (V.ctx.renderer = z), process.env.NODE_ENV !== "production" && hn(V, "init"), of(V, !1, C), process.env.NODE_ENV !== "production" && gn(V, "init"), process.env.NODE_ENV !== "production" && yt && (f.el = null), V.asyncDep) {
      if (v && v.registerDep(V, Q, C), !f.el) {
        const D = V.subTree = he(Be);
        H(null, D, h, m), f.placeholder = D.el;
      }
    } else
      Q(
        V,
        f,
        h,
        m,
        v,
        y,
        C
      );
    process.env.NODE_ENV !== "production" && (mo(), gn(V, "mount"));
  }, we = (f, h, m) => {
    const E = h.component = f.component;
    if (xu(f, h, m))
      if (E.asyncDep && !E.asyncResolved) {
        process.env.NODE_ENV !== "production" && go(h), J(E, h, m), process.env.NODE_ENV !== "production" && mo();
        return;
      } else
        E.next = h, E.update();
    else
      h.el = f.el, E.vnode = h;
  }, Q = (f, h, m, E, v, y, C) => {
    const V = () => {
      if (f.isMounted) {
        let { next: A, bu: U, u: Y, parent: te, vnode: de } = f;
        {
          const dt = Ul(f);
          if (dt) {
            A && (A.el = de.el, J(f, A, C)), dt.asyncDep.then(() => {
              He(() => {
                f.isUnmounted || N();
              }, v);
            });
            return;
          }
        }
        let le = A, Le;
        process.env.NODE_ENV !== "production" && go(A || f.vnode), Zt(f, !1), A ? (A.el = de.el, J(f, A, C)) : A = de, U && Rn(U), (Le = A.props && A.props.onVnodeBeforeUpdate) && ht(Le, te, A, de), Zt(f, !0), process.env.NODE_ENV !== "production" && hn(f, "render");
        const Fe = Fr(f);
        process.env.NODE_ENV !== "production" && gn(f, "render");
        const ft = f.subTree;
        f.subTree = Fe, process.env.NODE_ENV !== "production" && hn(f, "patch"), b(
          ft,
          Fe,
          // parent may have changed if it's in a teleport
          a(ft.el),
          // anchor may have changed if it's in a fragment
          I(ft),
          f,
          v,
          y
        ), process.env.NODE_ENV !== "production" && gn(f, "patch"), A.el = Fe.el, le === null && Cu(f, Fe.el), Y && He(Y, v), (Le = A.props && A.props.onVnodeUpdated) && He(
          () => ht(Le, te, A, de),
          v
        ), process.env.NODE_ENV !== "production" && vl(f), process.env.NODE_ENV !== "production" && mo();
      } else {
        let A;
        const { el: U, props: Y } = h, { bm: te, m: de, parent: le, root: Le, type: Fe } = f, ft = On(h);
        Zt(f, !1), te && Rn(te), !ft && (A = Y && Y.onVnodeBeforeMount) && ht(A, le, h), Zt(f, !0);
        {
          Le.ce && Le.ce._hasShadowRoot() && Le.ce._injectChildStyle(
            Fe,
            f.parent ? f.parent.type : void 0
          ), process.env.NODE_ENV !== "production" && hn(f, "render");
          const dt = f.subTree = Fr(f);
          process.env.NODE_ENV !== "production" && gn(f, "render"), process.env.NODE_ENV !== "production" && hn(f, "patch"), b(
            null,
            dt,
            m,
            E,
            f,
            v,
            y
          ), process.env.NODE_ENV !== "production" && gn(f, "patch"), h.el = dt.el;
        }
        if (de && He(de, v), !ft && (A = Y && Y.onVnodeMounted)) {
          const dt = h;
          He(
            () => ht(A, le, dt),
            v
          );
        }
        (h.shapeFlag & 256 || le && On(le.vnode) && le.vnode.shapeFlag & 256) && f.a && He(f.a, v), f.isMounted = !0, process.env.NODE_ENV !== "production" && Fa(f), h = m = E = null;
      }
    };
    f.scope.on();
    const D = f.effect = new Wi(V);
    f.scope.off();
    const N = f.update = D.run.bind(D), W = f.job = D.runIfDirty.bind(D);
    W.i = f, W.id = f.uid, D.scheduler = () => Qo(W), Zt(f, !0), process.env.NODE_ENV !== "production" && (D.onTrack = f.rtc ? (A) => Rn(f.rtc, A) : void 0, D.onTrigger = f.rtg ? (A) => Rn(f.rtg, A) : void 0), N();
  }, J = (f, h, m) => {
    h.component = f;
    const E = f.vnode.props;
    f.vnode = h, f.next = null, Pu(f, h.props, E, m), Uu(f, h.children, m), rt(), Ar(f), it();
  }, pe = (f, h, m, E, v, y, C, V, D = !1) => {
    const N = f && f.children, W = f ? f.shapeFlag : 0, A = h.children, { patchFlag: U, shapeFlag: Y } = h;
    if (U > 0) {
      if (U & 128) {
        $t(
          N,
          A,
          m,
          E,
          v,
          y,
          C,
          V,
          D
        );
        return;
      } else if (U & 256) {
        Qt(
          N,
          A,
          m,
          E,
          v,
          y,
          C,
          V,
          D
        );
        return;
      }
    }
    Y & 8 ? (W & 16 && _(N, v, y), A !== N && u(m, A)) : W & 16 ? Y & 16 ? $t(
      N,
      A,
      m,
      E,
      v,
      y,
      C,
      V,
      D
    ) : _(N, v, y, !0) : (W & 8 && u(m, ""), Y & 16 && fe(
      A,
      m,
      E,
      v,
      y,
      C,
      V,
      D
    ));
  }, Qt = (f, h, m, E, v, y, C, V, D) => {
    f = f || bn, h = h || bn;
    const N = f.length, W = h.length, A = Math.min(N, W);
    let U;
    for (U = 0; U < A; U++) {
      const Y = h[U] = D ? xt(h[U]) : Xe(h[U]);
      b(
        f[U],
        Y,
        m,
        null,
        v,
        y,
        C,
        V,
        D
      );
    }
    N > W ? _(
      f,
      v,
      y,
      !0,
      !1,
      A
    ) : fe(
      h,
      m,
      E,
      v,
      y,
      C,
      V,
      D,
      A
    );
  }, $t = (f, h, m, E, v, y, C, V, D) => {
    let N = 0;
    const W = h.length;
    let A = f.length - 1, U = W - 1;
    for (; N <= A && N <= U; ) {
      const Y = f[N], te = h[N] = D ? xt(h[N]) : Xe(h[N]);
      if (In(Y, te))
        b(
          Y,
          te,
          m,
          null,
          v,
          y,
          C,
          V,
          D
        );
      else
        break;
      N++;
    }
    for (; N <= A && N <= U; ) {
      const Y = f[A], te = h[U] = D ? xt(h[U]) : Xe(h[U]);
      if (In(Y, te))
        b(
          Y,
          te,
          m,
          null,
          v,
          y,
          C,
          V,
          D
        );
      else
        break;
      A--, U--;
    }
    if (N > A) {
      if (N <= U) {
        const Y = U + 1, te = Y < W ? h[Y].el : E;
        for (; N <= U; )
          b(
            null,
            h[N] = D ? xt(h[N]) : Xe(h[N]),
            m,
            te,
            v,
            y,
            C,
            V,
            D
          ), N++;
      }
    } else if (N > U)
      for (; N <= A; )
        ze(f[N], v, y, !0), N++;
    else {
      const Y = N, te = N, de = /* @__PURE__ */ new Map();
      for (N = te; N <= U; N++) {
        const $e = h[N] = D ? xt(h[N]) : Xe(h[N]);
        $e.key != null && (process.env.NODE_ENV !== "production" && de.has($e.key) && x(
          "Duplicate keys found during update:",
          JSON.stringify($e.key),
          "Make sure keys are unique."
        ), de.set($e.key, N));
      }
      let le, Le = 0;
      const Fe = U - te + 1;
      let ft = !1, dt = 0;
      const An = new Array(Fe);
      for (N = 0; N < Fe; N++) An[N] = 0;
      for (N = Y; N <= A; N++) {
        const $e = f[N];
        if (Le >= Fe) {
          ze($e, v, y, !0);
          continue;
        }
        let pt;
        if ($e.key != null)
          pt = de.get($e.key);
        else
          for (le = te; le <= U; le++)
            if (An[le - te] === 0 && In($e, h[le])) {
              pt = le;
              break;
            }
        pt === void 0 ? ze($e, v, y, !0) : (An[pt - te] = N + 1, pt >= dt ? dt = pt : ft = !0, b(
          $e,
          h[pt],
          m,
          null,
          v,
          y,
          C,
          V,
          D
        ), Le++);
      }
      const br = ft ? zu(An) : bn;
      for (le = br.length - 1, N = Fe - 1; N >= 0; N--) {
        const $e = te + N, pt = h[$e], Nr = h[$e + 1], Or = $e + 1 < W ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Nr.el || Bl(Nr)
        ) : E;
        An[N] === 0 ? b(
          null,
          pt,
          m,
          Or,
          v,
          y,
          C,
          V,
          D
        ) : ft && (le < 0 || N !== br[le] ? ut(pt, m, Or, 2) : le--);
      }
    }
  }, ut = (f, h, m, E, v = null) => {
    const { el: y, type: C, transition: V, children: D, shapeFlag: N } = f;
    if (N & 6) {
      ut(f.component.subTree, h, m, E);
      return;
    }
    if (N & 128) {
      f.suspense.move(h, m, E);
      return;
    }
    if (N & 64) {
      C.move(f, h, m, z);
      return;
    }
    if (C === be) {
      o(y, h, m);
      for (let A = 0; A < D.length; A++)
        ut(D[A], h, m, E);
      o(f.anchor, h, m);
      return;
    }
    if (C === bo) {
      oe(f, h, m);
      return;
    }
    if (E !== 2 && N & 1 && V)
      if (E === 0)
        V.beforeEnter(y), o(y, h, m), He(() => V.enter(y), v);
      else {
        const { leave: A, delayLeave: U, afterLeave: Y } = V, te = () => {
          f.ctx.isUnmounted ? s(y) : o(y, h, m);
        }, de = () => {
          y._isLeaving && y[Za](
            !0
            /* cancelled */
          ), A(y, () => {
            te(), Y && Y();
          });
        };
        U ? U(y, te, de) : de();
      }
    else
      o(y, h, m);
  }, ze = (f, h, m, E = !1, v = !1) => {
    const {
      type: y,
      props: C,
      ref: V,
      children: D,
      dynamicChildren: N,
      shapeFlag: W,
      patchFlag: A,
      dirs: U,
      cacheIndex: Y
    } = f;
    if (A === -2 && (v = !1), V != null && (rt(), Bn(V, null, m, f, !0), it()), Y != null && (h.renderCache[Y] = void 0), W & 256) {
      h.ctx.deactivate(f);
      return;
    }
    const te = W & 1 && U, de = !On(f);
    let le;
    if (de && (le = C && C.onVnodeBeforeUnmount) && ht(le, h, f), W & 6)
      jt(f.component, m, E);
    else {
      if (W & 128) {
        f.suspense.unmount(m, E);
        return;
      }
      te && Xt(f, null, h, "beforeUnmount"), W & 64 ? f.type.remove(
        f,
        h,
        m,
        z,
        E
      ) : N && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !N.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== be || A > 0 && A & 64) ? _(
        N,
        h,
        m,
        !1,
        !0
      ) : (y === be && A & 384 || !v && W & 16) && _(D, h, m), E && kt(f);
    }
    (de && (le = C && C.onVnodeUnmounted) || te) && He(() => {
      le && ht(le, h, f), te && Xt(f, null, h, "unmounted");
    }, m);
  }, kt = (f) => {
    const { type: h, el: m, anchor: E, transition: v } = f;
    if (h === be) {
      process.env.NODE_ENV !== "production" && f.patchFlag > 0 && f.patchFlag & 2048 && v && !v.persisted ? f.children.forEach((C) => {
        C.type === Be ? s(C.el) : kt(C);
      }) : Mt(m, E);
      return;
    }
    if (h === bo) {
      $(f);
      return;
    }
    const y = () => {
      s(m), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (f.shapeFlag & 1 && v && !v.persisted) {
      const { leave: C, delayLeave: V } = v, D = () => C(m, y);
      V ? V(f.el, y, D) : D();
    } else
      y();
  }, Mt = (f, h) => {
    let m;
    for (; f !== h; )
      m = p(f), s(f), f = m;
    s(h);
  }, jt = (f, h, m) => {
    process.env.NODE_ENV !== "production" && f.type.__hmrId && $a(f);
    const { bum: E, scope: v, job: y, subTree: C, um: V, m: D, a: N } = f;
    Kr(D), Kr(N), E && Rn(E), v.stop(), y && (y.flags |= 8, ze(C, f, h, m)), V && He(V, h), He(() => {
      f.isUnmounted = !0;
    }, h), process.env.NODE_ENV !== "production" && Ua(f);
  }, _ = (f, h, m, E = !1, v = !1, y = 0) => {
    for (let C = y; C < f.length; C++)
      ze(f[C], h, m, E, v);
  }, I = (f) => {
    if (f.shapeFlag & 6)
      return I(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const h = p(f.anchor || f.el), m = h && h[Qa];
    return m ? p(m) : h;
  };
  let R = !1;
  const G = (f, h, m) => {
    let E;
    f == null ? h._vnode && (ze(h._vnode, null, null, !0), E = h._vnode.component) : b(
      h._vnode || null,
      f,
      h,
      null,
      null,
      null,
      m
    ), h._vnode = f, R || (R = !0, Ar(E), gl(), R = !1);
  }, z = {
    p: b,
    um: ze,
    m: ut,
    r: kt,
    mt: Re,
    mc: fe,
    pc: pe,
    pbc: T,
    n: I,
    o: e
  };
  return {
    render: G,
    hydrate: void 0,
    createApp: Nu(G)
  };
}
function us({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Zt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ku(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function yo(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (B(o) && B(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = xt(s[r]), l.el = i.el), !n && l.patchFlag !== -2 && yo(i, l)), l.type === ro && (l.patchFlag === -1 && (l = s[r] = xt(l)), l.el = i.el), l.type === Be && !l.el && (l.el = i.el), process.env.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
    }
}
function zu(e) {
  const t = e.slice(), n = [0];
  let o, s, r, i, l;
  const c = e.length;
  for (o = 0; o < c; o++) {
    const d = e[o];
    if (d !== 0) {
      if (s = n[n.length - 1], e[s] < d) {
        t[o] = s, n.push(o);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        l = r + i >> 1, e[n[l]] < d ? r = l + 1 : i = l;
      d < e[n[r]] && (r > 0 && (t[o] = n[r - 1]), n[r] = o);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
function Ul(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ul(t);
}
function Kr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Bl(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Bl(t.subTree) : null;
}
const Gl = (e) => e.__isSuspense;
function qu(e, t) {
  t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : hl(e);
}
const be = /* @__PURE__ */ Symbol.for("v-fgt"), ro = /* @__PURE__ */ Symbol.for("v-txt"), Be = /* @__PURE__ */ Symbol.for("v-cmt"), bo = /* @__PURE__ */ Symbol.for("v-stc"), Gn = [];
let Ge = null;
function ae(e = !1) {
  Gn.push(Ge = e ? null : []);
}
function Ju() {
  Gn.pop(), Ge = Gn[Gn.length - 1] || null;
}
let Jn = 1;
function Fo(e, t = !1) {
  Jn += e, e < 0 && Ge && t && (Ge.hasOnce = !0);
}
function Wl(e) {
  return e.dynamicChildren = Jn > 0 ? Ge || bn : null, Ju(), Jn > 0 && Ge && Ge.push(e), e;
}
function me(e, t, n, o, s, r) {
  return Wl(
    S(
      e,
      t,
      n,
      o,
      s,
      r,
      !0
    )
  );
}
function Yn(e, t, n, o, s) {
  return Wl(
    he(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function fn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function In(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = _o.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Yu = (...e) => zl(
  ...e
), Kl = ({ key: e }) => e ?? null, No = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? _e(e) || /* @__PURE__ */ ue(e) || K(e) ? { i: Ae, r: e, k: t, f: !!n } : e : null);
function S(e, t = null, n = null, o = 0, s = null, r = e === be ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Kl(t),
    ref: t && No(t),
    scopeId: yl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Ae
  };
  return l ? (dr(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= _e(n) ? 8 : 16), process.env.NODE_ENV !== "production" && c.key !== c.key && x("VNode created with invalid key (NaN). VNode type:", c.type), Jn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ge && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ge.push(c), c;
}
const he = process.env.NODE_ENV !== "production" ? Yu : zl;
function zl(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === fu) && (process.env.NODE_ENV !== "production" && !e && x(`Invalid vnode type when creating vnode: ${e}.`), e = Be), fn(e)) {
    const l = Jt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && dr(l, n), Jn > 0 && !r && Ge && (l.shapeFlag & 6 ? Ge[Ge.indexOf(e)] = l : Ge.push(l)), l.patchFlag = -2, l;
  }
  if (Xl(e) && (e = e.__vccOpts), t) {
    t = Qu(t);
    let { class: l, style: c } = t;
    l && !_e(l) && (t.class = zo(l)), ee(c) && (/* @__PURE__ */ wn(c) && !B(c) && (c = ye({}, c)), t.style = zs(c));
  }
  const i = _e(e) ? 1 : Gl(e) ? 128 : Xa(e) ? 64 : ee(e) ? 4 : K(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && /* @__PURE__ */ wn(e) && (e = /* @__PURE__ */ q(e), x(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), S(
    e,
    t,
    n,
    o,
    s,
    i,
    r,
    !0
  );
}
function Qu(e) {
  return e ? /* @__PURE__ */ wn(e) || kl(e) ? ye({}, e) : e : null;
}
function Jt(e, t, n = !1, o = !1) {
  const { props: s, ref: r, patchFlag: i, children: l, transition: c } = e, d = t ? Xu(s || {}, t) : s, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Kl(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? B(r) ? r.concat(No(t)) : [r, No(t)] : No(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && B(l) ? l.map(ql) : l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== be ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Jt(e.ssContent),
    ssFallback: e.ssFallback && Jt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && o && sr(
    u,
    c.clone(u)
  ), u;
}
function ql(e) {
  const t = Jt(e);
  return B(e.children) && (t.children = e.children.map(ql)), t;
}
function fr(e = " ", t = 0) {
  return he(ro, null, e, t);
}
function es(e = "", t = !1) {
  return t ? (ae(), Yn(Be, null, e)) : he(Be, null, e);
}
function Xe(e) {
  return e == null || typeof e == "boolean" ? he(Be) : B(e) ? he(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : fn(e) ? xt(e) : he(ro, null, String(e));
}
function xt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Jt(e);
}
function dr(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (B(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), dr(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !kl(t) ? t._ctx = Ae : s === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else K(t) ? (t = { default: t, _ctx: Ae }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [fr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Xu(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = zo([t.class, o.class]));
      else if (s === "style")
        t.style = zs([t.style, o.style]);
      else if (Zn(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(B(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function ht(e, t, n, o = null) {
  Nt(e, t, 7, [
    n,
    o
  ]);
}
const Zu = Al();
let ef = 0;
function tf(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || Zu, r = {
    uid: ef++,
    vnode: e,
    type: o,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ui(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: jl(o, s),
    emitsOptions: Rl(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ce,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: ce,
    data: ce,
    props: ce,
    attrs: ce,
    slots: ce,
    refs: ce,
    setupState: ce,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return process.env.NODE_ENV !== "production" ? r.ctx = du(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = wu.bind(null, r), e.ce && e.ce(r), r;
}
let De = null;
const Cn = () => De || Ae;
let Ho, As;
{
  const e = to(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (r) => {
      s.length > 1 ? s.forEach((i) => i(r)) : s[0](r);
    };
  };
  Ho = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => De = n
  ), As = t(
    "__VUE_SSR_SETTERS__",
    (n) => Qn = n
  );
}
const io = (e) => {
  const t = De;
  return Ho(e), e.scope.on(), () => {
    e.scope.off(), Ho(t);
  };
}, zr = () => {
  De && De.scope.off(), Ho(null);
}, nf = /* @__PURE__ */ Pt("slot,component");
function Rs(e, { isNativeTag: t }) {
  (nf(e) || t(e)) && x(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Jl(e) {
  return e.vnode.shapeFlag & 4;
}
let Qn = !1;
function of(e, t = !1, n = !1) {
  t && As(t);
  const { props: o, children: s } = e.vnode, r = Jl(e);
  Au(e, o, r, t), Hu(e, s, n || t);
  const i = r ? sf(e, t) : void 0;
  return t && As(!1), i;
}
function sf(e, t) {
  const n = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (n.name && Rs(n.name, e.appContext.config), n.components) {
      const s = Object.keys(n.components);
      for (let r = 0; r < s.length; r++)
        Rs(s[r], e.appContext.config);
    }
    if (n.directives) {
      const s = Object.keys(n.directives);
      for (let r = 0; r < s.length; r++)
        bl(s[r]);
    }
    n.compilerOptions && rf() && x(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Vl), process.env.NODE_ENV !== "production" && pu(e);
  const { setup: o } = n;
  if (o) {
    rt();
    const s = e.setupContext = o.length > 1 ? cf(e) : null, r = io(e), i = xn(
      o,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Et(e.props) : e.props,
        s
      ]
    ), l = Ws(i);
    if (it(), r(), (l || e.sp) && !On(e) && Ol(e), l) {
      if (i.then(zr, zr), t)
        return i.then((c) => {
          qr(e, c, t);
        }).catch((c) => {
          oo(c, e, 0);
        });
      if (e.asyncDep = i, process.env.NODE_ENV !== "production" && !e.suspense) {
        const c = lo(e, n);
        x(
          `Component <${c}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      qr(e, i, t);
  } else
    Yl(e, t);
}
function qr(e, t, n) {
  K(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ee(t) ? (process.env.NODE_ENV !== "production" && fn(t) && x(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = al(t), process.env.NODE_ENV !== "production" && hu(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && x(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Yl(e, n);
}
const rf = () => !0;
function Yl(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || xe);
  {
    const s = io(e);
    rt();
    try {
      mu(e);
    } finally {
      it(), s();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === xe && !t && (o.template ? x(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : x("Component is missing template or render function: ", o));
}
const Jr = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return jo(), Ve(e, "get", ""), e[t];
  },
  set() {
    return x("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return x("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return Ve(e, "get", ""), e[t];
  }
};
function lf(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return Ve(e, "get", "$slots"), t[n];
    }
  });
}
function cf(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && x("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && (B(n) ? o = "array" : /* @__PURE__ */ ue(n) && (o = "ref")), o !== "object" && x(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, o;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, Jr));
      },
      get slots() {
        return o || (o = lf(e));
      },
      get emit() {
        return (s, ...r) => e.emit(s, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, Jr),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function pr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(al(Bt(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in cn)
        return cn[n](e);
    },
    has(t, n) {
      return n in t || n in cn;
    }
  })) : e.proxy;
}
const af = /(?:^|[-_])\w/g, uf = (e) => e.replace(af, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ql(e, t = !0) {
  return K(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function lo(e, t, n = !1) {
  let o = Ql(t);
  if (!o && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (o = s[1]);
  }
  if (!o && e) {
    const s = (r) => {
      for (const i in r)
        if (r[i] === t)
          return i;
    };
    o = s(e.components) || e.parent && s(
      e.parent.type.components
    ) || s(e.appContext.components);
  }
  return o ? uf(o) : n ? "App" : "Anonymous";
}
function Xl(e) {
  return K(e) && "__vccOpts" in e;
}
const Ne = (e, t) => {
  const n = /* @__PURE__ */ wa(e, t, Qn);
  if (process.env.NODE_ENV !== "production") {
    const o = Cn();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Zl(e, t, n) {
  try {
    Fo(-1);
    const o = arguments.length;
    return o === 2 ? ee(t) && !B(t) ? fn(t) ? he(e, null, [t]) : he(e, t) : he(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && fn(n) && (n = [n]), he(e, t, n));
  } finally {
    Fo(1);
  }
}
function ff() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(a) {
      if (!ee(a))
        return null;
      if (a.__isVue)
        return ["div", e, "VueInstance"];
      if (/* @__PURE__ */ ue(a)) {
        rt();
        const p = a.value;
        return it(), [
          "div",
          {},
          ["span", e, u(a)],
          "<",
          l(p),
          ">"
        ];
      } else {
        if (/* @__PURE__ */ nt(a))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ Ie(a) ? "ShallowReactive" : "Reactive"],
            "<",
            l(a),
            `>${/* @__PURE__ */ lt(a) ? " (readonly)" : ""}`
          ];
        if (/* @__PURE__ */ lt(a))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ Ie(a) ? "ShallowReadonly" : "Readonly"],
            "<",
            l(a),
            ">"
          ];
      }
      return null;
    },
    hasBody(a) {
      return a && a.__isVue;
    },
    body(a) {
      if (a && a.__isVue)
        return [
          "div",
          {},
          ...r(a.$)
        ];
    }
  };
  function r(a) {
    const p = [];
    a.type.props && a.props && p.push(i("props", /* @__PURE__ */ q(a.props))), a.setupState !== ce && p.push(i("setup", a.setupState)), a.data !== ce && p.push(i("data", /* @__PURE__ */ q(a.data)));
    const g = c(a, "computed");
    g && p.push(i("computed", g));
    const O = c(a, "inject");
    return O && p.push(i("injected", O)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: a }]
    ]), p;
  }
  function i(a, p) {
    return p = ye({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        a
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((g) => [
          "div",
          {},
          ["span", o, g + ": "],
          l(p[g], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(a, p = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : ee(a) ? ["object", { object: p ? /* @__PURE__ */ q(a) : a }] : ["span", n, String(a)];
  }
  function c(a, p) {
    const g = a.type;
    if (K(g))
      return;
    const O = {};
    for (const b in a.ctx)
      d(g, b, p) && (O[b] = a.ctx[b]);
    return O;
  }
  function d(a, p, g) {
    const O = a[g];
    if (B(O) && O.includes(p) || ee(O) && p in O || a.extends && d(a.extends, p, g) || a.mixins && a.mixins.some((b) => d(b, p, g)))
      return !0;
  }
  function u(a) {
    return /* @__PURE__ */ Ie(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const Yr = "3.5.30", Rt = process.env.NODE_ENV !== "production" ? x : xe;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ps;
const Qr = typeof window < "u" && window.trustedTypes;
if (Qr)
  try {
    Ps = /* @__PURE__ */ Qr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Rt(`Error creating trusted types policy: ${e}`);
  }
const ec = Ps ? (e) => Ps.createHTML(e) : (e) => e, df = "http://www.w3.org/2000/svg", pf = "http://www.w3.org/1998/Math/MathML", Dt = typeof document < "u" ? document : null, Xr = Dt && /* @__PURE__ */ Dt.createElement("template"), hf = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Dt.createElementNS(df, e) : t === "mathml" ? Dt.createElementNS(pf, e) : n ? Dt.createElement(e, { is: n }) : Dt.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => Dt.createTextNode(e),
  createComment: (e) => Dt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Dt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, s, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (s && (s === r || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)); )
        ;
    else {
      Xr.innerHTML = ec(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Xr.content;
      if (o === "svg" || o === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, gf = /* @__PURE__ */ Symbol("_vtc");
function mf(e, t, n) {
  const o = e[gf];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Zr = /* @__PURE__ */ Symbol("_vod"), _f = /* @__PURE__ */ Symbol("_vsh"), vf = /* @__PURE__ */ Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Ef = /(?:^|;)\s*display\s*:/;
function yf(e, t, n) {
  const o = e.style, s = _e(n);
  let r = !1;
  if (n && !s) {
    if (t)
      if (_e(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && Oo(o, l, "");
        }
      else
        for (const i in t)
          n[i] == null && Oo(o, i, "");
    for (const i in n)
      i === "display" && (r = !0), Oo(o, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = o[vf];
      i && (n += ";" + i), o.cssText = n, r = Ef.test(n);
    }
  } else t && e.removeAttribute("style");
  Zr in e && (e[Zr] = r ? o.display : "", e[_f] && (o.display = "none"));
}
const bf = /[^\\];\s*$/, ei = /\s*!important$/;
function Oo(e, t, n) {
  if (B(n))
    n.forEach((o) => Oo(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && bf.test(n) && Rt(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Nf(e, t);
    ei.test(n) ? e.setProperty(
      qt(o),
      n.replace(ei, ""),
      "important"
    ) : e[o] = n;
  }
}
const ti = ["Webkit", "Moz", "ms"], fs = {};
function Nf(e, t) {
  const n = fs[t];
  if (n)
    return n;
  let o = Ue(t);
  if (o !== "filter" && o in e)
    return fs[t] = o;
  o = Ko(o);
  for (let s = 0; s < ti.length; s++) {
    const r = ti[s] + o;
    if (r in e)
      return fs[t] = r;
  }
  return t;
}
const ni = "http://www.w3.org/1999/xlink";
function oi(e, t, n, o, s, r = Yc(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ni, t.slice(6, t.length)) : e.setAttributeNS(ni, t, n) : n == null || r && !Li(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : st(n) ? String(n) : n
  );
}
function si(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? ec(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Li(n) : n == null && l === "string" ? (n = "", i = !0) : l === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    process.env.NODE_ENV !== "production" && !i && Rt(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  i && e.removeAttribute(s || t);
}
function Of(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function wf(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const ri = /* @__PURE__ */ Symbol("_vei");
function Sf(e, t, n, o, s = null) {
  const r = e[ri] || (e[ri] = {}), i = r[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? li(o, t) : o;
  else {
    const [l, c] = Df(t);
    if (o) {
      const d = r[t] = Cf(
        process.env.NODE_ENV !== "production" ? li(o, t) : o,
        s
      );
      Of(e, l, d, c);
    } else i && (wf(e, l, i, c), r[t] = void 0);
  }
}
const ii = /(?:Once|Passive|Capture)$/;
function Df(e) {
  let t;
  if (ii.test(e)) {
    t = {};
    let o;
    for (; o = e.match(ii); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : qt(e.slice(2)), t];
}
let ds = 0;
const Vf = /* @__PURE__ */ Promise.resolve(), xf = () => ds || (Vf.then(() => ds = 0), ds = Date.now());
function Cf(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    Nt(
      Af(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = xf(), n;
}
function li(e, t) {
  return K(e) || B(e) ? e : (Rt(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), xe);
}
function Af(e, t) {
  if (B(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (s) => !s._stopped && o && o(s)
    );
  } else
    return t;
}
const ci = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Rf = (e, t, n, o, s, r) => {
  const i = s === "svg";
  t === "class" ? mf(e, o, i) : t === "style" ? yf(e, n, o) : Zn(t) ? xo(t) || Sf(e, t, n, o, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Pf(e, t, o, i)) ? (si(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && oi(e, t, o, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Tf(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !_e(o))) ? si(e, Ue(t), o, r, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), oi(e, t, o, i));
};
function Pf(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ci(t) && K(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return ci(t) && _e(n) ? !1 : t in e;
}
function Tf(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const o = Ue(t);
  return Array.isArray(n) ? n.some((s) => Ue(s) === o) : Object.keys(n).some((s) => Ue(s) === o);
}
const If = /* @__PURE__ */ ye({ patchProp: Rf }, hf);
let ai;
function $f() {
  return ai || (ai = Gu(If));
}
const kf = (...e) => {
  const t = $f().createApp(...e);
  process.env.NODE_ENV !== "production" && (jf(t), Lf(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = Ff(o);
    if (!s) return;
    const r = t._component;
    !K(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const i = n(s, !1, Mf(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
};
function Mf(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function jf(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Kc(t) || zc(t) || qc(t),
    writable: !1
  });
}
function Lf(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        Rt(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return Rt(o), n;
      },
      set() {
        Rt(o);
      }
    });
  }
}
function Ff(e) {
  if (_e(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && Rt(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Rt(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
/**
* vue v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Hf() {
  ff();
}
process.env.NODE_ENV !== "production" && Hf();
function po(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function ps(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Uf() {
  return tc().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function tc() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Bf = typeof Proxy == "function", Gf = "devtools-plugin:setup", Wf = "plugin:settings:set";
let mn, Ts;
function Kf() {
  var e;
  return mn !== void 0 || (typeof window < "u" && window.performance ? (mn = !0, Ts = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (mn = !0, Ts = globalThis.perf_hooks.performance) : mn = !1), mn;
}
function zf() {
  return Kf() ? Ts.now() : Date.now();
}
let qf = class {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const i in t.settings) {
        const l = t.settings[i];
        o[i] = l.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${t.id}`;
    let r = Object.assign({}, o);
    try {
      const i = localStorage.getItem(s), l = JSON.parse(i);
      Object.assign(r, l);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(i) {
        try {
          localStorage.setItem(s, JSON.stringify(i));
        } catch {
        }
        r = i;
      },
      now() {
        return zf();
      }
    }, n && n.on(Wf, (i, l) => {
      i === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, l) => this.target ? this.target.on[l] : (...c) => {
        this.onQueue.push({
          method: l,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...c) => (this.targetQueue.push({
        method: l,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[l](...c)) : (...c) => new Promise((d) => {
        this.targetQueue.push({
          method: l,
          args: c,
          resolve: d
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
};
function nc(e, t) {
  const n = e, o = tc(), s = Uf(), r = Bf && n.enableEarlyProxy;
  if (s && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    s.emit(Gf, e, t);
  else {
    const i = r ? new qf(n, s) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Ln;
const Xn = (e) => Ln = e, oc = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function dn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var bt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(bt || (bt = {}));
const Gt = typeof window < "u", ui = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Jf(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function hr(e, t, n) {
  const o = new XMLHttpRequest();
  o.open("GET", e), o.responseType = "blob", o.onload = function() {
    ic(o.response, t, n);
  }, o.onerror = function() {
    console.error("could not download file");
  }, o.send();
}
function sc(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function wo(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const So = typeof navigator == "object" ? navigator : { userAgent: "" }, rc = /Macintosh/.test(So.userAgent) && /AppleWebKit/.test(So.userAgent) && !/Safari/.test(So.userAgent), ic = Gt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !rc ? Yf : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in So ? Qf : (
      // Fallback to using FileReader and a popup
      Xf
    )
  )
) : () => {
};
function Yf(e, t = "download", n) {
  const o = document.createElement("a");
  o.download = t, o.rel = "noopener", typeof e == "string" ? (o.href = e, o.origin !== location.origin ? sc(o.href) ? hr(e, t, n) : (o.target = "_blank", wo(o)) : wo(o)) : (o.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(o.href);
  }, 4e4), setTimeout(function() {
    wo(o);
  }, 0));
}
function Qf(e, t = "download", n) {
  if (typeof e == "string")
    if (sc(e))
      hr(e, t, n);
    else {
      const o = document.createElement("a");
      o.href = e, o.target = "_blank", setTimeout(function() {
        wo(o);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Jf(e, n), t);
}
function Xf(e, t, n, o) {
  if (o = o || open("", "_blank"), o && (o.document.title = o.document.body.innerText = "downloading..."), typeof e == "string")
    return hr(e, t, n);
  const s = e.type === "application/octet-stream", r = /constructor/i.test(String(ui.HTMLElement)) || "safari" in ui, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || s && r || rc) && typeof FileReader < "u") {
    const l = new FileReader();
    l.onloadend = function() {
      let c = l.result;
      if (typeof c != "string")
        throw o = null, new Error("Wrong reader.result type");
      c = i ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = c : location.assign(c), o = null;
    }, l.readAsDataURL(e);
  } else {
    const l = URL.createObjectURL(e);
    o ? o.location.assign(l) : location.href = l, o = null, setTimeout(function() {
      URL.revokeObjectURL(l);
    }, 4e4);
  }
}
function Ce(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function gr(e) {
  return "_a" in e && "install" in e;
}
function lc() {
  if (!("clipboard" in navigator))
    return Ce("Your browser doesn't support the Clipboard API", "error"), !0;
}
function cc(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Ce('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Zf(e) {
  if (!lc())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Ce("Global state copied to clipboard.");
    } catch (t) {
      if (cc(t))
        return;
      Ce("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function ed(e) {
  if (!lc())
    try {
      ac(e, JSON.parse(await navigator.clipboard.readText())), Ce("Global state pasted from clipboard.");
    } catch (t) {
      if (cc(t))
        return;
      Ce("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function td(e) {
  try {
    ic(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    Ce("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let wt;
function nd() {
  wt || (wt = document.createElement("input"), wt.type = "file", wt.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      wt.onchange = async () => {
        const o = wt.files;
        if (!o)
          return t(null);
        const s = o.item(0);
        return t(s ? { text: await s.text(), file: s } : null);
      }, wt.oncancel = () => t(null), wt.onerror = n, wt.click();
    });
  }
  return e;
}
async function od(e) {
  try {
    const n = await nd()();
    if (!n)
      return;
    const { text: o, file: s } = n;
    ac(e, JSON.parse(o)), Ce(`Global state imported from "${s.name}".`);
  } catch (t) {
    Ce("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function ac(e, t) {
  for (const n in t) {
    const o = e.state.value[n];
    o ? Object.assign(o, t[n]) : e.state.value[n] = t[n];
  }
}
function Qe(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const uc = "🍍 Pinia (root)", Do = "_root";
function sd(e) {
  return gr(e) ? {
    id: Do,
    label: uc
  } : {
    id: e.$id,
    label: e.$id
  };
}
function rd(e) {
  if (gr(e)) {
    const n = Array.from(e._s.keys()), o = e._s;
    return {
      state: n.map((r) => ({
        editable: !0,
        key: r,
        value: e.state.value[r]
      })),
      getters: n.filter((r) => o.get(r)._getters).map((r) => {
        const i = o.get(r);
        return {
          editable: !1,
          key: r,
          value: i._getters.reduce((l, c) => (l[c] = i[c], l), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function id(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: Qe(e.type),
    key: Qe(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function ld(e) {
  switch (e) {
    case bt.direct:
      return "mutation";
    case bt.patchFunction:
      return "$patch";
    case bt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let yn = !0;
const Vo = [], nn = "pinia:mutations", Te = "pinia", { assign: cd } = Object, Uo = (e) => "🍍 " + e;
function ad(e, t) {
  nc({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Vo,
    app: e
  }, (n) => {
    typeof n.now != "function" && Ce("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: nn,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: Te,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Zf(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await ed(t), n.sendInspectorTree(Te), n.sendInspectorState(Te);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            td(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await od(t), n.sendInspectorTree(Te), n.sendInspectorState(Te);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (o) => {
            const s = t._s.get(o);
            s ? typeof s.$reset != "function" ? Ce(`Cannot reset "${o}" store because it doesn't have a "$reset" method implemented.`, "warn") : (s.$reset(), Ce(`Store "${o}" reset.`)) : Ce(`Cannot reset "${o}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((o, s) => {
      const r = o.componentInstance && o.componentInstance.proxy;
      if (r && r._pStores) {
        const i = o.componentInstance.proxy._pStores;
        Object.values(i).forEach((l) => {
          o.instanceData.state.push({
            type: Uo(l.$id),
            key: "state",
            editable: !0,
            value: l._isOptionsAPI ? {
              _custom: {
                value: /* @__PURE__ */ q(l.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => l.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(l.$state).reduce((c, d) => (c[d] = l.$state[d], c), {})
            )
          }), l._getters && l._getters.length && o.instanceData.state.push({
            type: Uo(l.$id),
            key: "getters",
            editable: !1,
            value: l._getters.reduce((c, d) => {
              try {
                c[d] = l[d];
              } catch (u) {
                c[d] = u;
              }
              return c;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((o) => {
      if (o.app === e && o.inspectorId === Te) {
        let s = [t];
        s = s.concat(Array.from(t._s.values())), o.rootNodes = (o.filter ? s.filter((r) => "$id" in r ? r.$id.toLowerCase().includes(o.filter.toLowerCase()) : uc.toLowerCase().includes(o.filter.toLowerCase())) : s).map(sd);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((o) => {
      if (o.app === e && o.inspectorId === Te) {
        const s = o.nodeId === Do ? t : t._s.get(o.nodeId);
        if (!s)
          return;
        s && (o.nodeId !== Do && (globalThis.$store = /* @__PURE__ */ q(s)), o.state = rd(s));
      }
    }), n.on.editInspectorState((o, s) => {
      if (o.app === e && o.inspectorId === Te) {
        const r = o.nodeId === Do ? t : t._s.get(o.nodeId);
        if (!r)
          return Ce(`store "${o.nodeId}" not found`, "error");
        const { path: i } = o;
        gr(r) ? i.unshift("state") : (i.length !== 1 || !r._customProperties.has(i[0]) || i[0] in r.$state) && i.unshift("$state"), yn = !1, o.set(r, i, o.state.value), yn = !0;
      }
    }), n.on.editComponentState((o) => {
      if (o.type.startsWith("🍍")) {
        const s = o.type.replace(/^🍍\s*/, ""), r = t._s.get(s);
        if (!r)
          return Ce(`store "${s}" not found`, "error");
        const { path: i } = o;
        if (i[0] !== "state")
          return Ce(`Invalid path for store "${s}":
${i}
Only state can be modified.`);
        i[0] = "$state", yn = !1, o.set(r, i, o.state.value), yn = !0;
      }
    });
  });
}
function ud(e, t) {
  Vo.includes(Uo(t.$id)) || Vo.push(Uo(t.$id)), nc({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Vo,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const o = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: i, onError: l, name: c, args: d }) => {
      const u = fc++;
      n.addTimelineEvent({
        layerId: nn,
        event: {
          time: o(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: Qe(t.$id),
            action: Qe(c),
            args: d
          },
          groupId: u
        }
      }), i((a) => {
        Wt = void 0, n.addTimelineEvent({
          layerId: nn,
          event: {
            time: o(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: Qe(t.$id),
              action: Qe(c),
              args: d,
              result: a
            },
            groupId: u
          }
        });
      }), l((a) => {
        Wt = void 0, n.addTimelineEvent({
          layerId: nn,
          event: {
            time: o(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: Qe(t.$id),
              action: Qe(c),
              args: d,
              error: a
            },
            groupId: u
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      At(() => w(t[i]), (l, c) => {
        n.notifyComponentUpdate(), n.sendInspectorState(Te), yn && n.addTimelineEvent({
          layerId: nn,
          event: {
            time: o(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: l,
              oldValue: c
            },
            groupId: Wt
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: l }, c) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(Te), !yn)
        return;
      const d = {
        time: o(),
        title: ld(l),
        data: cd({ store: Qe(t.$id) }, id(i)),
        groupId: Wt
      };
      l === bt.patchFunction ? d.subtitle = "⤵️" : l === bt.patchObject ? d.subtitle = "🧩" : i && !Array.isArray(i) && (d.subtitle = i.type), i && (d.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: nn,
        event: d
      });
    }, { detached: !0, flush: "sync" });
    const s = t._hotUpdate;
    t._hotUpdate = Bt((i) => {
      s(i), n.addTimelineEvent({
        layerId: nn,
        event: {
          time: o(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Qe(t.$id),
            info: Qe("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(Te), n.sendInspectorState(Te);
    });
    const { $dispose: r } = t;
    t.$dispose = () => {
      r(), n.notifyComponentUpdate(), n.sendInspectorTree(Te), n.sendInspectorState(Te), n.getSettings().logStoreChanges && Ce(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(Te), n.sendInspectorState(Te), n.getSettings().logStoreChanges && Ce(`"${t.$id}" store installed 🆕`);
  });
}
let fc = 0, Wt;
function fi(e, t, n) {
  const o = t.reduce((s, r) => (s[r] = (/* @__PURE__ */ q(e))[r], s), {});
  for (const s in o)
    e[s] = function() {
      const r = fc, i = n ? new Proxy(e, {
        get(...c) {
          return Wt = r, Reflect.get(...c);
        },
        set(...c) {
          return Wt = r, Reflect.set(...c);
        }
      }) : e;
      Wt = r;
      const l = o[s].apply(i, arguments);
      return Wt = void 0, l;
    };
}
function fd({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      fi(t, Object.keys(n.actions), t._isOptionsAPI);
      const o = t._hotUpdate;
      (/* @__PURE__ */ q(t))._hotUpdate = function(s) {
        o.apply(this, arguments), fi(t, Object.keys(s._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    ud(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function dd() {
  const e = Bi(!0), t = e.run(() => /* @__PURE__ */ Je({}));
  let n = [], o = [];
  const s = Bt({
    install(r) {
      Xn(s), s._a = r, r.provide(oc, s), r.config.globalProperties.$pinia = s, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Gt && ad(r, s), o.forEach((i) => n.push(i)), o = [];
    },
    use(r) {
      return this._a ? n.push(r) : o.push(r), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Gt && typeof Proxy < "u" && s.use(fd), s;
}
function dc(e, t) {
  for (const n in t) {
    const o = t[n];
    if (!(n in e))
      continue;
    const s = e[n];
    dn(s) && dn(o) && !/* @__PURE__ */ ue(o) && !/* @__PURE__ */ nt(o) ? e[n] = dc(s, o) : e[n] = o;
  }
  return e;
}
const pc = () => {
};
function di(e, t, n, o = pc) {
  e.push(t);
  const s = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), o());
  };
  return !n && Gi() && Xc(s), s;
}
function _n(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const pd = (e) => e(), pi = Symbol(), hs = Symbol();
function Is(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, o) => e.set(o, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const o = t[n], s = e[n];
    dn(s) && dn(o) && e.hasOwnProperty(n) && !/* @__PURE__ */ ue(o) && !/* @__PURE__ */ nt(o) ? e[n] = Is(s, o) : e[n] = o;
  }
  return e;
}
const hd = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function gd(e) {
  return !dn(e) || !e.hasOwnProperty(hd);
}
const { assign: qe } = Object;
function hi(e) {
  return !!(/* @__PURE__ */ ue(e) && e.effect);
}
function gi(e, t, n, o) {
  const { state: s, actions: r, getters: i } = t, l = n.state.value[e];
  let c;
  function d() {
    !l && (process.env.NODE_ENV === "production" || !o) && (n.state.value[e] = s ? s() : {});
    const u = process.env.NODE_ENV !== "production" && o ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      /* @__PURE__ */ Cr((/* @__PURE__ */ Je(s ? s() : {})).value)
    ) : /* @__PURE__ */ Cr(n.state.value[e]);
    return qe(u, r, Object.keys(i || {}).reduce((a, p) => (process.env.NODE_ENV !== "production" && p in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${e}".`), a[p] = Bt(Ne(() => {
      Xn(n);
      const g = n._s.get(e);
      return i[p].call(g, g);
    })), a), {}));
  }
  return c = $s(e, d, t, n, o, !0), c;
}
function $s(e, t, n = {}, o, s, r) {
  let i;
  const l = qe({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !o._e.active)
    throw new Error("Pinia destroyed");
  const c = { deep: !0 };
  process.env.NODE_ENV !== "production" && (c.onTrigger = (k) => {
    d ? g = k : d == !1 && !j._hotUpdating && (Array.isArray(g) ? g.push(k) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let d, u, a = [], p = [], g;
  const O = o.state.value[e];
  !r && !O && (process.env.NODE_ENV === "production" || !s) && (o.state.value[e] = {});
  const b = /* @__PURE__ */ Je({});
  let L;
  function H(k) {
    let T;
    d = u = !1, process.env.NODE_ENV !== "production" && (g = []), typeof k == "function" ? (k(o.state.value[e]), T = {
      type: bt.patchFunction,
      storeId: e,
      events: g
    }) : (Is(o.state.value[e], k), T = {
      type: bt.patchObject,
      payload: k,
      storeId: e,
      events: g
    });
    const Z = L = Symbol();
    To().then(() => {
      L === Z && (d = !0);
    }), u = !0, _n(a, T, o.state.value[e]);
  }
  const P = r ? function() {
    const { state: T } = n, Z = T ? T() : {};
    this.$patch((ge) => {
      qe(ge, Z);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : pc
  );
  function M() {
    i.stop(), a = [], p = [], o._s.delete(e);
  }
  const oe = (k, T = "") => {
    if (pi in k)
      return k[hs] = T, k;
    const Z = function() {
      Xn(o);
      const ge = Array.from(arguments), at = [], Re = [];
      function we(pe) {
        at.push(pe);
      }
      function Q(pe) {
        Re.push(pe);
      }
      _n(p, {
        args: ge,
        name: Z[hs],
        store: j,
        after: we,
        onError: Q
      });
      let J;
      try {
        J = k.apply(this && this.$id === e ? this : j, ge);
      } catch (pe) {
        throw _n(Re, pe), pe;
      }
      return J instanceof Promise ? J.then((pe) => (_n(at, pe), pe)).catch((pe) => (_n(Re, pe), Promise.reject(pe))) : (_n(at, J), J);
    };
    return Z[pi] = !0, Z[hs] = T, Z;
  }, $ = /* @__PURE__ */ Bt({
    actions: {},
    getters: {},
    state: [],
    hotState: b
  }), re = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: di.bind(null, p),
    $patch: H,
    $reset: P,
    $subscribe(k, T = {}) {
      const Z = di(a, k, T.detached, () => ge()), ge = i.run(() => At(() => o.state.value[e], (at) => {
        (T.flush === "sync" ? u : d) && k({
          storeId: e,
          type: bt.direct,
          events: g
        }, at);
      }, qe({}, c, T)));
      return Z;
    },
    $dispose: M
  }, j = /* @__PURE__ */ no(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Gt ? qe(
    {
      _hmrPayload: $,
      _customProperties: Bt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    re
    // must be added later
    // setupStore
  ) : re);
  o._s.set(e, j);
  const fe = (o._a && o._a.runWithContext || pd)(() => o._e.run(() => (i = Bi()).run(() => t({ action: oe }))));
  for (const k in fe) {
    const T = fe[k];
    if (/* @__PURE__ */ ue(T) && !hi(T) || /* @__PURE__ */ nt(T))
      process.env.NODE_ENV !== "production" && s ? po(b.value, k, /* @__PURE__ */ is(fe, k)) : r || (O && gd(T) && (/* @__PURE__ */ ue(T) ? T.value = O[k] : Is(T, O[k])), o.state.value[e][k] = T), process.env.NODE_ENV !== "production" && $.state.push(k);
    else if (typeof T == "function") {
      const Z = process.env.NODE_ENV !== "production" && s ? T : oe(T, k);
      fe[k] = Z, process.env.NODE_ENV !== "production" && ($.actions[k] = T), l.actions[k] = T;
    } else process.env.NODE_ENV !== "production" && hi(T) && ($.getters[k] = r ? (
      // @ts-expect-error
      n.getters[k]
    ) : T, Gt && (fe._getters || // @ts-expect-error: same
    (fe._getters = Bt([]))).push(k));
  }
  if (qe(j, fe), qe(/* @__PURE__ */ q(j), fe), Object.defineProperty(j, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? b.value : o.state.value[e],
    set: (k) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      H((T) => {
        qe(T, k);
      });
    }
  }), process.env.NODE_ENV !== "production" && (j._hotUpdate = Bt((k) => {
    j._hotUpdating = !0, k._hmrPayload.state.forEach((T) => {
      if (T in j.$state) {
        const Z = k.$state[T], ge = j.$state[T];
        typeof Z == "object" && dn(Z) && dn(ge) ? dc(Z, ge) : k.$state[T] = ge;
      }
      po(j, T, /* @__PURE__ */ is(k.$state, T));
    }), Object.keys(j.$state).forEach((T) => {
      T in k.$state || ps(j, T);
    }), d = !1, u = !1, o.state.value[e] = /* @__PURE__ */ is(k._hmrPayload, "hotState"), u = !0, To().then(() => {
      d = !0;
    });
    for (const T in k._hmrPayload.actions) {
      const Z = k[T];
      po(j, T, oe(Z, T));
    }
    for (const T in k._hmrPayload.getters) {
      const Z = k._hmrPayload.getters[T], ge = r ? (
        // special handling of options api
        Ne(() => (Xn(o), Z.call(j, j)))
      ) : Z;
      po(j, T, ge);
    }
    Object.keys(j._hmrPayload.getters).forEach((T) => {
      T in k._hmrPayload.getters || ps(j, T);
    }), Object.keys(j._hmrPayload.actions).forEach((T) => {
      T in k._hmrPayload.actions || ps(j, T);
    }), j._hmrPayload = k._hmrPayload, j._getters = k._getters, j._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Gt) {
    const k = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((T) => {
      Object.defineProperty(j, T, qe({ value: j[T] }, k));
    });
  }
  return o._p.forEach((k) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Gt) {
      const T = i.run(() => k({
        store: j,
        app: o._a,
        pinia: o,
        options: l
      }));
      Object.keys(T || {}).forEach((Z) => j._customProperties.add(Z)), qe(j, T);
    } else
      qe(j, i.run(() => k({
        store: j,
        app: o._a,
        pinia: o,
        options: l
      })));
  }), process.env.NODE_ENV !== "production" && j.$state && typeof j.$state == "object" && typeof j.$state.constructor == "function" && !j.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${j.$id}".`), O && r && n.hydrate && n.hydrate(j.$state, O), d = !0, u = !0, j;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function md(e, t, n) {
  let o, s;
  const r = typeof t == "function";
  o = e, s = r ? n : t;
  function i(l, c) {
    const d = Ka();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Ln && Ln._testing ? null : l) || (d ? ot(oc, null) : null), l && Xn(l), process.env.NODE_ENV !== "production" && !Ln)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    l = Ln, l._s.has(o) || (r ? $s(o, t, s, l) : gi(o, s, l), process.env.NODE_ENV !== "production" && (i._pinia = l));
    const u = l._s.get(o);
    if (process.env.NODE_ENV !== "production" && c) {
      const a = "__hot:" + o, p = r ? $s(a, t, s, l, !0) : gi(a, qe({}, s), l, !0);
      c._hotUpdate(p), delete l.state.value[a], l._s.delete(a);
    }
    if (process.env.NODE_ENV !== "production" && Gt) {
      const a = Cn();
      if (a && a.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const p = a.proxy, g = "_pStores" in p ? p._pStores : p._pStores = {};
        g[o] = u;
      }
    }
    return u;
  }
  return i.$id = o, i;
}
function _d() {
  return hc().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function hc() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const vd = typeof Proxy == "function", Ed = "devtools-plugin:setup", yd = "plugin:settings:set";
let vn, ks;
function bd() {
  var e;
  return vn !== void 0 || (typeof window < "u" && window.performance ? (vn = !0, ks = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (vn = !0, ks = globalThis.perf_hooks.performance) : vn = !1), vn;
}
function Nd() {
  return bd() ? ks.now() : Date.now();
}
class Od {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const i in t.settings) {
        const l = t.settings[i];
        o[i] = l.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${t.id}`;
    let r = Object.assign({}, o);
    try {
      const i = localStorage.getItem(s), l = JSON.parse(i);
      Object.assign(r, l);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(i) {
        try {
          localStorage.setItem(s, JSON.stringify(i));
        } catch {
        }
        r = i;
      },
      now() {
        return Nd();
      }
    }, n && n.on(yd, (i, l) => {
      i === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, l) => this.target ? this.target.on[l] : (...c) => {
        this.onQueue.push({
          method: l,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...c) => (this.targetQueue.push({
        method: l,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[l](...c)) : (...c) => new Promise((d) => {
        this.targetQueue.push({
          method: l,
          args: c,
          resolve: d
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function wd(e, t) {
  const n = e, o = hc(), s = _d(), r = vd && n.enableEarlyProxy;
  if (s && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    s.emit(Ed, e, t);
  else {
    const i = r ? new Od(n, s) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const Ct = typeof document < "u";
function gc(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function Sd(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && gc(e.default);
}
const se = Object.assign;
function gs(e, t) {
  const n = {};
  for (const o in t) {
    const s = t[o];
    n[o] = Ke(s) ? s.map(e) : e(s);
  }
  return n;
}
const Wn = () => {
}, Ke = Array.isArray;
function mi(e, t) {
  const n = {};
  for (const o in e) n[o] = o in t ? t[o] : e[o];
  return n;
}
function X(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const mc = /#/g, Dd = /&/g, Vd = /\//g, xd = /=/g, Cd = /\?/g, _c = /\+/g, Ad = /%5B/g, Rd = /%5D/g, vc = /%5E/g, Pd = /%60/g, Ec = /%7B/g, Td = /%7C/g, yc = /%7D/g, Id = /%20/g;
function mr(e) {
  return e == null ? "" : encodeURI("" + e).replace(Td, "|").replace(Ad, "[").replace(Rd, "]");
}
function $d(e) {
  return mr(e).replace(Ec, "{").replace(yc, "}").replace(vc, "^");
}
function Ms(e) {
  return mr(e).replace(_c, "%2B").replace(Id, "+").replace(mc, "%23").replace(Dd, "%26").replace(Pd, "`").replace(Ec, "{").replace(yc, "}").replace(vc, "^");
}
function kd(e) {
  return Ms(e).replace(xd, "%3D");
}
function Md(e) {
  return mr(e).replace(mc, "%23").replace(Cd, "%3F");
}
function jd(e) {
  return Md(e).replace(Vd, "%2F");
}
function Dn(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && X(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
const Ld = /\/$/, Fd = (e) => e.replace(Ld, "");
function ms(e, t, n = "/") {
  let o, s = {}, r = "", i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return c = l >= 0 && c > l ? -1 : c, c >= 0 && (o = t.slice(0, c), r = t.slice(c, l > 0 ? l : t.length), s = e(r.slice(1))), l >= 0 && (o = o || t.slice(0, l), i = t.slice(l, t.length)), o = Bd(o ?? t, n), {
    fullPath: o + r + i,
    path: o,
    query: s,
    hash: Dn(i)
  };
}
function Hd(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function _i(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function vi(e, t, n) {
  const o = t.matched.length - 1, s = n.matched.length - 1;
  return o > -1 && o === s && Yt(t.matched[o], n.matched[s]) && bc(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function Yt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function bc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!Ud(e[n], t[n])) return !1;
  return !0;
}
function Ud(e, t) {
  return Ke(e) ? Ei(e, t) : Ke(t) ? Ei(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
}
function Ei(e, t) {
  return Ke(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Bd(e, t) {
  if (e.startsWith("/")) return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return X(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e) return t;
  const n = t.split("/"), o = e.split("/"), s = o[o.length - 1];
  (s === ".." || s === ".") && o.push("");
  let r = n.length - 1, i, l;
  for (i = 0; i < o.length; i++)
    if (l = o[i], l !== ".")
      if (l === "..")
        r > 1 && r--;
      else break;
  return n.slice(0, r).join("/") + "/" + o.slice(i).join("/");
}
const Lt = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let js = /* @__PURE__ */ function(e) {
  return e.pop = "pop", e.push = "push", e;
}({}), _s = /* @__PURE__ */ function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
}({});
function Gd(e) {
  if (!e) if (Ct) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Fd(e);
}
const Wd = /^[^#]+#/;
function Kd(e, t) {
  return e.replace(Wd, "#") + t;
}
function zd(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const ts = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function qd(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const r = document.querySelector(e.el);
        if (o && r) {
          X(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        X(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const s = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!s) {
      process.env.NODE_ENV !== "production" && X(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = zd(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function yi(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Ls = /* @__PURE__ */ new Map();
function Jd(e, t) {
  Ls.set(e, t);
}
function Yd(e) {
  const t = Ls.get(e);
  return Ls.delete(e), t;
}
function Bo(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Nc(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let ve = /* @__PURE__ */ function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
}({});
const Fs = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : ""), Qd = {
  [ve.MATCHER_NOT_FOUND]({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  [ve.NAVIGATION_GUARD_REDIRECT]({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Zd(t)}" via a navigation guard.`;
  },
  [ve.NAVIGATION_ABORTED]({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  [ve.NAVIGATION_CANCELLED]({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  [ve.NAVIGATION_DUPLICATED]({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function Vn(e, t) {
  return process.env.NODE_ENV !== "production" ? se(new Error(Qd[e](t)), {
    type: e,
    [Fs]: !0
  }, t) : se(/* @__PURE__ */ new Error(), {
    type: e,
    [Fs]: !0
  }, t);
}
function St(e, t) {
  return e instanceof Error && Fs in e && (t == null || !!(e.type & t));
}
const Xd = [
  "params",
  "query",
  "hash"
];
function Zd(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of Xd) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function ep(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < n.length; ++o) {
    const s = n[o].replace(_c, " "), r = s.indexOf("="), i = Dn(r < 0 ? s : s.slice(0, r)), l = r < 0 ? null : Dn(s.slice(r + 1));
    if (i in t) {
      let c = t[i];
      Ke(c) || (c = t[i] = [c]), c.push(l);
    } else t[i] = l;
  }
  return t;
}
function bi(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = kd(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Ke(o) ? o.map((s) => s && Ms(s)) : [o && Ms(o)]).forEach((s) => {
      s !== void 0 && (t += (t.length ? "&" : "") + n, s != null && (t += "=" + s));
    });
  }
  return t;
}
function tp(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = Ke(o) ? o.map((s) => s == null ? null : "" + s) : o == null ? o : "" + o);
  }
  return t;
}
const np = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), Ni = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), _r = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), vr = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), Hs = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function $n() {
  let e = [];
  function t(o) {
    return e.push(o), () => {
      const s = e.indexOf(o);
      s > -1 && e.splice(s, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function Ht(e, t, n, o, s, r = (i) => i()) {
  const i = o && (o.enterCallbacks[s] = o.enterCallbacks[s] || []);
  return () => new Promise((l, c) => {
    const d = (p) => {
      p === !1 ? c(Vn(ve.NAVIGATION_ABORTED, {
        from: n,
        to: t
      })) : p instanceof Error ? c(p) : Bo(p) ? c(Vn(ve.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: p
      })) : (i && o.enterCallbacks[s] === i && typeof p == "function" && i.push(p), l());
    }, u = r(() => e.call(o && o.instances[s], t, n, process.env.NODE_ENV !== "production" ? op(d, t, n) : d));
    let a = Promise.resolve(u);
    if (e.length < 3 && (a = a.then(d)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const p = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof u == "object" && "then" in u) a = a.then((g) => d._called ? g : (X(p), Promise.reject(/* @__PURE__ */ new Error("Invalid navigation guard"))));
      else if (u !== void 0 && !d._called) {
        X(p), c(/* @__PURE__ */ new Error("Invalid navigation guard"));
        return;
      }
    }
    a.catch((p) => c(p));
  });
}
function op(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && X(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function vs(e, t, n, o, s = (r) => r()) {
  const r = [];
  for (const i of e) {
    process.env.NODE_ENV !== "production" && !i.components && i.children && !i.children.length && X(`Record with path "${i.path}" is either missing a "component(s)" or "children" property.`);
    for (const l in i.components) {
      let c = i.components[l];
      if (process.env.NODE_ENV !== "production") {
        if (!c || typeof c != "object" && typeof c != "function")
          throw X(`Component "${l}" in record with path "${i.path}" is not a valid component. Received "${String(c)}".`), new Error("Invalid route component");
        if ("then" in c) {
          X(`Component "${l}" in record with path "${i.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const d = c;
          c = () => d;
        } else c.__asyncLoader && !c.__warnedDefineAsync && (c.__warnedDefineAsync = !0, X(`Component "${l}" in record with path "${i.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (gc(c)) {
          const d = (c.__vccOpts || c)[t];
          d && r.push(Ht(d, n, o, i, l, s));
        } else {
          let d = c();
          process.env.NODE_ENV !== "production" && !("catch" in d) && (X(`Component "${l}" in record with path "${i.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), d = Promise.resolve(d)), r.push(() => d.then((u) => {
            if (!u) throw new Error(`Couldn't resolve component "${l}" at "${i.path}"`);
            const a = Sd(u) ? u.default : u;
            i.mods[l] = u, i.components[l] = a;
            const p = (a.__vccOpts || a)[t];
            return p && Ht(p, n, o, i, l, s)();
          }));
        }
    }
  }
  return r;
}
function sp(e, t) {
  const n = [], o = [], s = [], r = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < r; i++) {
    const l = t.matched[i];
    l && (e.matched.find((d) => Yt(d, l)) ? o.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((d) => Yt(d, c)) || s.push(c));
  }
  return [
    n,
    o,
    s
  ];
}
function kn(e, t) {
  const n = se({}, e, { matched: e.matched.map((o) => gp(o, [
    "instances",
    "children",
    "aliasOf"
  ])) });
  return { _custom: {
    type: null,
    readOnly: !0,
    display: e.fullPath,
    tooltip: t,
    value: n
  } };
}
function ho(e) {
  return { _custom: { display: e } };
}
let rp = 0;
function ip(e, t, n) {
  if (t.__hasDevtools) return;
  t.__hasDevtools = !0;
  const o = rp++;
  wd({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (s) => {
    typeof s.now != "function" && X("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), s.on.inspectComponent((u, a) => {
      u.instanceData && u.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: kn(t.currentRoute.value, "Current Route")
      });
    }), s.on.visitComponentTree(({ treeNode: u, componentInstance: a }) => {
      if (a.__vrv_devtools) {
        const p = a.__vrv_devtools;
        u.tags.push({
          label: (p.name ? `${p.name.toString()}: ` : "") + p.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: Oc
        });
      }
      Ke(a.__vrl_devtools) && (a.__devtoolsApi = s, a.__vrl_devtools.forEach((p) => {
        let g = p.route.path, O = Dc, b = "", L = 0;
        p.error ? (g = p.error, O = fp, L = dp) : p.isExactActive ? (O = Sc, b = "This is exactly active") : p.isActive && (O = wc, b = "This link is active"), u.tags.push({
          label: g,
          textColor: L,
          tooltip: b,
          backgroundColor: O
        });
      }));
    }), At(t.currentRoute, () => {
      c(), s.notifyComponentUpdate(), s.sendInspectorTree(l), s.sendInspectorState(l);
    });
    const r = "router:navigations:" + o;
    s.addTimelineLayer({
      id: r,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((u, a) => {
      s.addTimelineEvent({
        layerId: r,
        event: {
          title: "Error during Navigation",
          subtitle: a.fullPath,
          logType: "error",
          time: s.now(),
          data: { error: u },
          groupId: a.meta.__navigationId
        }
      });
    });
    let i = 0;
    t.beforeEach((u, a) => {
      const p = {
        guard: ho("beforeEach"),
        from: kn(a, "Current Location during this navigation"),
        to: kn(u, "Target location")
      };
      Object.defineProperty(u.meta, "__navigationId", { value: i++ }), s.addTimelineEvent({
        layerId: r,
        event: {
          time: s.now(),
          title: "Start of navigation",
          subtitle: u.fullPath,
          data: p,
          groupId: u.meta.__navigationId
        }
      });
    }), t.afterEach((u, a, p) => {
      const g = { guard: ho("afterEach") };
      p ? (g.failure = { _custom: {
        type: Error,
        readOnly: !0,
        display: p ? p.message : "",
        tooltip: "Navigation Failure",
        value: p
      } }, g.status = ho("❌")) : g.status = ho("✅"), g.from = kn(a, "Current Location during this navigation"), g.to = kn(u, "Target location"), s.addTimelineEvent({
        layerId: r,
        event: {
          title: "End of navigation",
          subtitle: u.fullPath,
          time: s.now(),
          data: g,
          logType: p ? "warning" : "default",
          groupId: u.meta.__navigationId
        }
      });
    });
    const l = "router-inspector:" + o;
    s.addInspector({
      id: l,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function c() {
      if (!d) return;
      const u = d;
      let a = n.getRoutes().filter((p) => !p.parent || !p.parent.record.components);
      a.forEach(Cc), u.filter && (a = a.filter((p) => Us(p, u.filter.toLowerCase()))), a.forEach((p) => xc(p, t.currentRoute.value)), u.rootNodes = a.map(Vc);
    }
    let d;
    s.on.getInspectorTree((u) => {
      d = u, u.app === e && u.inspectorId === l && c();
    }), s.on.getInspectorState((u) => {
      if (u.app === e && u.inspectorId === l) {
        const a = n.getRoutes().find((p) => p.record.__vd_id === u.nodeId);
        a && (u.state = { options: cp(a) });
      }
    }), s.sendInspectorTree(l), s.sendInspectorState(l);
  });
}
function lp(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function cp(e) {
  const { record: t } = e, n = [{
    editable: !1,
    key: "path",
    value: t.path
  }];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({
    editable: !1,
    key: "regexp",
    value: e.re
  }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: { _custom: {
      type: null,
      readOnly: !0,
      display: e.keys.map((o) => `${o.name}${lp(o)}`).join(" "),
      tooltip: "Param keys",
      value: e.keys
    } }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((o) => o.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: { _custom: {
      type: null,
      readOnly: !0,
      display: e.score.map((o) => o.join(", ")).join(" | "),
      tooltip: "Score used to sort routes",
      value: e.score
    } }
  }), n;
}
const Oc = 15485081, wc = 2450411, Sc = 8702998, ap = 2282478, Dc = 16486972, up = 6710886, fp = 16704226, dp = 12131356;
function Vc(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: ap
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: Dc
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: Oc
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: Sc
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: wc
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: up
  });
  let o = n.__vd_id;
  return o == null && (o = String(pp++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(Vc)
  };
}
let pp = 0;
const hp = /^\/(.*)\/([a-z]*)$/;
function xc(e, t) {
  const n = t.matched.length && Yt(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => Yt(o, e.record))), e.children.forEach((o) => xc(o, t));
}
function Cc(e) {
  e.__vd_match = !1, e.children.forEach(Cc);
}
function Us(e, t) {
  const n = String(e.re).match(hp);
  if (e.__vd_match = !1, !n || n.length < 3) return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((r) => Us(r, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const o = e.record.path.toLowerCase(), s = Dn(o);
  return !t.startsWith("/") && (s.includes(t) || o.includes(t)) || s.startsWith(t) || o.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((r) => Us(r, t));
}
function gp(e, t) {
  const n = {};
  for (const o in e) t.includes(o) || (n[o] = e[o]);
  return n;
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let mp = () => location.protocol + "//" + location.host;
function Ac(e, t) {
  const { pathname: n, search: o, hash: s } = t, r = e.indexOf("#");
  if (r > -1) {
    let i = s.includes(e.slice(r)) ? e.slice(r).length : 1, l = s.slice(i);
    return l[0] !== "/" && (l = "/" + l), _i(l, "");
  }
  return _i(n, e) + o + s;
}
function _p(e, t, n, o) {
  let s = [], r = [], i = null;
  const l = ({ state: p }) => {
    const g = Ac(e, location), O = n.value, b = t.value;
    let L = 0;
    if (p) {
      if (n.value = g, t.value = p, i && i === O) {
        i = null;
        return;
      }
      L = b ? p.position - b.position : 0;
    } else o(g);
    s.forEach((H) => {
      H(n.value, O, {
        delta: L,
        type: js.pop,
        direction: L ? L > 0 ? _s.forward : _s.back : _s.unknown
      });
    });
  };
  function c() {
    i = n.value;
  }
  function d(p) {
    s.push(p);
    const g = () => {
      const O = s.indexOf(p);
      O > -1 && s.splice(O, 1);
    };
    return r.push(g), g;
  }
  function u() {
    if (document.visibilityState === "hidden") {
      const { history: p } = window;
      if (!p.state) return;
      p.replaceState(se({}, p.state, { scroll: ts() }), "");
    }
  }
  function a() {
    for (const p of r) p();
    r = [], window.removeEventListener("popstate", l), window.removeEventListener("pagehide", u), document.removeEventListener("visibilitychange", u);
  }
  return window.addEventListener("popstate", l), window.addEventListener("pagehide", u), document.addEventListener("visibilitychange", u), {
    pauseListeners: c,
    listen: d,
    destroy: a
  };
}
function Oi(e, t, n, o = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: s ? ts() : null
  };
}
function vp(e) {
  const { history: t, location: n } = window, o = { value: Ac(e, n) }, s = { value: t.state };
  s.value || r(o.value, {
    back: null,
    current: o.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function r(c, d, u) {
    const a = e.indexOf("#"), p = a > -1 ? (n.host && document.querySelector("base") ? e : e.slice(a)) + c : mp() + e + c;
    try {
      t[u ? "replaceState" : "pushState"](d, "", p), s.value = d;
    } catch (g) {
      process.env.NODE_ENV !== "production" ? X("Error with push/replace State", g) : console.error(g), n[u ? "replace" : "assign"](p);
    }
  }
  function i(c, d) {
    r(c, se({}, t.state, Oi(s.value.back, c, s.value.forward, !0), d, { position: s.value.position }), !0), o.value = c;
  }
  function l(c, d) {
    const u = se({}, s.value, t.state, {
      forward: c,
      scroll: ts()
    });
    process.env.NODE_ENV !== "production" && !t.state && X(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://router.vuejs.org/guide/migration/#Usage-of-history-state`), r(u.current, u, !0), r(c, se({}, Oi(o.value, c, null), { position: u.position + 1 }, d), !1), o.value = c;
  }
  return {
    location: o,
    state: s,
    push: l,
    replace: i
  };
}
function Ep(e) {
  e = Gd(e);
  const t = vp(e), n = _p(e, t.state, t.location, t.replace);
  function o(r, i = !0) {
    i || n.pauseListeners(), history.go(r);
  }
  const s = se({
    location: "",
    base: e,
    go: o,
    createHref: Kd.bind(null, e)
  }, t, n);
  return Object.defineProperty(s, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(s, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), s;
}
function yp(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), process.env.NODE_ENV !== "production" && !e.endsWith("#/") && !e.endsWith("#") && X(`A hash base must end with a "#":
"${e}" should be "${e.replace(/#.*$/, "#")}".`), Ep(e);
}
let on = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
}({});
var Se = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
}(Se || {});
const bp = {
  type: on.Static,
  value: ""
}, Np = /[a-zA-Z0-9_]/;
function Op(e) {
  if (!e) return [[]];
  if (e === "/") return [[bp]];
  if (!e.startsWith("/")) throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${d}": ${g}`);
  }
  let n = Se.Static, o = n;
  const s = [];
  let r;
  function i() {
    r && s.push(r), r = [];
  }
  let l = 0, c, d = "", u = "";
  function a() {
    d && (n === Se.Static ? r.push({
      type: on.Static,
      value: d
    }) : n === Se.Param || n === Se.ParamRegExp || n === Se.ParamRegExpEnd ? (r.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`), r.push({
      type: on.Param,
      value: d,
      regexp: u,
      repeatable: c === "*" || c === "+",
      optional: c === "*" || c === "?"
    })) : t("Invalid state to consume buffer"), d = "");
  }
  function p() {
    d += c;
  }
  for (; l < e.length; ) {
    if (c = e[l++], c === "\\" && n !== Se.ParamRegExp) {
      o = n, n = Se.EscapeNext;
      continue;
    }
    switch (n) {
      case Se.Static:
        c === "/" ? (d && a(), i()) : c === ":" ? (a(), n = Se.Param) : p();
        break;
      case Se.EscapeNext:
        p(), n = o;
        break;
      case Se.Param:
        c === "(" ? n = Se.ParamRegExp : Np.test(c) ? p() : (a(), n = Se.Static, c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case Se.ParamRegExp:
        c === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + c : n = Se.ParamRegExpEnd : u += c;
        break;
      case Se.ParamRegExpEnd:
        a(), n = Se.Static, c !== "*" && c !== "?" && c !== "+" && l--, u = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === Se.ParamRegExp && t(`Unfinished custom RegExp for param "${d}"`), a(), i(), s;
}
const wi = "[^/]+?", wp = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var Me = /* @__PURE__ */ function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
}(Me || {});
const Sp = /[.+*?^${}()[\]/\\]/g;
function Dp(e, t) {
  const n = se({}, wp, t), o = [];
  let s = n.start ? "^" : "";
  const r = [];
  for (const d of e) {
    const u = d.length ? [] : [Me.Root];
    n.strict && !d.length && (s += "/");
    for (let a = 0; a < d.length; a++) {
      const p = d[a];
      let g = Me.Segment + (n.sensitive ? Me.BonusCaseSensitive : 0);
      if (p.type === on.Static)
        a || (s += "/"), s += p.value.replace(Sp, "\\$&"), g += Me.Static;
      else if (p.type === on.Param) {
        const { value: O, repeatable: b, optional: L, regexp: H } = p;
        r.push({
          name: O,
          repeatable: b,
          optional: L
        });
        const P = H || wi;
        if (P !== wi) {
          g += Me.BonusCustomRegExp;
          try {
            `${P}`;
          } catch (oe) {
            throw new Error(`Invalid custom RegExp for param "${O}" (${P}): ` + oe.message);
          }
        }
        let M = b ? `((?:${P})(?:/(?:${P}))*)` : `(${P})`;
        a || (M = L && d.length < 2 ? `(?:/${M})` : "/" + M), L && (M += "?"), s += M, g += Me.Dynamic, L && (g += Me.BonusOptional), b && (g += Me.BonusRepeatable), P === ".*" && (g += Me.BonusWildcard);
      }
      u.push(g);
    }
    o.push(u);
  }
  if (n.strict && n.end) {
    const d = o.length - 1;
    o[d][o[d].length - 1] += Me.BonusStrict;
  }
  n.strict || (s += "/?"), n.end ? s += "$" : n.strict && !s.endsWith("/") && (s += "(?:/|$)");
  const i = new RegExp(s, n.sensitive ? "" : "i");
  function l(d) {
    const u = d.match(i), a = {};
    if (!u) return null;
    for (let p = 1; p < u.length; p++) {
      const g = u[p] || "", O = r[p - 1];
      a[O.name] = g && O.repeatable ? g.split("/") : g;
    }
    return a;
  }
  function c(d) {
    let u = "", a = !1;
    for (const p of e) {
      (!a || !u.endsWith("/")) && (u += "/"), a = !1;
      for (const g of p) if (g.type === on.Static) u += g.value;
      else if (g.type === on.Param) {
        const { value: O, repeatable: b, optional: L } = g, H = O in d ? d[O] : "";
        if (Ke(H) && !b) throw new Error(`Provided param "${O}" is an array but it is not repeatable (* or + modifiers)`);
        const P = Ke(H) ? H.join("/") : H;
        if (!P) if (L)
          p.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : a = !0);
        else throw new Error(`Missing required param "${O}"`);
        u += P;
      }
    }
    return u || "/";
  }
  return {
    re: i,
    score: o,
    keys: r,
    parse: l,
    stringify: c
  };
}
function Vp(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o) return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === Me.Static + Me.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === Me.Static + Me.Segment ? 1 : -1 : 0;
}
function Rc(e, t) {
  let n = 0;
  const o = e.score, s = t.score;
  for (; n < o.length && n < s.length; ) {
    const r = Vp(o[n], s[n]);
    if (r) return r;
    n++;
  }
  if (Math.abs(s.length - o.length) === 1) {
    if (Si(o)) return 1;
    if (Si(s)) return -1;
  }
  return s.length - o.length;
}
function Si(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const xp = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function Cp(e, t, n) {
  const o = Dp(Op(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const r = /* @__PURE__ */ new Set();
    for (const i of o.keys)
      r.has(i.name) && X(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), r.add(i.name);
  }
  const s = se(o, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Ap(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = mi(xp, t);
  function s(a) {
    return o.get(a);
  }
  function r(a, p, g) {
    const O = !g, b = Vi(a);
    process.env.NODE_ENV !== "production" && Ip(b, p), b.aliasOf = g && g.record;
    const L = mi(t, a), H = [b];
    if ("alias" in a) {
      const oe = typeof a.alias == "string" ? [a.alias] : a.alias;
      for (const $ of oe) H.push(Vi(se({}, b, {
        components: g ? g.record.components : b.components,
        path: $,
        aliasOf: g ? g.record : b
      })));
    }
    let P, M;
    for (const oe of H) {
      const { path: $ } = oe;
      if (p && $[0] !== "/") {
        const re = p.record.path, j = re[re.length - 1] === "/" ? "" : "/";
        oe.path = p.record.path + ($ && j + $);
      }
      if (process.env.NODE_ENV !== "production" && oe.path === "*") throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.`);
      if (P = Cp(oe, p, L), process.env.NODE_ENV !== "production" && p && $[0] === "/" && kp(P, p), g ? (g.alias.push(P), process.env.NODE_ENV !== "production" && Tp(g, P)) : (M = M || P, M !== P && M.alias.push(P), O && a.name && !xi(P) && (process.env.NODE_ENV !== "production" && $p(a, p), i(a.name))), Pc(P) && c(P), b.children) {
        const re = b.children;
        for (let j = 0; j < re.length; j++) r(re[j], P, g && g.children[j]);
      }
      g = g || P;
    }
    return M ? () => {
      i(M);
    } : Wn;
  }
  function i(a) {
    if (Nc(a)) {
      const p = o.get(a);
      p && (o.delete(a), n.splice(n.indexOf(p), 1), p.children.forEach(i), p.alias.forEach(i));
    } else {
      const p = n.indexOf(a);
      p > -1 && (n.splice(p, 1), a.record.name && o.delete(a.record.name), a.children.forEach(i), a.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(a) {
    const p = Mp(a, n);
    n.splice(p, 0, a), a.record.name && !xi(a) && o.set(a.record.name, a);
  }
  function d(a, p) {
    let g, O = {}, b, L;
    if ("name" in a && a.name) {
      if (g = o.get(a.name), !g) throw Vn(ve.MATCHER_NOT_FOUND, { location: a });
      if (process.env.NODE_ENV !== "production") {
        const M = Object.keys(a.params || {}).filter((oe) => !g.keys.find(($) => $.name === oe));
        M.length && X(`Discarded invalid param(s) "${M.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      L = g.record.name, O = se(Di(p.params, g.keys.filter((M) => !M.optional).concat(g.parent ? g.parent.keys.filter((M) => M.optional) : []).map((M) => M.name)), a.params && Di(a.params, g.keys.map((M) => M.name))), b = g.stringify(O);
    } else if (a.path != null)
      b = a.path, process.env.NODE_ENV !== "production" && !b.startsWith("/") && X(`The Matcher cannot resolve relative paths but received "${b}". Unless you directly called \`matcher.resolve("${b}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`), g = n.find((M) => M.re.test(b)), g && (O = g.parse(b), L = g.record.name);
    else {
      if (g = p.name ? o.get(p.name) : n.find((M) => M.re.test(p.path)), !g) throw Vn(ve.MATCHER_NOT_FOUND, {
        location: a,
        currentLocation: p
      });
      L = g.record.name, O = se({}, p.params, a.params), b = g.stringify(O);
    }
    const H = [];
    let P = g;
    for (; P; )
      H.unshift(P.record), P = P.parent;
    return {
      name: L,
      path: b,
      params: O,
      matched: H,
      meta: Pp(H)
    };
  }
  e.forEach((a) => r(a));
  function u() {
    n.length = 0, o.clear();
  }
  return {
    addRoute: r,
    resolve: d,
    removeRoute: i,
    clearRoutes: u,
    getRoutes: l,
    getRecordMatcher: s
  };
}
function Di(e, t) {
  const n = {};
  for (const o of t) o in e && (n[o] = e[o]);
  return n;
}
function Vi(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Rp(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function Rp(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const o in e.components) t[o] = typeof n == "object" ? n[o] : n;
  return t;
}
function xi(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Pp(e) {
  return e.reduce((t, n) => se(t, n.meta), {});
}
function Bs(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function Tp(e, t) {
  for (const n of e.keys) if (!n.optional && !t.keys.find(Bs.bind(null, n))) return X(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys) if (!n.optional && !e.keys.find(Bs.bind(null, n))) return X(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Ip(e, t) {
  t && t.record.name && !e.name && !e.path && X(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function $p(e, t) {
  for (let n = t; n; n = n.parent) if (n.record.name === e.name) throw new Error(`A route named "${String(e.name)}" has been added as a ${t === n ? "child" : "descendant"} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
}
function kp(e, t) {
  for (const n of t.keys) if (!e.keys.find(Bs.bind(null, n))) return X(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function Mp(e, t) {
  let n = 0, o = t.length;
  for (; n !== o; ) {
    const r = n + o >> 1;
    Rc(e, t[r]) < 0 ? o = r : n = r + 1;
  }
  const s = jp(e);
  return s && (o = t.lastIndexOf(s, o - 1), process.env.NODE_ENV !== "production" && o < 0 && X(`Finding ancestor route "${s.record.path}" failed for "${e.record.path}"`)), o;
}
function jp(e) {
  let t = e;
  for (; t = t.parent; ) if (Pc(t) && Rc(e, t) === 0) return t;
}
function Pc({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function Ci(e) {
  const t = ot(_r), n = ot(vr);
  let o = !1, s = null;
  const r = Ne(() => {
    const u = w(e.to);
    return process.env.NODE_ENV !== "production" && (!o || u !== s) && (Bo(u) || (o ? X(`Invalid value for prop "to" in useLink()
- to:`, u, `
- previous to:`, s, `
- props:`, e) : X(`Invalid value for prop "to" in useLink()
- to:`, u, `
- props:`, e)), s = u, o = !0), t.resolve(u);
  }), i = Ne(() => {
    const { matched: u } = r.value, { length: a } = u, p = u[a - 1], g = n.matched;
    if (!p || !g.length) return -1;
    const O = g.findIndex(Yt.bind(null, p));
    if (O > -1) return O;
    const b = Ai(u[a - 2]);
    return a > 1 && Ai(p) === b && g[g.length - 1].path !== b ? g.findIndex(Yt.bind(null, u[a - 2])) : O;
  }), l = Ne(() => i.value > -1 && Up(n.params, r.value.params)), c = Ne(() => i.value > -1 && i.value === n.matched.length - 1 && bc(n.params, r.value.params));
  function d(u = {}) {
    if (Hp(u)) {
      const a = t[w(e.replace) ? "replace" : "push"](w(e.to)).catch(Wn);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => a), a;
    }
    return Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && Ct) {
    const u = Cn();
    if (u) {
      const a = {
        route: r.value,
        isActive: l.value,
        isExactActive: c.value,
        error: null
      };
      u.__vrl_devtools = u.__vrl_devtools || [], u.__vrl_devtools.push(a), Ja(() => {
        a.route = r.value, a.isActive = l.value, a.isExactActive = c.value, a.error = Bo(w(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: r,
    href: Ne(() => r.value.href),
    isActive: l,
    isExactActive: c,
    navigate: d
  };
}
function Lp(e) {
  return e.length === 1 ? e[0] : e;
}
const Fp = /* @__PURE__ */ Tt({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink: Ci,
  setup(e, { slots: t }) {
    const n = /* @__PURE__ */ no(Ci(e)), { options: o } = ot(_r), s = Ne(() => ({
      [Ri(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      [Ri(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const r = t.default && Lp(t.default(n));
      return e.custom ? r : Zl("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: s.value
      }, r);
    };
  }
}), Er = Fp;
function Hp(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Up(e, t) {
  for (const n in t) {
    const o = t[n], s = e[n];
    if (typeof o == "string") {
      if (o !== s) return !1;
    } else if (!Ke(s) || s.length !== o.length || o.some((r, i) => r.valueOf() !== s[i].valueOf())) return !1;
  }
  return !0;
}
function Ai(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Ri = (e, t, n) => e ?? t ?? n, Bp = /* @__PURE__ */ Tt({
  name: "RouterView",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    process.env.NODE_ENV !== "production" && Gp();
    const o = ot(Hs), s = Ne(() => e.route || o.value), r = ot(Ni, 0), i = Ne(() => {
      let d = w(r);
      const { matched: u } = s.value;
      let a;
      for (; (a = u[d]) && !a.components; ) d++;
      return d;
    }), l = Ne(() => s.value.matched[i.value]);
    vo(Ni, Ne(() => i.value + 1)), vo(np, l), vo(Hs, s);
    const c = /* @__PURE__ */ Je();
    return At(() => [
      c.value,
      l.value,
      e.name
    ], ([d, u, a], [p, g, O]) => {
      u && (u.instances[a] = d, g && g !== u && d && d === p && (u.leaveGuards.size || (u.leaveGuards = g.leaveGuards), u.updateGuards.size || (u.updateGuards = g.updateGuards))), d && u && (!g || !Yt(u, g) || !p) && (u.enterCallbacks[a] || []).forEach((b) => b(d));
    }, { flush: "post" }), () => {
      const d = s.value, u = e.name, a = l.value, p = a && a.components[u];
      if (!p) return Pi(n.default, {
        Component: p,
        route: d
      });
      const g = a.props[u], O = g ? g === !0 ? d.params : typeof g == "function" ? g(d) : g : null, L = Zl(p, se({}, O, t, {
        onVnodeUnmounted: (H) => {
          H.component.isUnmounted && (a.instances[u] = null);
        },
        ref: c
      }));
      if (process.env.NODE_ENV !== "production" && Ct && L.ref) {
        const H = {
          depth: i.value,
          name: a.name,
          path: a.path,
          meta: a.meta
        };
        (Ke(L.ref) ? L.ref.map((P) => P.i) : [L.ref.i]).forEach((P) => {
          P.__vrv_devtools = H;
        });
      }
      return Pi(n.default, {
        Component: L,
        route: d
      }) || L;
    };
  }
});
function Pi(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Tc = Bp;
function Gp() {
  const e = Cn(), t = e.parent && e.parent.type.name, n = e.parent && e.parent.subTree && e.parent.subTree.type;
  if (t && (t === "KeepAlive" || t.includes("Transition")) && typeof n == "object" && n.name === "RouterView") {
    const o = t === "KeepAlive" ? "keep-alive" : "transition";
    X(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${o}>
    <component :is="Component" />
  </${o}>
</router-view>`);
  }
}
function Wp(e) {
  const t = Ap(e.routes, e), n = e.parseQuery || ep, o = e.stringifyQuery || bi, s = e.history;
  if (process.env.NODE_ENV !== "production" && !s) throw new Error('Provide the "history" option when calling "createRouter()": https://router.vuejs.org/api/interfaces/RouterOptions.html#history');
  const r = $n(), i = $n(), l = $n(), c = /* @__PURE__ */ va(Lt);
  let d = Lt;
  Ct && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const u = gs.bind(null, (_) => "" + _), a = gs.bind(null, jd), p = gs.bind(null, Dn);
  function g(_, I) {
    let R, G;
    return Nc(_) ? (R = t.getRecordMatcher(_), process.env.NODE_ENV !== "production" && !R && X(`Parent route "${String(_)}" not found when adding child route`, I), G = I) : G = _, t.addRoute(G, R);
  }
  function O(_) {
    const I = t.getRecordMatcher(_);
    I ? t.removeRoute(I) : process.env.NODE_ENV !== "production" && X(`Cannot remove non-existent route "${String(_)}"`);
  }
  function b() {
    return t.getRoutes().map((_) => _.record);
  }
  function L(_) {
    return !!t.getRecordMatcher(_);
  }
  function H(_, I) {
    if (I = se({}, I || c.value), typeof _ == "string") {
      const h = ms(n, _, I.path), m = t.resolve({ path: h.path }, I), E = s.createHref(h.fullPath);
      return process.env.NODE_ENV !== "production" && (E.startsWith("//") ? X(`Location "${_}" resolved to "${E}". A resolved location cannot start with multiple slashes.`) : m.matched.length || X(`No match found for location with path "${_}"`)), se(h, m, {
        params: p(m.params),
        hash: Dn(h.hash),
        redirectedFrom: void 0,
        href: E
      });
    }
    if (process.env.NODE_ENV !== "production" && !Bo(_))
      return X(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, _), H({});
    let R;
    if (_.path != null)
      process.env.NODE_ENV !== "production" && "params" in _ && !("name" in _) && Object.keys(_.params).length && X(`Path "${_.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), R = se({}, _, { path: ms(n, _.path, I.path).path });
    else {
      const h = se({}, _.params);
      for (const m in h) h[m] == null && delete h[m];
      R = se({}, _, { params: a(h) }), I.params = a(I.params);
    }
    const G = t.resolve(R, I), z = _.hash || "";
    process.env.NODE_ENV !== "production" && z && !z.startsWith("#") && X(`A \`hash\` should always start with the character "#". Replace "${z}" with "#${z}".`), G.params = u(p(G.params));
    const Ee = Hd(o, se({}, _, {
      hash: $d(z),
      path: G.path
    })), f = s.createHref(Ee);
    return process.env.NODE_ENV !== "production" && (f.startsWith("//") ? X(`Location "${_}" resolved to "${f}". A resolved location cannot start with multiple slashes.`) : G.matched.length || X(`No match found for location with path "${_.path != null ? _.path : _}"`)), se({
      fullPath: Ee,
      hash: z,
      query: o === bi ? tp(_.query) : _.query || {}
    }, G, {
      redirectedFrom: void 0,
      href: f
    });
  }
  function P(_) {
    return typeof _ == "string" ? ms(n, _, c.value.path) : se({}, _);
  }
  function M(_, I) {
    if (d !== _) return Vn(ve.NAVIGATION_CANCELLED, {
      from: I,
      to: _
    });
  }
  function oe(_) {
    return j(_);
  }
  function $(_) {
    return oe(se(P(_), { replace: !0 }));
  }
  function re(_, I) {
    const R = _.matched[_.matched.length - 1];
    if (R && R.redirect) {
      const { redirect: G } = R;
      let z = typeof G == "function" ? G(_, I) : G;
      if (typeof z == "string" && (z = z.includes("?") || z.includes("#") ? z = P(z) : { path: z }, z.params = {}), process.env.NODE_ENV !== "production" && z.path == null && !("name" in z))
        throw X(`Invalid redirect found:
${JSON.stringify(z, null, 2)}
 when navigating to "${_.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return se({
        query: _.query,
        hash: _.hash,
        params: z.path != null ? {} : _.params
      }, z);
    }
  }
  function j(_, I) {
    const R = d = H(_), G = c.value, z = _.state, Ee = _.force, f = _.replace === !0, h = re(R, G);
    if (h) return j(se(P(h), {
      state: typeof h == "object" ? se({}, z, h.state) : z,
      force: Ee,
      replace: f
    }), I || R);
    const m = R;
    m.redirectedFrom = I;
    let E;
    return !Ee && vi(o, G, R) && (E = Vn(ve.NAVIGATION_DUPLICATED, {
      to: m,
      from: G
    }), $t(G, G, !0, !1)), (E ? Promise.resolve(E) : k(m, G)).catch((v) => St(v) ? St(v, ve.NAVIGATION_GUARD_REDIRECT) ? v : Qt(v) : J(v, m, G)).then((v) => {
      if (v) {
        if (St(v, ve.NAVIGATION_GUARD_REDIRECT))
          return process.env.NODE_ENV !== "production" && vi(o, H(v.to), m) && I && (I._count = I._count ? I._count + 1 : 1) > 30 ? (X(`Detected a possibly infinite redirection in a navigation guard when going from "${G.fullPath}" to "${m.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`), Promise.reject(/* @__PURE__ */ new Error("Infinite redirect in navigation guard"))) : j(se({ replace: f }, P(v.to), {
            state: typeof v.to == "object" ? se({}, z, v.to.state) : z,
            force: Ee
          }), I || m);
      } else v = Z(m, G, !0, f, z);
      return T(m, G, v), v;
    });
  }
  function Oe(_, I) {
    const R = M(_, I);
    return R ? Promise.reject(R) : Promise.resolve();
  }
  function fe(_) {
    const I = kt.values().next().value;
    return I && typeof I.runWithContext == "function" ? I.runWithContext(_) : _();
  }
  function k(_, I) {
    let R;
    const [G, z, Ee] = sp(_, I);
    R = vs(G.reverse(), "beforeRouteLeave", _, I);
    for (const h of G) h.leaveGuards.forEach((m) => {
      R.push(Ht(m, _, I));
    });
    const f = Oe.bind(null, _, I);
    return R.push(f), jt(R).then(() => {
      R = [];
      for (const h of r.list()) R.push(Ht(h, _, I));
      return R.push(f), jt(R);
    }).then(() => {
      R = vs(z, "beforeRouteUpdate", _, I);
      for (const h of z) h.updateGuards.forEach((m) => {
        R.push(Ht(m, _, I));
      });
      return R.push(f), jt(R);
    }).then(() => {
      R = [];
      for (const h of Ee) if (h.beforeEnter) if (Ke(h.beforeEnter)) for (const m of h.beforeEnter) R.push(Ht(m, _, I));
      else R.push(Ht(h.beforeEnter, _, I));
      return R.push(f), jt(R);
    }).then(() => (_.matched.forEach((h) => h.enterCallbacks = {}), R = vs(Ee, "beforeRouteEnter", _, I, fe), R.push(f), jt(R))).then(() => {
      R = [];
      for (const h of i.list()) R.push(Ht(h, _, I));
      return R.push(f), jt(R);
    }).catch((h) => St(h, ve.NAVIGATION_CANCELLED) ? h : Promise.reject(h));
  }
  function T(_, I, R) {
    l.list().forEach((G) => fe(() => G(_, I, R)));
  }
  function Z(_, I, R, G, z) {
    const Ee = M(_, I);
    if (Ee) return Ee;
    const f = I === Lt, h = Ct ? history.state : {};
    R && (G || f ? s.replace(_.fullPath, se({ scroll: f && h && h.scroll }, z)) : s.push(_.fullPath, z)), c.value = _, $t(_, I, R, f), Qt();
  }
  let ge;
  function at() {
    ge || (ge = s.listen((_, I, R) => {
      if (!Mt.listening) return;
      const G = H(_), z = re(G, Mt.currentRoute.value);
      if (z) {
        j(se(z, {
          replace: !0,
          force: !0
        }), G).catch(Wn);
        return;
      }
      d = G;
      const Ee = c.value;
      Ct && Jd(yi(Ee.fullPath, R.delta), ts()), k(G, Ee).catch((f) => St(f, ve.NAVIGATION_ABORTED | ve.NAVIGATION_CANCELLED) ? f : St(f, ve.NAVIGATION_GUARD_REDIRECT) ? (j(se(P(f.to), { force: !0 }), G).then((h) => {
        St(h, ve.NAVIGATION_ABORTED | ve.NAVIGATION_DUPLICATED) && !R.delta && R.type === js.pop && s.go(-1, !1);
      }).catch(Wn), Promise.reject()) : (R.delta && s.go(-R.delta, !1), J(f, G, Ee))).then((f) => {
        f = f || Z(G, Ee, !1), f && (R.delta && !St(f, ve.NAVIGATION_CANCELLED) ? s.go(-R.delta, !1) : R.type === js.pop && St(f, ve.NAVIGATION_ABORTED | ve.NAVIGATION_DUPLICATED) && s.go(-1, !1)), T(G, Ee, f);
      }).catch(Wn);
    }));
  }
  let Re = $n(), we = $n(), Q;
  function J(_, I, R) {
    Qt(_);
    const G = we.list();
    return G.length ? G.forEach((z) => z(_, I, R)) : (process.env.NODE_ENV !== "production" && X("uncaught error during route navigation:"), console.error(_)), Promise.reject(_);
  }
  function pe() {
    return Q && c.value !== Lt ? Promise.resolve() : new Promise((_, I) => {
      Re.add([_, I]);
    });
  }
  function Qt(_) {
    return Q || (Q = !_, at(), Re.list().forEach(([I, R]) => _ ? R(_) : I()), Re.reset()), _;
  }
  function $t(_, I, R, G) {
    const { scrollBehavior: z } = e;
    if (!Ct || !z) return Promise.resolve();
    const Ee = !R && Yd(yi(_.fullPath, 0)) || (G || !R) && history.state && history.state.scroll || null;
    return To().then(() => z(_, I, Ee)).then((f) => f && qd(f)).catch((f) => J(f, _, I));
  }
  const ut = (_) => s.go(_);
  let ze;
  const kt = /* @__PURE__ */ new Set(), Mt = {
    currentRoute: c,
    listening: !0,
    addRoute: g,
    removeRoute: O,
    clearRoutes: t.clearRoutes,
    hasRoute: L,
    getRoutes: b,
    resolve: H,
    options: e,
    push: oe,
    replace: $,
    go: ut,
    back: () => ut(-1),
    forward: () => ut(1),
    beforeEach: r.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: we.add,
    isReady: pe,
    install(_) {
      _.component("RouterLink", Er), _.component("RouterView", Tc), _.config.globalProperties.$router = Mt, Object.defineProperty(_.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => w(c)
      }), Ct && !ze && c.value === Lt && (ze = !0, oe(s.location).catch((G) => {
        process.env.NODE_ENV !== "production" && X("Unexpected error when starting the router:", G);
      }));
      const I = {};
      for (const G in Lt) Object.defineProperty(I, G, {
        get: () => c.value[G],
        enumerable: !0
      });
      _.provide(_r, Mt), _.provide(vr, /* @__PURE__ */ ll(I)), _.provide(Hs, c);
      const R = _.unmount;
      kt.add(_), _.unmount = function() {
        kt.delete(_), kt.size < 1 && (d = Lt, ge && ge(), ge = null, c.value = Lt, ze = !1, Q = !1), R();
      }, process.env.NODE_ENV !== "production" && Ct && ip(_, Mt, t);
    }
  };
  function jt(_) {
    return _.reduce((I, R) => I.then(() => fe(R)), Promise.resolve());
  }
  return Mt;
}
function Kp(e) {
  return ot(vr);
}
const Ti = "openclaw-guard.theme", Ii = "openclaw-guard.lang";
function zp() {
  return typeof window > "u" ? "dark" : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
const co = /* @__PURE__ */ md("ui", () => {
  const e = /* @__PURE__ */ Je("auto"), t = /* @__PURE__ */ Je("zh"), n = /* @__PURE__ */ Je(!1), o = Ne(() => e.value === "auto" ? zp() : e.value);
  function s() {
    typeof document > "u" || (document.documentElement.dataset.theme = o.value, document.documentElement.lang = t.value === "zh" ? "zh-CN" : "en");
  }
  function r() {
    if (n.value || typeof window > "u") {
      s();
      return;
    }
    const d = window.localStorage.getItem(Ti), u = window.localStorage.getItem(Ii);
    (d === "auto" || d === "light" || d === "dark") && (e.value = d), (u === "zh" || u === "en") && (t.value = u), n.value = !0, s();
  }
  function i(d) {
    e.value = d, typeof window < "u" && window.localStorage.setItem(Ti, d), s();
  }
  function l(d) {
    t.value = d, typeof window < "u" && window.localStorage.setItem(Ii, d), s();
  }
  function c(d, u) {
    return t.value === "zh" ? d : u;
  }
  return {
    themePreference: e,
    language: t,
    resolvedTheme: o,
    hydrate: r,
    setThemePreference: i,
    setLanguage: l,
    applyDocumentState: s,
    label: c
  };
}), qp = { class: "guard-shell" }, Jp = { class: "guard-shell__topbar" }, Yp = { class: "topbar-actions" }, Qp = { class: "toolbar-menu" }, Xp = ["title"], Zp = { class: "toolbar-popover" }, eh = ["onClick"], th = { class: "toolbar-menu" }, nh = ["title"], oh = { class: "toolbar-popover" }, sh = {
  class: "toolbar-link",
  href: "/",
  target: "_blank",
  rel: "noreferrer"
}, rh = { class: "guard-shell__body" }, ih = { class: "guard-shell__sidebar" }, lh = { class: "sidebar-current" }, ch = { class: "sidebar-current__label" }, ah = { class: "sidebar-current__title" }, uh = { class: "sidebar-current__meta" }, fh = { class: "sidebar-nav" }, dh = { class: "sidebar-group__title" }, ph = { class: "guard-shell__content" }, hh = "/ui/logo.png", gh = /* @__PURE__ */ Tt({
  __name: "GuardShell",
  setup(e) {
    const t = co(), n = Kp(), o = [
      {
        id: "core",
        zh: "核心控制台",
        en: "Core Control",
        items: [
          { to: "/", zh: "首页", en: "Home" },
          { to: "/operations", zh: "运维", en: "Operations" },
          { to: "/openclaw", zh: "OpenClaw", en: "OpenClaw" },
          { to: "/channels", zh: "渠道", en: "Channels" },
          { to: "/models", zh: "模型", en: "Models" },
          { to: "/security", zh: "安全", en: "Security" },
          { to: "/recovery", zh: "备份与恢复", en: "Backup & Recovery" }
        ]
      },
      {
        id: "workspace",
        zh: "工作区与角色",
        en: "Workspace & Roles",
        items: [
          { to: "/roles", zh: "角色", en: "Roles" },
          { to: "/files", zh: "文件", en: "Files" },
          { to: "/search", zh: "搜索", en: "Search" }
        ]
      },
      {
        id: "runtime",
        zh: "运行与排查",
        en: "Runtime & Troubleshooting",
        items: [
          { to: "/sessions", zh: "会话", en: "Sessions" },
          { to: "/logs", zh: "日志", en: "Logs" },
          { to: "/notifications", zh: "通知", en: "Notifications" }
        ]
      },
      {
        id: "automation",
        zh: "自动化",
        en: "Automation",
        items: [
          { to: "/cron", zh: "Cron", en: "Cron" }
        ]
      }
    ], s = [
      { value: "auto", icon: "◐", zh: "跟随系统", en: "Auto" },
      { value: "light", icon: "☀", zh: "浅色", en: "Light" },
      { value: "dark", icon: "☾", zh: "深色", en: "Dark" }
    ], r = Ne(() => t.themePreference === "light" ? "☀" : t.themePreference === "dark" ? "☾" : "◐"), i = Ne(() => {
      const l = o.flatMap((c) => c.items).find((c) => c.to === n.path);
      return l ? t.label(l.zh, l.en) : t.label("首页", "Home");
    });
    return ir(() => {
      t.hydrate();
    }), At(() => t.themePreference, () => t.applyDocumentState()), At(() => t.language, () => t.applyDocumentState()), (l, c) => (ae(), me("div", qp, [
      S("header", Jp, [
        S("div", { class: "brand-lockup" }, [
          S("img", {
            class: "brand-lockup__logo",
            src: hh,
            alt: "OpenClaw Guard"
          }),
          c[2] || (c[2] = S("div", null, [
            S("p", { class: "brand-lockup__eyebrow" }, "OpenClaw Guard Next"),
            S("h1", { class: "brand-lockup__title" }, "OpenClaw Guard")
          ], -1))
        ]),
        S("div", Yp, [
          S("div", Qp, [
            S("button", {
              class: "toolbar-icon",
              type: "button",
              title: w(t).label("主题", "Theme")
            }, F(r.value), 9, Xp),
            S("div", Zp, [
              (ae(), me(be, null, Eo(s, (d) => S("button", {
                key: d.value,
                class: "toolbar-popover__item",
                type: "button",
                onClick: (u) => w(t).setThemePreference(d.value)
              }, [
                S("span", null, F(d.icon), 1),
                S("span", null, F(w(t).label(d.zh, d.en)), 1)
              ], 8, eh)), 64))
            ])
          ]),
          S("div", th, [
            S("button", {
              class: "toolbar-icon",
              type: "button",
              title: w(t).label("语言", "Language")
            }, " 🌐 ", 8, nh),
            S("div", oh, [
              S("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: c[0] || (c[0] = (d) => w(t).setLanguage("zh"))
              }, [...c[3] || (c[3] = [
                S("span", null, "中", -1),
                S("span", null, "中文", -1)
              ])]),
              S("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: c[1] || (c[1] = (d) => w(t).setLanguage("en"))
              }, [...c[4] || (c[4] = [
                S("span", null, "EN", -1),
                S("span", null, "English", -1)
              ])])
            ])
          ]),
          S("a", sh, F(w(t).label("打开当前正式控制台", "Open current production console")), 1)
        ])
      ]),
      S("div", rh, [
        S("aside", ih, [
          S("div", lh, [
            S("p", ch, F(w(t).label("当前页面", "Current page")), 1),
            S("p", ah, F(i.value), 1),
            S("p", uh, F(w(t).label("这是 dev-rust 线上的模块化壳层预览。", "This is the modular preview shell on the dev-rust line.")), 1)
          ]),
          S("nav", fh, [
            (ae(), me(be, null, Eo(o, (d) => S("section", {
              key: d.id,
              class: "sidebar-group"
            }, [
              S("p", dh, F(w(t).label(d.zh, d.en)), 1),
              (ae(!0), me(be, null, Eo(d.items, (u) => (ae(), Yn(w(Er), {
                key: u.to,
                to: u.to,
                class: zo(["sidebar-link", { "sidebar-link--active": w(n).path === u.to }])
              }, {
                default: et(() => [
                  fr(F(w(t).label(u.zh, u.en)), 1)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128))
            ])), 64))
          ])
        ]),
        S("main", ph, [
          he(w(Tc))
        ])
      ])
    ]));
  }
}), mh = /* @__PURE__ */ Tt({
  __name: "App",
  setup(e) {
    return (t, n) => (ae(), Yn(gh));
  }
});
function yr(e, t = null) {
  const n = /* @__PURE__ */ Je(t), o = /* @__PURE__ */ Je(t === null), s = /* @__PURE__ */ Je(!1), r = /* @__PURE__ */ Je(null);
  async function i(l = {}) {
    l.silent === !0 ? s.value = !0 : o.value = !0, r.value = null;
    try {
      n.value = await e();
    } catch (d) {
      r.value = d instanceof Error ? d.message : String(d);
    } finally {
      o.value = !1, s.value = !1;
    }
  }
  return ir(() => {
    i();
  }), {
    data: n,
    loading: o,
    refreshing: s,
    error: r,
    execute: i
  };
}
const _h = { class: "page-card" }, vh = { class: "page-card__header" }, Eh = {
  key: 0,
  class: "page-card__eyebrow"
}, yh = { class: "page-card__title" }, bh = { class: "page-card__body" }, zt = /* @__PURE__ */ Tt({
  __name: "PageCard",
  props: {
    title: {},
    eyebrow: {}
  },
  setup(e) {
    return (t, n) => (ae(), me("section", _h, [
      S("header", vh, [
        S("div", null, [
          e.eyebrow ? (ae(), me("p", Eh, F(e.eyebrow), 1)) : es("", !0),
          S("h2", yh, F(e.title), 1)
        ]),
        $r(t.$slots, "actions")
      ]),
      S("div", bh, [
        $r(t.$slots, "default")
      ])
    ]));
  }
});
async function Kt(e) {
  const t = await fetch(e, {
    headers: {
      Accept: "application/json"
    }
  });
  if (!t.ok) {
    const n = await t.text();
    throw new Error(n || `Request failed with ${t.status}`);
  }
  return t.json();
}
async function Nh() {
  const [e, t, n, o] = await Promise.all([
    Kt("/api/info"),
    Kt("/api/dashboard/overview"),
    Kt("/api/service/status"),
    Kt("/api/openclaw/status")
  ]);
  return { info: e, overview: t, services: n, openclaw: o };
}
async function Oh() {
  const [e, t] = await Promise.all([
    Kt("/api/service/status"),
    Kt("/api/web-background/report")
  ]);
  return { services: e, webReport: t };
}
async function wh() {
  const [e, t] = await Promise.all([
    Kt("/api/openclaw/status"),
    Kt("/api/openclaw/targets")
  ]);
  return { status: e, targets: t };
}
const Sh = { class: "page-stack" }, Dh = { class: "page-header" }, Vh = { class: "page-header__eyebrow" }, xh = { class: "page-header__title" }, Ch = { class: "page-header__description" }, Ah = {
  key: 0,
  class: "page-empty"
}, Rh = {
  key: 1,
  class: "page-empty page-empty--error"
}, Ph = { class: "stat-grid" }, Th = { class: "stat-card" }, Ih = { class: "stat-card" }, $h = { class: "stat-card" }, kh = { class: "stat-card__label" }, Mh = { class: "list-stack" }, jh = { class: "action-row" }, Lh = { class: "action-row" }, Fh = {
  class: "inline-link",
  href: "/",
  target: "_blank",
  rel: "noreferrer"
}, Hh = {
  key: 0,
  class: "list-stack"
}, Uh = {
  key: 1,
  class: "muted-copy"
}, Bh = /* @__PURE__ */ Tt({
  __name: "DashboardPage",
  setup(e) {
    const t = co(), n = yr(() => Nh()), o = Ne(() => {
      var r, i;
      const s = (i = (r = n.data) == null ? void 0 : r.overview) == null ? void 0 : i.risks;
      return Array.isArray(s) ? s : [];
    });
    return (s, r) => (ae(), me("div", Sh, [
      S("header", Dh, [
        S("div", null, [
          S("p", Vh, F(w(t).label("首页 / First slice", "Home / First slice")), 1),
          S("h2", xh, F(w(t).label("带路首页", "Guided Home")), 1),
          S("p", Ch, F(w(t).label("先回答现在能不能用、下一步该做什么，以及哪里可能有风险。", "Answer what works now, what to do next, and where risk still exists.")), 1)
        ]),
        S("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (i) => w(n).execute({ silent: !0 }))
        }, F(w(n).refreshing ? w(t).label("刷新中…", "Refreshing…") : w(t).label("刷新", "Refresh")), 1)
      ]),
      w(n).loading ? (ae(), me("div", Ah, F(w(t).label("正在加载首页快照…", "Loading the home snapshot…")), 1)) : w(n).error ? (ae(), me("div", Rh, F(w(n).error), 1)) : w(n).data ? (ae(), me(be, { key: 2 }, [
        he(zt, {
          title: w(t).label("当前可用性", "Current availability"),
          eyebrow: "Status"
        }, {
          default: et(() => {
            var i, l, c, d, u, a, p, g, O, b;
            return [
              S("div", Ph, [
                S("article", Th, [
                  r[1] || (r[1] = S("p", { class: "stat-card__label" }, "Guard", -1)),
                  S("strong", null, F(((i = w(n).data.info) == null ? void 0 : i.guardVersion) || "unknown"), 1),
                  S("span", null, F(((l = w(n).data.info) == null ? void 0 : l.platform) || "unknown platform"), 1)
                ]),
                S("article", Ih, [
                  r[2] || (r[2] = S("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                  S("strong", null, F((d = (c = w(n).data.info) == null ? void 0 : c.openclaw) != null && d.installed ? ((a = (u = w(n).data.info) == null ? void 0 : u.openclaw) == null ? void 0 : a.version) || "installed" : w(t).label("未安装", "Not installed")), 1),
                  S("span", null, F(((g = (p = w(n).data.info) == null ? void 0 : p.openclaw) == null ? void 0 : g.detectedSource) || w(t).label("待检测", "Pending detection")), 1)
                ]),
                S("article", $h, [
                  S("p", kh, F(w(t).label("Node 运行时", "Node runtime")), 1),
                  S("strong", null, F(((O = w(n).data.info) == null ? void 0 : O.nodeVersion) || "unknown"), 1),
                  S("span", null, F(((b = w(n).data.info) == null ? void 0 : b.user) || w(t).label("用户未知", "Unknown user")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        he(zt, {
          title: w(t).label("建议动作", "Suggested actions"),
          eyebrow: "Next"
        }, {
          default: et(() => [
            S("div", Mh, [
              S("article", jh, [
                S("div", null, [
                  S("h3", null, F(w(t).label("继续迁移首页 / 运维 / OpenClaw", "Keep migrating Home / Operations / OpenClaw")), 1),
                  S("p", null, F(w(t).label("这一版 Vue 壳层已经接上真实 API，下一批继续迁移渠道、模型、安全、备份与恢复。", "This Vue shell already talks to real APIs; next we migrate Channels, Models, Security, and Recovery.")), 1)
                ]),
                he(w(Er), {
                  class: "inline-link",
                  to: "/operations"
                }, {
                  default: et(() => [
                    fr(F(w(t).label("查看运维页", "Open operations")), 1)
                  ]),
                  _: 1
                })
              ]),
              S("article", Lh, [
                S("div", null, [
                  S("h3", null, F(w(t).label("保持旧控制台可用", "Keep the legacy console available")), 1),
                  S("p", null, F(w(t).label("新壳层目前是开发线入口，不替换正式运行时。需要完整能力时仍可打开当前正式控制台。", "The new shell is a dev-line entry for now and does not replace the production runtime yet.")), 1)
                ]),
                S("a", Fh, F(w(t).label("打开正式控制台", "Open production console")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        he(zt, {
          title: w(t).label("风险提示", "Risk summary"),
          eyebrow: "Risk"
        }, {
          default: et(() => [
            o.value.length ? (ae(), me("div", Hh, [
              (ae(!0), me(be, null, Eo(o.value, (i, l) => (ae(), me("article", {
                key: `${i.title}-${l}`,
                class: "risk-row"
              }, [
                S("strong", null, F(i.title || w(t).label("未命名风险", "Unnamed risk")), 1),
                S("span", null, F(i.detail || w(t).label("暂无详细描述。", "No detail provided.")), 1)
              ]))), 128))
            ])) : (ae(), me("p", Uh, F(w(t).label("当前 API 未返回结构化风险列表，因此这里先显示为安全占位。后续页面迁移时会继续精炼。", "The current API did not return structured risks, so this section stays intentionally lightweight for the first scaffold.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : es("", !0)
    ]));
  }
}), Gh = { class: "page-stack" }, Wh = { class: "page-header" }, Kh = { class: "page-header__eyebrow" }, zh = { class: "page-header__title" }, qh = { class: "page-header__description" }, Jh = {
  key: 0,
  class: "page-empty"
}, Yh = {
  key: 1,
  class: "page-empty page-empty--error"
}, Qh = { class: "code-panel" }, Xh = { class: "code-panel" }, Zh = /* @__PURE__ */ Tt({
  __name: "OpenClawPage",
  setup(e) {
    const t = co(), n = yr(() => wh());
    function o(s) {
      return JSON.stringify(s, null, 2);
    }
    return (s, r) => (ae(), me("div", Gh, [
      S("header", Wh, [
        S("div", null, [
          S("p", Kh, F(w(t).label("OpenClaw / First slice", "OpenClaw / First slice")), 1),
          S("h2", zh, F(w(t).label("OpenClaw 生命周期面板", "OpenClaw lifecycle panel")), 1),
          S("p", qh, F(w(t).label("保留现有后端接口，只把读取、结构和高级区分层迁到 Vue 壳层。", "Keep the current backend API and move its reads, structure, and advanced layout into the Vue shell.")), 1)
        ]),
        S("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (i) => w(n).execute({ silent: !0 }))
        }, F(w(n).refreshing ? w(t).label("刷新中…", "Refreshing…") : w(t).label("刷新", "Refresh")), 1)
      ]),
      w(n).loading ? (ae(), me("div", Jh, F(w(t).label("正在加载 OpenClaw 状态…", "Loading the OpenClaw status…")), 1)) : w(n).error ? (ae(), me("div", Yh, F(w(n).error), 1)) : w(n).data ? (ae(), me(be, { key: 2 }, [
        he(zt, {
          title: w(t).label("状态快照", "Status snapshot"),
          eyebrow: "Status"
        }, {
          default: et(() => [
            S("pre", Qh, F(o(w(n).data.status)), 1)
          ]),
          _: 1
        }, 8, ["title"]),
        he(zt, {
          title: w(t).label("可选目标与回退目录", "Targets and rollback catalog"),
          eyebrow: "Targets"
        }, {
          default: et(() => [
            S("pre", Xh, F(o(w(n).data.targets)), 1)
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : es("", !0)
    ]));
  }
}), eg = { class: "page-stack" }, tg = { class: "page-header" }, ng = { class: "page-header__eyebrow" }, og = { class: "page-header__title" }, sg = { class: "page-header__description" }, rg = {
  key: 0,
  class: "page-empty"
}, ig = {
  key: 1,
  class: "page-empty page-empty--error"
}, lg = { class: "code-panel" }, cg = { class: "code-panel" }, ag = /* @__PURE__ */ Tt({
  __name: "OperationsPage",
  setup(e) {
    const t = co(), n = yr(() => Oh());
    function o(s) {
      return JSON.stringify(s, null, 2);
    }
    return (s, r) => (ae(), me("div", eg, [
      S("header", tg, [
        S("div", null, [
          S("p", ng, F(w(t).label("运维 / First slice", "Operations / First slice")), 1),
          S("h2", og, F(w(t).label("运行态与后台服务", "Runtime and background services")), 1),
          S("p", sg, F(w(t).label("先把状态读取、最小刷新和结构化信息展示模块化。后续再逐步迁移交互按钮。", "Modularize status reads, light refresh, and structured rendering first. Button interactions can follow in later slices.")), 1)
        ]),
        S("button", {
          class: "page-header__action",
          type: "button",
          onClick: r[0] || (r[0] = (i) => w(n).execute({ silent: !0 }))
        }, F(w(n).refreshing ? w(t).label("刷新中…", "Refreshing…") : w(t).label("刷新", "Refresh")), 1)
      ]),
      w(n).loading ? (ae(), me("div", rg, F(w(t).label("正在加载运维状态…", "Loading operations status…")), 1)) : w(n).error ? (ae(), me("div", ig, F(w(n).error), 1)) : w(n).data ? (ae(), me(be, { key: 2 }, [
        he(zt, {
          title: w(t).label("后台 Web 报告", "Background web report"),
          eyebrow: "Web report"
        }, {
          default: et(() => [
            S("pre", lg, F(o(w(n).data.webReport)), 1)
          ]),
          _: 1
        }, 8, ["title"]),
        he(zt, {
          title: w(t).label("服务状态原始快照", "Service status snapshot"),
          eyebrow: "Services"
        }, {
          default: et(() => [
            S("pre", cg, F(o(w(n).data.services)), 1)
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : es("", !0)
    ]));
  }
}), ug = { class: "page-stack" }, fg = { class: "page-header" }, dg = { class: "page-header__eyebrow" }, pg = { class: "page-header__title" }, hg = { class: "page-header__description" }, gg = ["href"], mg = { class: "muted-copy" }, _g = /* @__PURE__ */ Tt({
  __name: "PlaceholderPage",
  props: {
    titleZh: {},
    titleEn: {},
    descriptionZh: {},
    descriptionEn: {},
    legacyHash: {}
  },
  setup(e) {
    const t = e, n = co(), o = Ne(() => n.label(t.titleZh, t.titleEn)), s = Ne(() => n.label(t.descriptionZh, t.descriptionEn)), r = Ne(() => n.label("打开当前正式控制台中的这一页", "Open this page in the current production console"));
    return (i, l) => (ae(), me("div", ug, [
      S("header", fg, [
        S("div", null, [
          S("p", dg, F(w(n).label("迁移排队中", "Queued for migration")), 1),
          S("h2", pg, F(o.value), 1),
          S("p", hg, F(s.value), 1)
        ]),
        S("a", {
          class: "page-header__action page-header__action--link",
          href: `/${e.legacyHash}`,
          target: "_blank",
          rel: "noreferrer"
        }, F(r.value), 9, gg)
      ]),
      he(zt, {
        title: w(n).label("当前阶段说明", "Current phase")
      }, {
        default: et(() => [
          S("p", mg, F(w(n).label("这一页已经纳入新的 Vue + Pinia + Router 骨架，但业务区块还没从旧版原生脚本完全迁过来。保留直接跳转旧控制台，是为了让迁移期间的实际操作不中断。", "This page is already part of the new Vue + Pinia + Router skeleton, but its business modules have not fully moved over from the native script yet. The legacy shortcut keeps real operations uninterrupted during the migration window.")), 1)
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
});
function Ye(e, t, n, o, s, r) {
  return {
    path: e,
    component: _g,
    props: {
      titleZh: t,
      titleEn: n,
      descriptionZh: o,
      descriptionEn: s,
      legacyHash: r
    }
  };
}
const vg = Wp({
  history: yp(),
  routes: [
    { path: "/", name: "overview", component: Bh },
    { path: "/operations", name: "operations", component: ag },
    { path: "/openclaw", name: "openclaw", component: Zh },
    Ye("/channels", "渠道", "Channels", "对接官方渠道与后续扩展入口。", "Connect official channels and future extensions.", "#channels"),
    Ye("/models", "模型", "Models", "配置模型提供方、主模型与回退策略。", "Configure model providers, primary routing, and fallbacks.", "#models"),
    Ye("/security", "安全", "Security", "查看权限模式、安全检查与主机加固建议。", "Review permission modes, security checks, and hardening guidance.", "#security"),
    Ye("/recovery", "备份与恢复", "Backup & Recovery", "管理恢复点、保护状态与高级 Git 能力。", "Manage recovery points, protection status, and advanced Git controls.", "#recovery"),
    Ye("/roles", "角色", "Roles", "浏览角色配置与工作区角色视图。", "Browse role definitions and workspace role views.", "#agents"),
    Ye("/files", "文件", "Files", "管理记忆、文件与当前工作区内容。", "Manage memory files, documents, and workspace content.", "#files"),
    Ye("/search", "搜索", "Search", "统一搜索工作区中的关键资料与记忆。", "Search across workspace documents and memory files.", "#search"),
    Ye("/sessions", "会话", "Sessions", "查看会话状态与用量估算。", "Inspect session health and usage estimates.", "#sessions"),
    Ye("/logs", "日志", "Logs", "聚合查看运行日志与排障信息。", "Inspect runtime logs and troubleshooting output.", "#logs"),
    Ye("/notifications", "通知", "Notifications", "查看提醒与时间线事件。", "Review alerts and timeline activity.", "#notifications"),
    Ye("/cron", "Cron", "Cron", "管理自动化任务与定时执行计划。", "Manage automation tasks and scheduled execution.", "#cron"),
    { path: "/ai", redirect: "/models" },
    { path: "/git-sync", redirect: "/recovery" },
    { path: "/memory", redirect: "/files" },
    { path: "/activity", redirect: "/notifications" },
    { path: "/costs", redirect: "/sessions" }
  ]
});
kf(mh).use(dd()).use(vg).mount("#guard-next-app");
