/**
* @vue/shared v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function al(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const De = {}, rs = [], Et = () => {
}, Va = () => !1, on = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), il = (e) => e.startsWith("onUpdate:"), Qe = Object.assign, ol = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, ko = Object.prototype.hasOwnProperty, Me = (e, t) => ko.call(e, t), me = Array.isArray, cs = (e) => Us(e) === "[object Map]", ms = (e) => Us(e) === "[object Set]", Nl = (e) => Us(e) === "[object Date]", ve = (e) => typeof e == "function", We = (e) => typeof e == "string", vt = (e) => typeof e == "symbol", Ie = (e) => e !== null && typeof e == "object", Ga = (e) => (Ie(e) || ve(e)) && ve(e.then) && ve(e.catch), Ba = Object.prototype.toString, Us = (e) => Ba.call(e), $o = (e) => Us(e).slice(8, -1), Ha = (e) => Us(e) === "[object Object]", rn = (e) => We(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $s = /* @__PURE__ */ al(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), cn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, So = /-\w/g, mt = cn(
  (e) => e.replace(So, (t) => t.slice(1).toUpperCase())
), Co = /\B([A-Z])/g, Qt = cn(
  (e) => e.replace(Co, "-$1").toLowerCase()
), Wa = cn((e) => e.charAt(0).toUpperCase() + e.slice(1)), xn = cn(
  (e) => e ? `on${Wa(e)}` : ""
), Rt = (e, t) => !Object.is(e, t), zs = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, ja = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, un = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Dl;
const dn = () => Dl || (Dl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function rl(e) {
  if (me(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], i = We(n) ? To(n) : rl(n);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (We(e) || Ie(e))
    return e;
}
const xo = /;(?![^(]*\))/g, Ro = /:([^]+)/, Eo = /\/\*[^]*?\*\//g;
function To(e) {
  const t = {};
  return e.replace(Eo, "").split(xo).forEach((s) => {
    if (s) {
      const n = s.split(Ro);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function pe(e) {
  let t = "";
  if (We(e))
    t = e;
  else if (me(e))
    for (let s = 0; s < e.length; s++) {
      const n = pe(e[s]);
      n && (t += n + " ");
    }
  else if (Ie(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Ao = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Po = /* @__PURE__ */ al(Ao);
function Ka(e) {
  return !!e || e === "";
}
function Mo(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = qt(e[n], t[n]);
  return s;
}
function qt(e, t) {
  if (e === t) return !0;
  let s = Nl(e), n = Nl(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = vt(e), n = vt(t), s || n)
    return e === t;
  if (s = me(e), n = me(t), s || n)
    return s && n ? Mo(e, t) : !1;
  if (s = Ie(e), n = Ie(t), s || n) {
    if (!s || !n)
      return !1;
    const i = Object.keys(e).length, r = Object.keys(t).length;
    if (i !== r)
      return !1;
    for (const c in e) {
      const u = e.hasOwnProperty(c), d = t.hasOwnProperty(c);
      if (u && !d || !u && d || !qt(e[c], t[c]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function cl(e, t) {
  return e.findIndex((s) => qt(s, t));
}
const za = (e) => !!(e && e.__v_isRef === !0), o = (e) => We(e) ? e : e == null ? "" : me(e) || Ie(e) && (e.toString === Ba || !ve(e.toString)) ? za(e) ? o(e.value) : JSON.stringify(e, qa, 2) : String(e), qa = (e, t) => za(t) ? qa(e, t.value) : cs(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, i], r) => (s[Rn(n, r) + " =>"] = i, s),
    {}
  )
} : ms(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Rn(s))
} : vt(t) ? Rn(t) : Ie(t) && !me(t) && !Ha(t) ? String(t) : t, Rn = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    vt(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Xe;
class Ja {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = Xe, !t && Xe && (this.index = (Xe.scopes || (Xe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = Xe;
      try {
        return Xe = this, t();
      } finally {
        Xe = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Xe, Xe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Xe = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Qa(e) {
  return new Ja(e);
}
function Ya() {
  return Xe;
}
function Oo(e, t = !1) {
  Xe && Xe.cleanups.push(e);
}
let Fe;
const En = /* @__PURE__ */ new WeakSet();
class Za {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Xe && Xe.active && Xe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, En.has(this) && (En.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ei(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ll(this), ti(this);
    const t = Fe, s = bt;
    Fe = this, bt = !0;
    try {
      return this.fn();
    } finally {
      si(this), Fe = t, bt = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        fl(t);
      this.deps = this.depsTail = void 0, Ll(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? En.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Gn(this) && this.run();
  }
  get dirty() {
    return Gn(this);
  }
}
let Xa = 0, Ss, Cs;
function ei(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Cs, Cs = e;
    return;
  }
  e.next = Ss, Ss = e;
}
function ul() {
  Xa++;
}
function dl() {
  if (--Xa > 0)
    return;
  if (Cs) {
    let t = Cs;
    for (Cs = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Ss; ) {
    let t = Ss;
    for (Ss = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function ti(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function si(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), fl(n), Io(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = s;
}
function Gn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ni(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ni(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ms) || (e.globalVersion = Ms, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Gn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = Fe, n = bt;
  Fe = e, bt = !0;
  try {
    ti(e);
    const i = e.fn(e._value);
    (t.version === 0 || Rt(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    Fe = s, bt = n, si(e), e.flags &= -3;
  }
}
function fl(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      fl(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Io(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let bt = !0;
const li = [];
function Ft() {
  li.push(bt), bt = !1;
}
function Ut() {
  const e = li.pop();
  bt = e === void 0 ? !0 : e;
}
function Ll(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = Fe;
    Fe = void 0;
    try {
      t();
    } finally {
      Fe = s;
    }
  }
}
let Ms = 0;
class No {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class pl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Fe || !bt || Fe === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Fe)
      s = this.activeLink = new No(Fe, this), Fe.deps ? (s.prevDep = Fe.depsTail, Fe.depsTail.nextDep = s, Fe.depsTail = s) : Fe.deps = Fe.depsTail = s, ai(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = Fe.depsTail, s.nextDep = void 0, Fe.depsTail.nextDep = s, Fe.depsTail = s, Fe.deps === s && (Fe.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, Ms++, this.notify(t);
  }
  notify(t) {
    ul();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      dl();
    }
  }
}
function ai(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        ai(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Ys = /* @__PURE__ */ new WeakMap(), ts = /* @__PURE__ */ Symbol(
  ""
), Bn = /* @__PURE__ */ Symbol(
  ""
), Os = /* @__PURE__ */ Symbol(
  ""
);
function et(e, t, s) {
  if (bt && Fe) {
    let n = Ys.get(e);
    n || Ys.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new pl()), i.map = n, i.key = s), i.track();
  }
}
function Nt(e, t, s, n, i, r) {
  const c = Ys.get(e);
  if (!c) {
    Ms++;
    return;
  }
  const u = (d) => {
    d && d.trigger();
  };
  if (ul(), t === "clear")
    c.forEach(u);
  else {
    const d = me(e), h = d && rn(s);
    if (d && s === "length") {
      const f = Number(n);
      c.forEach((p, g) => {
        (g === "length" || g === Os || !vt(g) && g >= f) && u(p);
      });
    } else
      switch ((s !== void 0 || c.has(void 0)) && u(c.get(s)), h && u(c.get(Os)), t) {
        case "add":
          d ? h && u(c.get("length")) : (u(c.get(ts)), cs(e) && u(c.get(Bn)));
          break;
        case "delete":
          d || (u(c.get(ts)), cs(e) && u(c.get(Bn)));
          break;
        case "set":
          cs(e) && u(c.get(ts));
          break;
      }
  }
  dl();
}
function Do(e, t) {
  const s = Ys.get(e);
  return s && s.get(t);
}
function ns(e) {
  const t = /* @__PURE__ */ xe(e);
  return t === e ? t : (et(t, "iterate", Os), /* @__PURE__ */ pt(e) ? t : t.map(yt));
}
function fn(e) {
  return et(e = /* @__PURE__ */ xe(e), "iterate", Os), e;
}
function Ct(e, t) {
  return /* @__PURE__ */ Gt(e) ? fs(/* @__PURE__ */ Tt(e) ? yt(t) : t) : yt(t);
}
const Lo = {
  __proto__: null,
  [Symbol.iterator]() {
    return Tn(this, Symbol.iterator, (e) => Ct(this, e));
  },
  concat(...e) {
    return ns(this).concat(
      ...e.map((t) => me(t) ? ns(t) : t)
    );
  },
  entries() {
    return Tn(this, "entries", (e) => (e[1] = Ct(this, e[1]), e));
  },
  every(e, t) {
    return Pt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Pt(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => Ct(this, n)),
      arguments
    );
  },
  find(e, t) {
    return Pt(
      this,
      "find",
      e,
      t,
      (s) => Ct(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return Pt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Pt(
      this,
      "findLast",
      e,
      t,
      (s) => Ct(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Pt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Pt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return An(this, "includes", e);
  },
  indexOf(...e) {
    return An(this, "indexOf", e);
  },
  join(e) {
    return ns(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return An(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Pt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return vs(this, "pop");
  },
  push(...e) {
    return vs(this, "push", e);
  },
  reduce(e, ...t) {
    return Fl(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Fl(this, "reduceRight", e, t);
  },
  shift() {
    return vs(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Pt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return vs(this, "splice", e);
  },
  toReversed() {
    return ns(this).toReversed();
  },
  toSorted(e) {
    return ns(this).toSorted(e);
  },
  toSpliced(...e) {
    return ns(this).toSpliced(...e);
  },
  unshift(...e) {
    return vs(this, "unshift", e);
  },
  values() {
    return Tn(this, "values", (e) => Ct(this, e));
  }
};
function Tn(e, t, s) {
  const n = fn(e), i = n[t]();
  return n !== e && !/* @__PURE__ */ pt(e) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.done || (r.value = s(r.value)), r;
  }), i;
}
const Fo = Array.prototype;
function Pt(e, t, s, n, i, r) {
  const c = fn(e), u = c !== e && !/* @__PURE__ */ pt(e), d = c[t];
  if (d !== Fo[t]) {
    const p = d.apply(e, r);
    return u ? yt(p) : p;
  }
  let h = s;
  c !== e && (u ? h = function(p, g) {
    return s.call(this, Ct(e, p), g, e);
  } : s.length > 2 && (h = function(p, g) {
    return s.call(this, p, g, e);
  }));
  const f = d.call(c, h, n);
  return u && i ? i(f) : f;
}
function Fl(e, t, s, n) {
  const i = fn(e), r = i !== e && !/* @__PURE__ */ pt(e);
  let c = s, u = !1;
  i !== e && (r ? (u = n.length === 0, c = function(h, f, p) {
    return u && (u = !1, h = Ct(e, h)), s.call(this, h, Ct(e, f), p, e);
  }) : s.length > 3 && (c = function(h, f, p) {
    return s.call(this, h, f, p, e);
  }));
  const d = i[t](c, ...n);
  return u ? Ct(e, d) : d;
}
function An(e, t, s) {
  const n = /* @__PURE__ */ xe(e);
  et(n, "iterate", Os);
  const i = n[t](...s);
  return (i === -1 || i === !1) && /* @__PURE__ */ pn(s[0]) ? (s[0] = /* @__PURE__ */ xe(s[0]), n[t](...s)) : i;
}
function vs(e, t, s = []) {
  Ft(), ul();
  const n = (/* @__PURE__ */ xe(e))[t].apply(e, s);
  return dl(), Ut(), n;
}
const Uo = /* @__PURE__ */ al("__proto__,__v_isRef,__isVue"), ii = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(vt)
);
function Vo(e) {
  vt(e) || (e = String(e));
  const t = /* @__PURE__ */ xe(this);
  return et(t, "has", e), t.hasOwnProperty(e);
}
class oi {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (s === "__v_isReactive")
      return !i;
    if (s === "__v_isReadonly")
      return i;
    if (s === "__v_isShallow")
      return r;
    if (s === "__v_raw")
      return n === (i ? r ? Qo : di : r ? ui : ci).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const c = me(t);
    if (!i) {
      let d;
      if (c && (d = Lo[s]))
        return d;
      if (s === "hasOwnProperty")
        return Vo;
    }
    const u = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Be(t) ? t : n
    );
    if ((vt(s) ? ii.has(s) : Uo(s)) || (i || et(t, "get", s), r))
      return u;
    if (/* @__PURE__ */ Be(u)) {
      const d = c && rn(s) ? u : u.value;
      return i && Ie(d) ? /* @__PURE__ */ Wn(d) : d;
    }
    return Ie(u) ? i ? /* @__PURE__ */ Wn(u) : /* @__PURE__ */ Vt(u) : u;
  }
}
class ri extends oi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, i) {
    let r = t[s];
    const c = me(t) && rn(s);
    if (!this._isShallow) {
      const h = /* @__PURE__ */ Gt(r);
      if (!/* @__PURE__ */ pt(n) && !/* @__PURE__ */ Gt(n) && (r = /* @__PURE__ */ xe(r), n = /* @__PURE__ */ xe(n)), !c && /* @__PURE__ */ Be(r) && !/* @__PURE__ */ Be(n))
        return h || (r.value = n), !0;
    }
    const u = c ? Number(s) < t.length : Me(t, s), d = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ Be(t) ? t : i
    );
    return t === /* @__PURE__ */ xe(i) && (u ? Rt(n, r) && Nt(t, "set", s, n) : Nt(t, "add", s, n)), d;
  }
  deleteProperty(t, s) {
    const n = Me(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && n && Nt(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!vt(s) || !ii.has(s)) && et(t, "has", s), n;
  }
  ownKeys(t) {
    return et(
      t,
      "iterate",
      me(t) ? "length" : ts
    ), Reflect.ownKeys(t);
  }
}
class Go extends oi {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Bo = /* @__PURE__ */ new ri(), Ho = /* @__PURE__ */ new Go(), Wo = /* @__PURE__ */ new ri(!0);
const Hn = (e) => e, Bs = (e) => Reflect.getPrototypeOf(e);
function jo(e, t, s) {
  return function(...n) {
    const i = this.__v_raw, r = /* @__PURE__ */ xe(i), c = cs(r), u = e === "entries" || e === Symbol.iterator && c, d = e === "keys" && c, h = i[e](...n), f = s ? Hn : t ? fs : yt;
    return !t && et(
      r,
      "iterate",
      d ? Bn : ts
    ), Qe(
      // inheriting all iterator properties
      Object.create(h),
      {
        // iterator protocol
        next() {
          const { value: p, done: g } = h.next();
          return g ? { value: p, done: g } : {
            value: u ? [f(p[0]), f(p[1])] : f(p),
            done: g
          };
        }
      }
    );
  };
}
function Hs(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ko(e, t) {
  const s = {
    get(i) {
      const r = this.__v_raw, c = /* @__PURE__ */ xe(r), u = /* @__PURE__ */ xe(i);
      e || (Rt(i, u) && et(c, "get", i), et(c, "get", u));
      const { has: d } = Bs(c), h = t ? Hn : e ? fs : yt;
      if (d.call(c, i))
        return h(r.get(i));
      if (d.call(c, u))
        return h(r.get(u));
      r !== c && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && et(/* @__PURE__ */ xe(i), "iterate", ts), i.size;
    },
    has(i) {
      const r = this.__v_raw, c = /* @__PURE__ */ xe(r), u = /* @__PURE__ */ xe(i);
      return e || (Rt(i, u) && et(c, "has", i), et(c, "has", u)), i === u ? r.has(i) : r.has(i) || r.has(u);
    },
    forEach(i, r) {
      const c = this, u = c.__v_raw, d = /* @__PURE__ */ xe(u), h = t ? Hn : e ? fs : yt;
      return !e && et(d, "iterate", ts), u.forEach((f, p) => i.call(r, h(f), h(p), c));
    }
  };
  return Qe(
    s,
    e ? {
      add: Hs("add"),
      set: Hs("set"),
      delete: Hs("delete"),
      clear: Hs("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ xe(this), c = Bs(r), u = /* @__PURE__ */ xe(i), d = !t && !/* @__PURE__ */ pt(i) && !/* @__PURE__ */ Gt(i) ? u : i;
        return c.has.call(r, d) || Rt(i, d) && c.has.call(r, i) || Rt(u, d) && c.has.call(r, u) || (r.add(d), Nt(r, "add", d, d)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ pt(r) && !/* @__PURE__ */ Gt(r) && (r = /* @__PURE__ */ xe(r));
        const c = /* @__PURE__ */ xe(this), { has: u, get: d } = Bs(c);
        let h = u.call(c, i);
        h || (i = /* @__PURE__ */ xe(i), h = u.call(c, i));
        const f = d.call(c, i);
        return c.set(i, r), h ? Rt(r, f) && Nt(c, "set", i, r) : Nt(c, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ xe(this), { has: c, get: u } = Bs(r);
        let d = c.call(r, i);
        d || (i = /* @__PURE__ */ xe(i), d = c.call(r, i)), u && u.call(r, i);
        const h = r.delete(i);
        return d && Nt(r, "delete", i, void 0), h;
      },
      clear() {
        const i = /* @__PURE__ */ xe(this), r = i.size !== 0, c = i.clear();
        return r && Nt(
          i,
          "clear",
          void 0,
          void 0
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    s[i] = jo(i, e, t);
  }), s;
}
function hl(e, t) {
  const s = Ko(e, t);
  return (n, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(
    Me(s, i) && i in n ? s : n,
    i,
    r
  );
}
const zo = {
  get: /* @__PURE__ */ hl(!1, !1)
}, qo = {
  get: /* @__PURE__ */ hl(!1, !0)
}, Jo = {
  get: /* @__PURE__ */ hl(!0, !1)
};
const ci = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakMap(), di = /* @__PURE__ */ new WeakMap(), Qo = /* @__PURE__ */ new WeakMap();
function Yo(e) {
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
function Zo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Yo($o(e));
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
  return /* @__PURE__ */ Gt(e) ? e : gl(
    e,
    !1,
    Bo,
    zo,
    ci
  );
}
// @__NO_SIDE_EFFECTS__
function fi(e) {
  return gl(
    e,
    !1,
    Wo,
    qo,
    ui
  );
}
// @__NO_SIDE_EFFECTS__
function Wn(e) {
  return gl(
    e,
    !0,
    Ho,
    Jo,
    di
  );
}
function gl(e, t, s, n, i) {
  if (!Ie(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = Zo(e);
  if (r === 0)
    return e;
  const c = i.get(e);
  if (c)
    return c;
  const u = new Proxy(
    e,
    r === 2 ? n : s
  );
  return i.set(e, u), u;
}
// @__NO_SIDE_EFFECTS__
function Tt(e) {
  return /* @__PURE__ */ Gt(e) ? /* @__PURE__ */ Tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Gt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function pt(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function pn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function xe(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ xe(t) : e;
}
function _l(e) {
  return !Me(e, "__v_skip") && Object.isExtensible(e) && ja(e, "__v_skip", !0), e;
}
const yt = (e) => Ie(e) ? /* @__PURE__ */ Vt(e) : e, fs = (e) => Ie(e) ? /* @__PURE__ */ Wn(e) : e;
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function j(e) {
  return pi(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Xo(e) {
  return pi(e, !0);
}
function pi(e, t) {
  return /* @__PURE__ */ Be(e) ? e : new er(e, t);
}
class er {
  constructor(t, s) {
    this.dep = new pl(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ xe(t), this._value = s ? t : yt(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ pt(t) || /* @__PURE__ */ Gt(t);
    t = n ? t : /* @__PURE__ */ xe(t), Rt(t, s) && (this._rawValue = t, this._value = n ? t : yt(t), this.dep.trigger());
  }
}
function a(e) {
  return /* @__PURE__ */ Be(e) ? e.value : e;
}
const tr = {
  get: (e, t, s) => t === "__v_raw" ? e : a(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const i = e[t];
    return /* @__PURE__ */ Be(i) && !/* @__PURE__ */ Be(s) ? (i.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function ml(e) {
  return /* @__PURE__ */ Tt(e) ? e : new Proxy(e, tr);
}
// @__NO_SIDE_EFFECTS__
function sr(e) {
  const t = me(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = hi(e, s);
  return t;
}
class nr {
  constructor(t, s, n) {
    this._object = t, this._key = s, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ xe(t);
    let i = !0, r = t;
    if (!me(t) || !rn(String(s)))
      do
        i = !/* @__PURE__ */ pn(r) || /* @__PURE__ */ pt(r);
      while (i && (r = r.__v_raw));
    this._shallow = i;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = a(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ Be(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ Be(s)) {
        s.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Do(this._raw, this._key);
  }
}
class lr {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function ar(e, t, s) {
  return /* @__PURE__ */ Be(e) ? e : ve(e) ? new lr(e) : Ie(e) && arguments.length > 1 ? hi(e, t, s) : /* @__PURE__ */ j(e);
}
function hi(e, t, s) {
  return new nr(e, t, s);
}
class ir {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new pl(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ms - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Fe !== this)
      return ei(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ni(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function or(e, t, s = !1) {
  let n, i;
  return ve(e) ? n = e : (n = e.get, i = e.set), new ir(n, i, s);
}
const Ws = {}, Zs = /* @__PURE__ */ new WeakMap();
let Xt;
function rr(e, t = !1, s = Xt) {
  if (s) {
    let n = Zs.get(s);
    n || Zs.set(s, n = []), n.push(e);
  }
}
function cr(e, t, s = De) {
  const { immediate: n, deep: i, once: r, scheduler: c, augmentJob: u, call: d } = s, h = (L) => i ? L : /* @__PURE__ */ pt(L) || i === !1 || i === 0 ? Dt(L, 1) : Dt(L);
  let f, p, g, m, k = !1, E = !1;
  if (/* @__PURE__ */ Be(e) ? (p = () => e.value, k = /* @__PURE__ */ pt(e)) : /* @__PURE__ */ Tt(e) ? (p = () => h(e), k = !0) : me(e) ? (E = !0, k = e.some((L) => /* @__PURE__ */ Tt(L) || /* @__PURE__ */ pt(L)), p = () => e.map((L) => {
    if (/* @__PURE__ */ Be(L))
      return L.value;
    if (/* @__PURE__ */ Tt(L))
      return h(L);
    if (ve(L))
      return d ? d(L, 2) : L();
  })) : ve(e) ? t ? p = d ? () => d(e, 2) : e : p = () => {
    if (g) {
      Ft();
      try {
        g();
      } finally {
        Ut();
      }
    }
    const L = Xt;
    Xt = f;
    try {
      return d ? d(e, 3, [m]) : e(m);
    } finally {
      Xt = L;
    }
  } : p = Et, t && i) {
    const L = p, Z = i === !0 ? 1 / 0 : i;
    p = () => Dt(L(), Z);
  }
  const $ = Ya(), I = () => {
    f.stop(), $ && $.active && ol($.effects, f);
  };
  if (r && t) {
    const L = t;
    t = (...Z) => {
      L(...Z), I();
    };
  }
  let x = E ? new Array(e.length).fill(Ws) : Ws;
  const H = (L) => {
    if (!(!(f.flags & 1) || !f.dirty && !L))
      if (t) {
        const Z = f.run();
        if (i || k || (E ? Z.some((V, T) => Rt(V, x[T])) : Rt(Z, x))) {
          g && g();
          const V = Xt;
          Xt = f;
          try {
            const T = [
              Z,
              // pass undefined as the old value when it's changed for the first time
              x === Ws ? void 0 : E && x[0] === Ws ? [] : x,
              m
            ];
            x = Z, d ? d(t, 3, T) : (
              // @ts-expect-error
              t(...T)
            );
          } finally {
            Xt = V;
          }
        }
      } else
        f.run();
  };
  return u && u(H), f = new Za(p), f.scheduler = c ? () => c(H, !1) : H, m = (L) => rr(L, !1, f), g = f.onStop = () => {
    const L = Zs.get(f);
    if (L) {
      if (d)
        d(L, 4);
      else
        for (const Z of L) Z();
      Zs.delete(f);
    }
  }, t ? n ? H(!0) : x = f.run() : c ? c(H.bind(null, !0), !0) : f.run(), I.pause = f.pause.bind(f), I.resume = f.resume.bind(f), I.stop = I, I;
}
function Dt(e, t = 1 / 0, s) {
  if (t <= 0 || !Ie(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ Be(e))
    Dt(e.value, t, s);
  else if (me(e))
    for (let n = 0; n < e.length; n++)
      Dt(e[n], t, s);
  else if (ms(e) || cs(e))
    e.forEach((n) => {
      Dt(n, t, s);
    });
  else if (Ha(e)) {
    for (const n in e)
      Dt(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && Dt(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Vs(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    hn(i, t, s);
  }
}
function At(e, t, s, n) {
  if (ve(e)) {
    const i = Vs(e, t, s, n);
    return i && Ga(i) && i.catch((r) => {
      hn(r, t, s);
    }), i;
  }
  if (me(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(At(e[r], t, s, n));
    return i;
  }
}
function hn(e, t, s, n = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: c } = t && t.appContext.config || De;
  if (t) {
    let u = t.parent;
    const d = t.proxy, h = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; u; ) {
      const f = u.ec;
      if (f) {
        for (let p = 0; p < f.length; p++)
          if (f[p](e, d, h) === !1)
            return;
      }
      u = u.parent;
    }
    if (r) {
      Ft(), Vs(r, null, 10, [
        e,
        d,
        h
      ]), Ut();
      return;
    }
  }
  ur(e, s, i, n, c);
}
function ur(e, t, s, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const lt = [];
let St = -1;
const us = [];
let Kt = null, as = 0;
const gi = /* @__PURE__ */ Promise.resolve();
let Xs = null;
function gn(e) {
  const t = Xs || gi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function dr(e) {
  let t = St + 1, s = lt.length;
  for (; t < s; ) {
    const n = t + s >>> 1, i = lt[n], r = Is(i);
    r < e || r === e && i.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function bl(e) {
  if (!(e.flags & 1)) {
    const t = Is(e), s = lt[lt.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Is(s) ? lt.push(e) : lt.splice(dr(t), 0, e), e.flags |= 1, _i();
  }
}
function _i() {
  Xs || (Xs = gi.then(bi));
}
function fr(e) {
  me(e) ? us.push(...e) : Kt && e.id === -1 ? Kt.splice(as + 1, 0, e) : e.flags & 1 || (us.push(e), e.flags |= 1), _i();
}
function Ul(e, t, s = St + 1) {
  for (; s < lt.length; s++) {
    const n = lt[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      lt.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function mi(e) {
  if (us.length) {
    const t = [...new Set(us)].sort(
      (s, n) => Is(s) - Is(n)
    );
    if (us.length = 0, Kt) {
      Kt.push(...t);
      return;
    }
    for (Kt = t, as = 0; as < Kt.length; as++) {
      const s = Kt[as];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    Kt = null, as = 0;
  }
}
const Is = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function bi(e) {
  try {
    for (St = 0; St < lt.length; St++) {
      const t = lt[St];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Vs(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; St < lt.length; St++) {
      const t = lt[St];
      t && (t.flags &= -2);
    }
    St = -1, lt.length = 0, mi(), Xs = null, (lt.length || us.length) && bi();
  }
}
let tt = null, vi = null;
function en(e) {
  const t = tt;
  return tt = e, vi = e && e.type.__scopeId || null, t;
}
function ae(e, t = tt, s) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && nn(-1);
    const r = en(t);
    let c;
    try {
      c = e(...i);
    } finally {
      en(r), n._d && nn(1);
    }
    return c;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function ke(e, t) {
  if (tt === null)
    return e;
  const s = vn(tt), n = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, c, u, d = De] = t[i];
    r && (ve(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Dt(c), n.push({
      dir: r,
      instance: s,
      value: c,
      oldValue: void 0,
      arg: u,
      modifiers: d
    }));
  }
  return e;
}
function Yt(e, t, s, n) {
  const i = e.dirs, r = t && t.dirs;
  for (let c = 0; c < i.length; c++) {
    const u = i[c];
    r && (u.oldValue = r[c].value);
    let d = u.dir[n];
    d && (Ft(), At(d, s, 8, [
      e.el,
      u,
      e,
      t
    ]), Ut());
  }
}
function qs(e, t) {
  if (at) {
    let s = at.provides;
    const n = at.parent && at.parent.provides;
    n === s && (s = at.provides = Object.create(n)), s[e] = t;
  }
}
function ht(e, t, s = !1) {
  const n = zi();
  if (n || ss) {
    let i = ss ? ss._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && ve(t) ? t.call(n && n.proxy) : t;
  }
}
function pr() {
  return !!(zi() || ss);
}
const hr = /* @__PURE__ */ Symbol.for("v-scx"), gr = () => ht(hr);
function Oe(e, t, s) {
  return yi(e, t, s);
}
function yi(e, t, s = De) {
  const { immediate: n, deep: i, flush: r, once: c } = s, u = Qe({}, s), d = t && n || !t && r !== "post";
  let h;
  if (Ls) {
    if (r === "sync") {
      const m = gr();
      h = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!d) {
      const m = () => {
      };
      return m.stop = Et, m.resume = Et, m.pause = Et, m;
    }
  }
  const f = at;
  u.call = (m, k, E) => At(m, f, k, E);
  let p = !1;
  r === "post" ? u.scheduler = (m) => {
    rt(m, f && f.suspense);
  } : r !== "sync" && (p = !0, u.scheduler = (m, k) => {
    k ? m() : bl(m);
  }), u.augmentJob = (m) => {
    t && (m.flags |= 4), p && (m.flags |= 2, f && (m.id = f.uid, m.i = f));
  };
  const g = cr(e, t, u);
  return Ls && (h ? h.push(g) : d && g()), g;
}
function _r(e, t, s) {
  const n = this.proxy, i = We(e) ? e.includes(".") ? wi(n, e) : () => n[e] : e.bind(n, n);
  let r;
  ve(t) ? r = t : (r = t.handler, s = t);
  const c = Gs(this), u = yi(i, r.bind(n), s);
  return c(), u;
}
function wi(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < s.length && n; i++)
      n = n[s[i]];
    return n;
  };
}
const mr = /* @__PURE__ */ Symbol("_vte"), br = (e) => e.__isTeleport, vr = /* @__PURE__ */ Symbol("_leaveCb");
function vl(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, vl(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Ge(e, t) {
  return ve(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Qe({ name: e.name }, t, { setup: e })
  ) : e;
}
function ki(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Vl(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const tn = /* @__PURE__ */ new WeakMap();
function xs(e, t, s, n, i = !1) {
  if (me(e)) {
    e.forEach(
      (E, $) => xs(
        E,
        t && (me(t) ? t[$] : t),
        s,
        n,
        i
      )
    );
    return;
  }
  if (ds(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && xs(e, t, s, n.component.subTree);
    return;
  }
  const r = n.shapeFlag & 4 ? vn(n.component) : n.el, c = i ? null : r, { i: u, r: d } = e, h = t && t.r, f = u.refs === De ? u.refs = {} : u.refs, p = u.setupState, g = /* @__PURE__ */ xe(p), m = p === De ? Va : (E) => Vl(f, E) ? !1 : Me(g, E), k = (E, $) => !($ && Vl(f, $));
  if (h != null && h !== d) {
    if (Gl(t), We(h))
      f[h] = null, m(h) && (p[h] = null);
    else if (/* @__PURE__ */ Be(h)) {
      const E = t;
      k(h, E.k) && (h.value = null), E.k && (f[E.k] = null);
    }
  }
  if (ve(d))
    Vs(d, u, 12, [c, f]);
  else {
    const E = We(d), $ = /* @__PURE__ */ Be(d);
    if (E || $) {
      const I = () => {
        if (e.f) {
          const x = E ? m(d) ? p[d] : f[d] : k() || !e.k ? d.value : f[e.k];
          if (i)
            me(x) && ol(x, r);
          else if (me(x))
            x.includes(r) || x.push(r);
          else if (E)
            f[d] = [r], m(d) && (p[d] = f[d]);
          else {
            const H = [r];
            k(d, e.k) && (d.value = H), e.k && (f[e.k] = H);
          }
        } else E ? (f[d] = c, m(d) && (p[d] = c)) : $ && (k(d, e.k) && (d.value = c), e.k && (f[e.k] = c));
      };
      if (c) {
        const x = () => {
          I(), tn.delete(e);
        };
        x.id = -1, tn.set(e, x), rt(x, s);
      } else
        Gl(e), I();
    }
  }
}
function Gl(e) {
  const t = tn.get(e);
  t && (t.flags |= 8, tn.delete(e));
}
dn().requestIdleCallback;
dn().cancelIdleCallback;
const ds = (e) => !!e.type.__asyncLoader, $i = (e) => e.type.__isKeepAlive;
function Si(e, t) {
  xi(e, "a", t);
}
function Ci(e, t) {
  xi(e, "da", t);
}
function xi(e, t, s = at) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (_n(t, n, s), s) {
    let i = s.parent;
    for (; i && i.parent; )
      $i(i.parent.vnode) && yr(n, t, s, i), i = i.parent;
  }
}
function yr(e, t, s, n) {
  const i = _n(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  wl(() => {
    ol(n[t], i);
  }, s);
}
function _n(e, t, s = at, n = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...c) => {
      Ft();
      const u = Gs(s), d = At(t, s, e, c);
      return u(), Ut(), d;
    });
    return n ? i.unshift(r) : i.push(r), r;
  }
}
const Ht = (e) => (t, s = at) => {
  (!Ls || e === "sp") && _n(e, (...n) => t(...n), s);
}, wr = Ht("bm"), Ye = Ht("m"), kr = Ht(
  "bu"
), $r = Ht("u"), yl = Ht(
  "bum"
), wl = Ht("um"), Sr = Ht(
  "sp"
), Cr = Ht("rtg"), xr = Ht("rtc");
function Rr(e, t = at) {
  _n("ec", e, t);
}
const Er = /* @__PURE__ */ Symbol.for("v-ndc");
function ye(e, t, s, n) {
  let i;
  const r = s, c = me(e);
  if (c || We(e)) {
    const u = c && /* @__PURE__ */ Tt(e);
    let d = !1, h = !1;
    u && (d = !/* @__PURE__ */ pt(e), h = /* @__PURE__ */ Gt(e), e = fn(e)), i = new Array(e.length);
    for (let f = 0, p = e.length; f < p; f++)
      i[f] = t(
        d ? h ? fs(yt(e[f])) : yt(e[f]) : e[f],
        f,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let u = 0; u < e; u++)
      i[u] = t(u + 1, u, void 0, r);
  } else if (Ie(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (u, d) => t(u, d, void 0, r)
      );
    else {
      const u = Object.keys(e);
      i = new Array(u.length);
      for (let d = 0, h = u.length; d < h; d++) {
        const f = u[d];
        i[d] = t(e[f], f, d, r);
      }
    }
  else
    i = [];
  return i;
}
function Bl(e, t, s = {}, n, i) {
  if (tt.ce || tt.parent && ds(tt.parent) && tt.parent.ce) {
    const h = Object.keys(s).length > 0;
    return t !== "default" && (s.name = t), _(), ze(
      Y,
      null,
      [ee("slot", s, n)],
      h ? -2 : 64
    );
  }
  let r = e[t];
  r && r._c && (r._d = !1), _();
  const c = r && Ri(r(s)), u = s.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  c && c.key, d = ze(
    Y,
    {
      key: (u && !vt(u) ? u : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!c && n ? "_fb" : "")
    },
    c || [],
    c && e._ === 1 ? 64 : -2
  );
  return d.scopeId && (d.slotScopeIds = [d.scopeId + "-s"]), r && r._c && (r._d = !0), d;
}
function Ri(e) {
  return e.some((t) => Ds(t) ? !(t.type === Bt || t.type === Y && !Ri(t.children)) : !0) ? e : null;
}
const jn = (e) => e ? qi(e) ? vn(e) : jn(e.parent) : null, Rs = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Qe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => jn(e.parent),
    $root: (e) => jn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ti(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      bl(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = gn.bind(e.proxy)),
    $watch: (e) => _r.bind(e)
  })
), Pn = (e, t) => e !== De && !e.__isScriptSetup && Me(e, t), Tr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: i, props: r, accessCache: c, type: u, appContext: d } = e;
    if (t[0] !== "$") {
      const g = c[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return n[t];
          case 2:
            return i[t];
          case 4:
            return s[t];
          case 3:
            return r[t];
        }
      else {
        if (Pn(n, t))
          return c[t] = 1, n[t];
        if (i !== De && Me(i, t))
          return c[t] = 2, i[t];
        if (Me(r, t))
          return c[t] = 3, r[t];
        if (s !== De && Me(s, t))
          return c[t] = 4, s[t];
        Kn && (c[t] = 0);
      }
    }
    const h = Rs[t];
    let f, p;
    if (h)
      return t === "$attrs" && et(e.attrs, "get", ""), h(e);
    if (
      // css module (injected by vue-loader)
      (f = u.__cssModules) && (f = f[t])
    )
      return f;
    if (s !== De && Me(s, t))
      return c[t] = 4, s[t];
    if (
      // global properties
      p = d.config.globalProperties, Me(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: i, ctx: r } = e;
    return Pn(i, t) ? (i[t] = s, !0) : n !== De && Me(n, t) ? (n[t] = s, !0) : Me(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: i, props: r, type: c }
  }, u) {
    let d;
    return !!(s[u] || e !== De && u[0] !== "$" && Me(e, u) || Pn(t, u) || Me(r, u) || Me(n, u) || Me(Rs, u) || Me(i.config.globalProperties, u) || (d = c.__cssModules) && d[u]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : Me(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Hl(e) {
  return me(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Kn = !0;
function Ar(e) {
  const t = Ti(e), s = e.proxy, n = e.ctx;
  Kn = !1, t.beforeCreate && Wl(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: c,
    watch: u,
    provide: d,
    inject: h,
    // lifecycle
    created: f,
    beforeMount: p,
    mounted: g,
    beforeUpdate: m,
    updated: k,
    activated: E,
    deactivated: $,
    beforeDestroy: I,
    beforeUnmount: x,
    destroyed: H,
    unmounted: L,
    render: Z,
    renderTracked: V,
    renderTriggered: T,
    errorCaptured: y,
    serverPrefetch: R,
    // public API
    expose: A,
    inheritAttrs: ce,
    // assets
    components: oe,
    directives: he,
    filters: Re
  } = t;
  if (h && Pr(h, n, null), c)
    for (const P in c) {
      const S = c[P];
      ve(S) && (n[P] = S.bind(s));
    }
  if (i) {
    const P = i.call(s, s);
    Ie(P) && (e.data = /* @__PURE__ */ Vt(P));
  }
  if (Kn = !0, r)
    for (const P in r) {
      const S = r[P], B = ve(S) ? S.bind(s, s) : ve(S.get) ? S.get.bind(s, s) : Et, Se = !ve(S) && ve(S.set) ? S.set.bind(s) : Et, M = K({
        get: B,
        set: Se
      });
      Object.defineProperty(n, P, {
        enumerable: !0,
        configurable: !0,
        get: () => M.value,
        set: (z) => M.value = z
      });
    }
  if (u)
    for (const P in u)
      Ei(u[P], n, s, P);
  if (d) {
    const P = ve(d) ? d.call(s) : d;
    Reflect.ownKeys(P).forEach((S) => {
      qs(S, P[S]);
    });
  }
  f && Wl(f, e, "c");
  function $e(P, S) {
    me(S) ? S.forEach((B) => P(B.bind(s))) : S && P(S.bind(s));
  }
  if ($e(wr, p), $e(Ye, g), $e(kr, m), $e($r, k), $e(Si, E), $e(Ci, $), $e(Rr, y), $e(xr, V), $e(Cr, T), $e(yl, x), $e(wl, L), $e(Sr, R), me(A))
    if (A.length) {
      const P = e.exposed || (e.exposed = {});
      A.forEach((S) => {
        Object.defineProperty(P, S, {
          get: () => s[S],
          set: (B) => s[S] = B,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  Z && e.render === Et && (e.render = Z), ce != null && (e.inheritAttrs = ce), oe && (e.components = oe), he && (e.directives = he), R && ki(e);
}
function Pr(e, t, s = Et) {
  me(e) && (e = zn(e));
  for (const n in e) {
    const i = e[n];
    let r;
    Ie(i) ? "default" in i ? r = ht(
      i.from || n,
      i.default,
      !0
    ) : r = ht(i.from || n) : r = ht(i), /* @__PURE__ */ Be(r) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (c) => r.value = c
    }) : t[n] = r;
  }
}
function Wl(e, t, s) {
  At(
    me(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Ei(e, t, s, n) {
  let i = n.includes(".") ? wi(s, n) : () => s[n];
  if (We(e)) {
    const r = t[e];
    ve(r) && Oe(i, r);
  } else if (ve(e))
    Oe(i, e.bind(s));
  else if (Ie(e))
    if (me(e))
      e.forEach((r) => Ei(r, t, s, n));
    else {
      const r = ve(e.handler) ? e.handler.bind(s) : t[e.handler];
      ve(r) && Oe(i, r, e);
    }
}
function Ti(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: c }
  } = e.appContext, u = r.get(t);
  let d;
  return u ? d = u : !i.length && !s && !n ? d = t : (d = {}, i.length && i.forEach(
    (h) => sn(d, h, c, !0)
  ), sn(d, t, c)), Ie(t) && r.set(t, d), d;
}
function sn(e, t, s, n = !1) {
  const { mixins: i, extends: r } = t;
  r && sn(e, r, s, !0), i && i.forEach(
    (c) => sn(e, c, s, !0)
  );
  for (const c in t)
    if (!(n && c === "expose")) {
      const u = Mr[c] || s && s[c];
      e[c] = u ? u(e[c], t[c]) : t[c];
    }
  return e;
}
const Mr = {
  data: jl,
  props: Kl,
  emits: Kl,
  // objects
  methods: ks,
  computed: ks,
  // lifecycle
  beforeCreate: st,
  created: st,
  beforeMount: st,
  mounted: st,
  beforeUpdate: st,
  updated: st,
  beforeDestroy: st,
  beforeUnmount: st,
  destroyed: st,
  unmounted: st,
  activated: st,
  deactivated: st,
  errorCaptured: st,
  serverPrefetch: st,
  // assets
  components: ks,
  directives: ks,
  // watch
  watch: Ir,
  // provide / inject
  provide: jl,
  inject: Or
};
function jl(e, t) {
  return t ? e ? function() {
    return Qe(
      ve(e) ? e.call(this, this) : e,
      ve(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Or(e, t) {
  return ks(zn(e), zn(t));
}
function zn(e) {
  if (me(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function st(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ks(e, t) {
  return e ? Qe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Kl(e, t) {
  return e ? me(e) && me(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Qe(
    /* @__PURE__ */ Object.create(null),
    Hl(e),
    Hl(t ?? {})
  ) : t;
}
function Ir(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = Qe(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = st(e[n], t[n]);
  return s;
}
function Ai() {
  return {
    app: null,
    config: {
      isNativeTag: Va,
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
let Nr = 0;
function Dr(e, t) {
  return function(n, i = null) {
    ve(n) || (n = Qe({}, n)), i != null && !Ie(i) && (i = null);
    const r = Ai(), c = /* @__PURE__ */ new WeakSet(), u = [];
    let d = !1;
    const h = r.app = {
      _uid: Nr++,
      _component: n,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: pc,
      get config() {
        return r.config;
      },
      set config(f) {
      },
      use(f, ...p) {
        return c.has(f) || (f && ve(f.install) ? (c.add(f), f.install(h, ...p)) : ve(f) && (c.add(f), f(h, ...p))), h;
      },
      mixin(f) {
        return r.mixins.includes(f) || r.mixins.push(f), h;
      },
      component(f, p) {
        return p ? (r.components[f] = p, h) : r.components[f];
      },
      directive(f, p) {
        return p ? (r.directives[f] = p, h) : r.directives[f];
      },
      mount(f, p, g) {
        if (!d) {
          const m = h._ceVNode || ee(n, i);
          return m.appContext = r, g === !0 ? g = "svg" : g === !1 && (g = void 0), e(m, f, g), d = !0, h._container = f, f.__vue_app__ = h, vn(m.component);
        }
      },
      onUnmount(f) {
        u.push(f);
      },
      unmount() {
        d && (At(
          u,
          h._instance,
          16
        ), e(null, h._container), delete h._container.__vue_app__);
      },
      provide(f, p) {
        return r.provides[f] = p, h;
      },
      runWithContext(f) {
        const p = ss;
        ss = h;
        try {
          return f();
        } finally {
          ss = p;
        }
      }
    };
    return h;
  };
}
let ss = null;
const Lr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${mt(t)}Modifiers`] || e[`${Qt(t)}Modifiers`];
function Fr(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || De;
  let i = s;
  const r = t.startsWith("update:"), c = r && Lr(n, t.slice(7));
  c && (c.trim && (i = s.map((f) => We(f) ? f.trim() : f)), c.number && (i = s.map(un)));
  let u, d = n[u = xn(t)] || // also try camelCase event handler (#2249)
  n[u = xn(mt(t))];
  !d && r && (d = n[u = xn(Qt(t))]), d && At(
    d,
    e,
    6,
    i
  );
  const h = n[u + "Once"];
  if (h) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, At(
      h,
      e,
      6,
      i
    );
  }
}
const Ur = /* @__PURE__ */ new WeakMap();
function Pi(e, t, s = !1) {
  const n = s ? Ur : t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let c = {}, u = !1;
  if (!ve(e)) {
    const d = (h) => {
      const f = Pi(h, t, !0);
      f && (u = !0, Qe(c, f));
    };
    !s && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !r && !u ? (Ie(e) && n.set(e, null), null) : (me(r) ? r.forEach((d) => c[d] = null) : Qe(c, r), Ie(e) && n.set(e, c), c);
}
function mn(e, t) {
  return !e || !on(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Me(e, t[0].toLowerCase() + t.slice(1)) || Me(e, Qt(t)) || Me(e, t));
}
function zl(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: i,
    propsOptions: [r],
    slots: c,
    attrs: u,
    emit: d,
    render: h,
    renderCache: f,
    props: p,
    data: g,
    setupState: m,
    ctx: k,
    inheritAttrs: E
  } = e, $ = en(e);
  let I, x;
  try {
    if (s.shapeFlag & 4) {
      const L = i || n, Z = L;
      I = xt(
        h.call(
          Z,
          L,
          f,
          p,
          m,
          g,
          k
        )
      ), x = u;
    } else {
      const L = t;
      I = xt(
        L.length > 1 ? L(
          p,
          { attrs: u, slots: c, emit: d }
        ) : L(
          p,
          null
        )
      ), x = t.props ? u : Vr(u);
    }
  } catch (L) {
    Es.length = 0, hn(L, e, 1), I = ee(Bt);
  }
  let H = I;
  if (x && E !== !1) {
    const L = Object.keys(x), { shapeFlag: Z } = H;
    L.length && Z & 7 && (r && L.some(il) && (x = Gr(
      x,
      r
    )), H = ps(H, x, !1, !0));
  }
  return s.dirs && (H = ps(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(s.dirs) : s.dirs), s.transition && vl(H, s.transition), I = H, en($), I;
}
const Vr = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || on(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Gr = (e, t) => {
  const s = {};
  for (const n in e)
    (!il(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Br(e, t, s) {
  const { props: n, children: i, component: r } = e, { props: c, children: u, patchFlag: d } = t, h = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return n ? ql(n, c, h) : !!c;
    if (d & 8) {
      const f = t.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        const g = f[p];
        if (Mi(c, n, g) && !mn(h, g))
          return !0;
      }
    }
  } else
    return (i || u) && (!u || !u.$stable) ? !0 : n === c ? !1 : n ? c ? ql(n, c, h) : !0 : !!c;
  return !1;
}
function ql(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (Mi(t, e, r) && !mn(s, r))
      return !0;
  }
  return !1;
}
function Mi(e, t, s) {
  const n = e[s], i = t[s];
  return s === "style" && Ie(n) && Ie(i) ? !qt(n, i) : n !== i;
}
function Hr({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Oi = {}, Ii = () => Object.create(Oi), Ni = (e) => Object.getPrototypeOf(e) === Oi;
function Wr(e, t, s, n = !1) {
  const i = {}, r = Ii();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Di(e, t, i, r);
  for (const c in e.propsOptions[0])
    c in i || (i[c] = void 0);
  s ? e.props = n ? i : /* @__PURE__ */ fi(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function jr(e, t, s, n) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: c }
  } = e, u = /* @__PURE__ */ xe(i), [d] = e.propsOptions;
  let h = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || c > 0) && !(c & 16)
  ) {
    if (c & 8) {
      const f = e.vnode.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        let g = f[p];
        if (mn(e.emitsOptions, g))
          continue;
        const m = t[g];
        if (d)
          if (Me(r, g))
            m !== r[g] && (r[g] = m, h = !0);
          else {
            const k = mt(g);
            i[k] = qn(
              d,
              u,
              k,
              m,
              e,
              !1
            );
          }
        else
          m !== r[g] && (r[g] = m, h = !0);
      }
    }
  } else {
    Di(e, t, i, r) && (h = !0);
    let f;
    for (const p in u)
      (!t || // for camelCase
      !Me(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Qt(p)) === p || !Me(t, f))) && (d ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[f] !== void 0) && (i[p] = qn(
        d,
        u,
        p,
        void 0,
        e,
        !0
      )) : delete i[p]);
    if (r !== u)
      for (const p in r)
        (!t || !Me(t, p)) && (delete r[p], h = !0);
  }
  h && Nt(e.attrs, "set", "");
}
function Di(e, t, s, n) {
  const [i, r] = e.propsOptions;
  let c = !1, u;
  if (t)
    for (let d in t) {
      if ($s(d))
        continue;
      const h = t[d];
      let f;
      i && Me(i, f = mt(d)) ? !r || !r.includes(f) ? s[f] = h : (u || (u = {}))[f] = h : mn(e.emitsOptions, d) || (!(d in n) || h !== n[d]) && (n[d] = h, c = !0);
    }
  if (r) {
    const d = /* @__PURE__ */ xe(s), h = u || De;
    for (let f = 0; f < r.length; f++) {
      const p = r[f];
      s[p] = qn(
        i,
        d,
        p,
        h[p],
        e,
        !Me(h, p)
      );
    }
  }
  return c;
}
function qn(e, t, s, n, i, r) {
  const c = e[s];
  if (c != null) {
    const u = Me(c, "default");
    if (u && n === void 0) {
      const d = c.default;
      if (c.type !== Function && !c.skipFactory && ve(d)) {
        const { propsDefaults: h } = i;
        if (s in h)
          n = h[s];
        else {
          const f = Gs(i);
          n = h[s] = d.call(
            null,
            t
          ), f();
        }
      } else
        n = d;
      i.ce && i.ce._setProp(s, n);
    }
    c[
      0
      /* shouldCast */
    ] && (r && !u ? n = !1 : c[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Qt(s)) && (n = !0));
  }
  return n;
}
const Kr = /* @__PURE__ */ new WeakMap();
function Li(e, t, s = !1) {
  const n = s ? Kr : t.propsCache, i = n.get(e);
  if (i)
    return i;
  const r = e.props, c = {}, u = [];
  let d = !1;
  if (!ve(e)) {
    const f = (p) => {
      d = !0;
      const [g, m] = Li(p, t, !0);
      Qe(c, g), m && u.push(...m);
    };
    !s && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!r && !d)
    return Ie(e) && n.set(e, rs), rs;
  if (me(r))
    for (let f = 0; f < r.length; f++) {
      const p = mt(r[f]);
      Jl(p) && (c[p] = De);
    }
  else if (r)
    for (const f in r) {
      const p = mt(f);
      if (Jl(p)) {
        const g = r[f], m = c[p] = me(g) || ve(g) ? { type: g } : Qe({}, g), k = m.type;
        let E = !1, $ = !0;
        if (me(k))
          for (let I = 0; I < k.length; ++I) {
            const x = k[I], H = ve(x) && x.name;
            if (H === "Boolean") {
              E = !0;
              break;
            } else H === "String" && ($ = !1);
          }
        else
          E = ve(k) && k.name === "Boolean";
        m[
          0
          /* shouldCast */
        ] = E, m[
          1
          /* shouldCastTrue */
        ] = $, (E || Me(m, "default")) && u.push(p);
      }
    }
  const h = [c, u];
  return Ie(e) && n.set(e, h), h;
}
function Jl(e) {
  return e[0] !== "$" && !$s(e);
}
const kl = (e) => e === "_" || e === "_ctx" || e === "$stable", $l = (e) => me(e) ? e.map(xt) : [xt(e)], zr = (e, t, s) => {
  if (t._n)
    return t;
  const n = ae((...i) => $l(t(...i)), s);
  return n._c = !1, n;
}, Fi = (e, t, s) => {
  const n = e._ctx;
  for (const i in e) {
    if (kl(i)) continue;
    const r = e[i];
    if (ve(r))
      t[i] = zr(i, r, n);
    else if (r != null) {
      const c = $l(r);
      t[i] = () => c;
    }
  }
}, Ui = (e, t) => {
  const s = $l(t);
  e.slots.default = () => s;
}, Vi = (e, t, s) => {
  for (const n in t)
    (s || !kl(n)) && (e[n] = t[n]);
}, qr = (e, t, s) => {
  const n = e.slots = Ii();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (Vi(n, t, s), s && ja(n, "_", i, !0)) : Fi(t, n);
  } else t && Ui(e, t);
}, Jr = (e, t, s) => {
  const { vnode: n, slots: i } = e;
  let r = !0, c = De;
  if (n.shapeFlag & 32) {
    const u = t._;
    u ? s && u === 1 ? r = !1 : Vi(i, t, s) : (r = !t.$stable, Fi(t, i)), c = t;
  } else t && (Ui(e, t), c = { default: 1 });
  if (r)
    for (const u in i)
      !kl(u) && c[u] == null && delete i[u];
}, rt = ec;
function Qr(e) {
  return Yr(e);
}
function Yr(e, t) {
  const s = dn();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: r,
    createElement: c,
    createText: u,
    createComment: d,
    setText: h,
    setElementText: f,
    parentNode: p,
    nextSibling: g,
    setScopeId: m = Et,
    insertStaticContent: k
  } = e, E = (b, w, C, D = null, G = null, F = null, te = void 0, X = null, q = !!w.dynamicChildren) => {
    if (b === w)
      return;
    b && !ys(b, w) && (D = U(b), z(b, G, F, !0), b = null), w.patchFlag === -2 && (q = !1, w.dynamicChildren = null);
    const { type: W, ref: ge, shapeFlag: le } = w;
    switch (W) {
      case bn:
        $(b, w, C, D);
        break;
      case Bt:
        I(b, w, C, D);
        break;
      case On:
        b == null && x(w, C, D, te);
        break;
      case Y:
        oe(
          b,
          w,
          C,
          D,
          G,
          F,
          te,
          X,
          q
        );
        break;
      default:
        le & 1 ? Z(
          b,
          w,
          C,
          D,
          G,
          F,
          te,
          X,
          q
        ) : le & 6 ? he(
          b,
          w,
          C,
          D,
          G,
          F,
          te,
          X,
          q
        ) : (le & 64 || le & 128) && W.process(
          b,
          w,
          C,
          D,
          G,
          F,
          te,
          X,
          q,
          ue
        );
    }
    ge != null && G ? xs(ge, b && b.ref, F, w || b, !w) : ge == null && b && b.ref != null && xs(b.ref, null, F, b, !0);
  }, $ = (b, w, C, D) => {
    if (b == null)
      n(
        w.el = u(w.children),
        C,
        D
      );
    else {
      const G = w.el = b.el;
      w.children !== b.children && h(G, w.children);
    }
  }, I = (b, w, C, D) => {
    b == null ? n(
      w.el = d(w.children || ""),
      C,
      D
    ) : w.el = b.el;
  }, x = (b, w, C, D) => {
    [b.el, b.anchor] = k(
      b.children,
      w,
      C,
      D,
      b.el,
      b.anchor
    );
  }, H = ({ el: b, anchor: w }, C, D) => {
    let G;
    for (; b && b !== w; )
      G = g(b), n(b, C, D), b = G;
    n(w, C, D);
  }, L = ({ el: b, anchor: w }) => {
    let C;
    for (; b && b !== w; )
      C = g(b), i(b), b = C;
    i(w);
  }, Z = (b, w, C, D, G, F, te, X, q) => {
    if (w.type === "svg" ? te = "svg" : w.type === "math" && (te = "mathml"), b == null)
      V(
        w,
        C,
        D,
        G,
        F,
        te,
        X,
        q
      );
    else {
      const W = b.el && b.el._isVueCE ? b.el : null;
      try {
        W && W._beginPatch(), R(
          b,
          w,
          G,
          F,
          te,
          X,
          q
        );
      } finally {
        W && W._endPatch();
      }
    }
  }, V = (b, w, C, D, G, F, te, X) => {
    let q, W;
    const { props: ge, shapeFlag: le, transition: de, dirs: be } = b;
    if (q = b.el = c(
      b.type,
      F,
      ge && ge.is,
      ge
    ), le & 8 ? f(q, b.children) : le & 16 && y(
      b.children,
      q,
      null,
      D,
      G,
      Mn(b, F),
      te,
      X
    ), be && Yt(b, null, D, "created"), T(q, b, b.scopeId, te, D), ge) {
      for (const Ne in ge)
        Ne !== "value" && !$s(Ne) && r(q, Ne, null, ge[Ne], F, D);
      "value" in ge && r(q, "value", null, ge.value, F), (W = ge.onVnodeBeforeMount) && $t(W, D, b);
    }
    be && Yt(b, null, D, "beforeMount");
    const Ce = Zr(G, de);
    Ce && de.beforeEnter(q), n(q, w, C), ((W = ge && ge.onVnodeMounted) || Ce || be) && rt(() => {
      W && $t(W, D, b), Ce && de.enter(q), be && Yt(b, null, D, "mounted");
    }, G);
  }, T = (b, w, C, D, G) => {
    if (C && m(b, C), D)
      for (let F = 0; F < D.length; F++)
        m(b, D[F]);
    if (G) {
      let F = G.subTree;
      if (w === F || Wi(F.type) && (F.ssContent === w || F.ssFallback === w)) {
        const te = G.vnode;
        T(
          b,
          te,
          te.scopeId,
          te.slotScopeIds,
          G.parent
        );
      }
    }
  }, y = (b, w, C, D, G, F, te, X, q = 0) => {
    for (let W = q; W < b.length; W++) {
      const ge = b[W] = X ? It(b[W]) : xt(b[W]);
      E(
        null,
        ge,
        w,
        C,
        D,
        G,
        F,
        te,
        X
      );
    }
  }, R = (b, w, C, D, G, F, te) => {
    const X = w.el = b.el;
    let { patchFlag: q, dynamicChildren: W, dirs: ge } = w;
    q |= b.patchFlag & 16;
    const le = b.props || De, de = w.props || De;
    let be;
    if (C && Zt(C, !1), (be = de.onVnodeBeforeUpdate) && $t(be, C, w, b), ge && Yt(w, b, C, "beforeUpdate"), C && Zt(C, !0), (le.innerHTML && de.innerHTML == null || le.textContent && de.textContent == null) && f(X, ""), W ? A(
      b.dynamicChildren,
      W,
      X,
      C,
      D,
      Mn(w, G),
      F
    ) : te || S(
      b,
      w,
      X,
      null,
      C,
      D,
      Mn(w, G),
      F,
      !1
    ), q > 0) {
      if (q & 16)
        ce(X, le, de, C, G);
      else if (q & 2 && le.class !== de.class && r(X, "class", null, de.class, G), q & 4 && r(X, "style", le.style, de.style, G), q & 8) {
        const Ce = w.dynamicProps;
        for (let Ne = 0; Ne < Ce.length; Ne++) {
          const Ae = Ce[Ne], Je = le[Ae], N = de[Ae];
          (N !== Je || Ae === "value") && r(X, Ae, Je, N, G, C);
        }
      }
      q & 1 && b.children !== w.children && f(X, w.children);
    } else !te && W == null && ce(X, le, de, C, G);
    ((be = de.onVnodeUpdated) || ge) && rt(() => {
      be && $t(be, C, w, b), ge && Yt(w, b, C, "updated");
    }, D);
  }, A = (b, w, C, D, G, F, te) => {
    for (let X = 0; X < w.length; X++) {
      const q = b[X], W = w[X], ge = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        q.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (q.type === Y || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ys(q, W) || // - In the case of a component, it could contain anything.
        q.shapeFlag & 198) ? p(q.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          C
        )
      );
      E(
        q,
        W,
        ge,
        null,
        D,
        G,
        F,
        te,
        !0
      );
    }
  }, ce = (b, w, C, D, G) => {
    if (w !== C) {
      if (w !== De)
        for (const F in w)
          !$s(F) && !(F in C) && r(
            b,
            F,
            w[F],
            null,
            G,
            D
          );
      for (const F in C) {
        if ($s(F)) continue;
        const te = C[F], X = w[F];
        te !== X && F !== "value" && r(b, F, X, te, G, D);
      }
      "value" in C && r(b, "value", w.value, C.value, G);
    }
  }, oe = (b, w, C, D, G, F, te, X, q) => {
    const W = w.el = b ? b.el : u(""), ge = w.anchor = b ? b.anchor : u("");
    let { patchFlag: le, dynamicChildren: de, slotScopeIds: be } = w;
    be && (X = X ? X.concat(be) : be), b == null ? (n(W, C, D), n(ge, C, D), y(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      w.children || [],
      C,
      ge,
      G,
      F,
      te,
      X,
      q
    )) : le > 0 && le & 64 && de && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    b.dynamicChildren && b.dynamicChildren.length === de.length ? (A(
      b.dynamicChildren,
      de,
      C,
      G,
      F,
      te,
      X
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (w.key != null || G && w === G.subTree) && Gi(
      b,
      w,
      !0
      /* shallow */
    )) : S(
      b,
      w,
      C,
      ge,
      G,
      F,
      te,
      X,
      q
    );
  }, he = (b, w, C, D, G, F, te, X, q) => {
    w.slotScopeIds = X, b == null ? w.shapeFlag & 512 ? G.ctx.activate(
      w,
      C,
      D,
      te,
      q
    ) : Re(
      w,
      C,
      D,
      G,
      F,
      te,
      q
    ) : Le(b, w, q);
  }, Re = (b, w, C, D, G, F, te) => {
    const X = b.component = oc(
      b,
      D,
      G
    );
    if ($i(b) && (X.ctx.renderer = ue), rc(X, !1, te), X.asyncDep) {
      if (G && G.registerDep(X, $e, te), !b.el) {
        const q = X.subTree = ee(Bt);
        I(null, q, w, C), b.placeholder = q.el;
      }
    } else
      $e(
        X,
        b,
        w,
        C,
        G,
        F,
        te
      );
  }, Le = (b, w, C) => {
    const D = w.component = b.component;
    if (Br(b, w, C))
      if (D.asyncDep && !D.asyncResolved) {
        P(D, w, C);
        return;
      } else
        D.next = w, D.update();
    else
      w.el = b.el, D.vnode = w;
  }, $e = (b, w, C, D, G, F, te) => {
    const X = () => {
      if (b.isMounted) {
        let { next: le, bu: de, u: be, parent: Ce, vnode: Ne } = b;
        {
          const O = Bi(b);
          if (O) {
            le && (le.el = Ne.el, P(b, le, te)), O.asyncDep.then(() => {
              rt(() => {
                b.isUnmounted || W();
              }, G);
            });
            return;
          }
        }
        let Ae = le, Je;
        Zt(b, !1), le ? (le.el = Ne.el, P(b, le, te)) : le = Ne, de && zs(de), (Je = le.props && le.props.onVnodeBeforeUpdate) && $t(Je, Ce, le, Ne), Zt(b, !0);
        const N = zl(b), Q = b.subTree;
        b.subTree = N, E(
          Q,
          N,
          // parent may have changed if it's in a teleport
          p(Q.el),
          // anchor may have changed if it's in a fragment
          U(Q),
          b,
          G,
          F
        ), le.el = N.el, Ae === null && Hr(b, N.el), be && rt(be, G), (Je = le.props && le.props.onVnodeUpdated) && rt(
          () => $t(Je, Ce, le, Ne),
          G
        );
      } else {
        let le;
        const { el: de, props: be } = w, { bm: Ce, m: Ne, parent: Ae, root: Je, type: N } = b, Q = ds(w);
        Zt(b, !1), Ce && zs(Ce), !Q && (le = be && be.onVnodeBeforeMount) && $t(le, Ae, w), Zt(b, !0);
        {
          Je.ce && Je.ce._hasShadowRoot() && Je.ce._injectChildStyle(
            N,
            b.parent ? b.parent.type : void 0
          );
          const O = b.subTree = zl(b);
          E(
            null,
            O,
            C,
            D,
            b,
            G,
            F
          ), w.el = O.el;
        }
        if (Ne && rt(Ne, G), !Q && (le = be && be.onVnodeMounted)) {
          const O = w;
          rt(
            () => $t(le, Ae, O),
            G
          );
        }
        (w.shapeFlag & 256 || Ae && ds(Ae.vnode) && Ae.vnode.shapeFlag & 256) && b.a && rt(b.a, G), b.isMounted = !0, w = C = D = null;
      }
    };
    b.scope.on();
    const q = b.effect = new Za(X);
    b.scope.off();
    const W = b.update = q.run.bind(q), ge = b.job = q.runIfDirty.bind(q);
    ge.i = b, ge.id = b.uid, q.scheduler = () => bl(ge), Zt(b, !0), W();
  }, P = (b, w, C) => {
    w.component = b;
    const D = b.vnode.props;
    b.vnode = w, b.next = null, jr(b, w.props, D, C), Jr(b, w.children, C), Ft(), Ul(b), Ut();
  }, S = (b, w, C, D, G, F, te, X, q = !1) => {
    const W = b && b.children, ge = b ? b.shapeFlag : 0, le = w.children, { patchFlag: de, shapeFlag: be } = w;
    if (de > 0) {
      if (de & 128) {
        Se(
          W,
          le,
          C,
          D,
          G,
          F,
          te,
          X,
          q
        );
        return;
      } else if (de & 256) {
        B(
          W,
          le,
          C,
          D,
          G,
          F,
          te,
          X,
          q
        );
        return;
      }
    }
    be & 8 ? (ge & 16 && Ze(W, G, F), le !== W && f(C, le)) : ge & 16 ? be & 16 ? Se(
      W,
      le,
      C,
      D,
      G,
      F,
      te,
      X,
      q
    ) : Ze(W, G, F, !0) : (ge & 8 && f(C, ""), be & 16 && y(
      le,
      C,
      D,
      G,
      F,
      te,
      X,
      q
    ));
  }, B = (b, w, C, D, G, F, te, X, q) => {
    b = b || rs, w = w || rs;
    const W = b.length, ge = w.length, le = Math.min(W, ge);
    let de;
    for (de = 0; de < le; de++) {
      const be = w[de] = q ? It(w[de]) : xt(w[de]);
      E(
        b[de],
        be,
        C,
        null,
        G,
        F,
        te,
        X,
        q
      );
    }
    W > ge ? Ze(
      b,
      G,
      F,
      !0,
      !1,
      le
    ) : y(
      w,
      C,
      D,
      G,
      F,
      te,
      X,
      q,
      le
    );
  }, Se = (b, w, C, D, G, F, te, X, q) => {
    let W = 0;
    const ge = w.length;
    let le = b.length - 1, de = ge - 1;
    for (; W <= le && W <= de; ) {
      const be = b[W], Ce = w[W] = q ? It(w[W]) : xt(w[W]);
      if (ys(be, Ce))
        E(
          be,
          Ce,
          C,
          null,
          G,
          F,
          te,
          X,
          q
        );
      else
        break;
      W++;
    }
    for (; W <= le && W <= de; ) {
      const be = b[le], Ce = w[de] = q ? It(w[de]) : xt(w[de]);
      if (ys(be, Ce))
        E(
          be,
          Ce,
          C,
          null,
          G,
          F,
          te,
          X,
          q
        );
      else
        break;
      le--, de--;
    }
    if (W > le) {
      if (W <= de) {
        const be = de + 1, Ce = be < ge ? w[be].el : D;
        for (; W <= de; )
          E(
            null,
            w[W] = q ? It(w[W]) : xt(w[W]),
            C,
            Ce,
            G,
            F,
            te,
            X,
            q
          ), W++;
      }
    } else if (W > de)
      for (; W <= le; )
        z(b[W], G, F, !0), W++;
    else {
      const be = W, Ce = W, Ne = /* @__PURE__ */ new Map();
      for (W = Ce; W <= de; W++) {
        const ot = w[W] = q ? It(w[W]) : xt(w[W]);
        ot.key != null && Ne.set(ot.key, W);
      }
      let Ae, Je = 0;
      const N = de - Ce + 1;
      let Q = !1, O = 0;
      const fe = new Array(N);
      for (W = 0; W < N; W++) fe[W] = 0;
      for (W = be; W <= le; W++) {
        const ot = b[W];
        if (Je >= N) {
          z(ot, G, F, !0);
          continue;
        }
        let kt;
        if (ot.key != null)
          kt = Ne.get(ot.key);
        else
          for (Ae = Ce; Ae <= de; Ae++)
            if (fe[Ae - Ce] === 0 && ys(ot, w[Ae])) {
              kt = Ae;
              break;
            }
        kt === void 0 ? z(ot, G, F, !0) : (fe[kt - Ce] = W + 1, kt >= O ? O = kt : Q = !0, E(
          ot,
          w[kt],
          C,
          null,
          G,
          F,
          te,
          X,
          q
        ), Je++);
      }
      const je = Q ? Xr(fe) : rs;
      for (Ae = je.length - 1, W = N - 1; W >= 0; W--) {
        const ot = Ce + W, kt = w[ot], Ol = w[ot + 1], Il = ot + 1 < ge ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Ol.el || Hi(Ol)
        ) : D;
        fe[W] === 0 ? E(
          null,
          kt,
          C,
          Il,
          G,
          F,
          te,
          X,
          q
        ) : Q && (Ae < 0 || W !== je[Ae] ? M(kt, C, Il, 2) : Ae--);
      }
    }
  }, M = (b, w, C, D, G = null) => {
    const { el: F, type: te, transition: X, children: q, shapeFlag: W } = b;
    if (W & 6) {
      M(b.component.subTree, w, C, D);
      return;
    }
    if (W & 128) {
      b.suspense.move(w, C, D);
      return;
    }
    if (W & 64) {
      te.move(b, w, C, ue);
      return;
    }
    if (te === Y) {
      n(F, w, C);
      for (let le = 0; le < q.length; le++)
        M(q[le], w, C, D);
      n(b.anchor, w, C);
      return;
    }
    if (te === On) {
      H(b, w, C);
      return;
    }
    if (D !== 2 && W & 1 && X)
      if (D === 0)
        X.beforeEnter(F), n(F, w, C), rt(() => X.enter(F), G);
      else {
        const { leave: le, delayLeave: de, afterLeave: be } = X, Ce = () => {
          b.ctx.isUnmounted ? i(F) : n(F, w, C);
        }, Ne = () => {
          F._isLeaving && F[vr](
            !0
            /* cancelled */
          ), le(F, () => {
            Ce(), be && be();
          });
        };
        de ? de(F, Ce, Ne) : Ne();
      }
    else
      n(F, w, C);
  }, z = (b, w, C, D = !1, G = !1) => {
    const {
      type: F,
      props: te,
      ref: X,
      children: q,
      dynamicChildren: W,
      shapeFlag: ge,
      patchFlag: le,
      dirs: de,
      cacheIndex: be
    } = b;
    if (le === -2 && (G = !1), X != null && (Ft(), xs(X, null, C, b, !0), Ut()), be != null && (w.renderCache[be] = void 0), ge & 256) {
      w.ctx.deactivate(b);
      return;
    }
    const Ce = ge & 1 && de, Ne = !ds(b);
    let Ae;
    if (Ne && (Ae = te && te.onVnodeBeforeUnmount) && $t(Ae, w, b), ge & 6)
      dt(b.component, C, D);
    else {
      if (ge & 128) {
        b.suspense.unmount(C, D);
        return;
      }
      Ce && Yt(b, null, w, "beforeUnmount"), ge & 64 ? b.type.remove(
        b,
        w,
        C,
        ue,
        D
      ) : W && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !W.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (F !== Y || le > 0 && le & 64) ? Ze(
        W,
        w,
        C,
        !1,
        !0
      ) : (F === Y && le & 384 || !G && ge & 16) && Ze(q, w, C), D && se(b);
    }
    (Ne && (Ae = te && te.onVnodeUnmounted) || Ce) && rt(() => {
      Ae && $t(Ae, w, b), Ce && Yt(b, null, w, "unmounted");
    }, C);
  }, se = (b) => {
    const { type: w, el: C, anchor: D, transition: G } = b;
    if (w === Y) {
      Te(C, D);
      return;
    }
    if (w === On) {
      L(b);
      return;
    }
    const F = () => {
      i(C), G && !G.persisted && G.afterLeave && G.afterLeave();
    };
    if (b.shapeFlag & 1 && G && !G.persisted) {
      const { leave: te, delayLeave: X } = G, q = () => te(C, F);
      X ? X(b.el, F, q) : q();
    } else
      F();
  }, Te = (b, w) => {
    let C;
    for (; b !== w; )
      C = g(b), i(b), b = C;
    i(w);
  }, dt = (b, w, C) => {
    const { bum: D, scope: G, job: F, subTree: te, um: X, m: q, a: W } = b;
    Ql(q), Ql(W), D && zs(D), G.stop(), F && (F.flags |= 8, z(te, b, w, C)), X && rt(X, w), rt(() => {
      b.isUnmounted = !0;
    }, w);
  }, Ze = (b, w, C, D = !1, G = !1, F = 0) => {
    for (let te = F; te < b.length; te++)
      z(b[te], w, C, D, G);
  }, U = (b) => {
    if (b.shapeFlag & 6)
      return U(b.component.subTree);
    if (b.shapeFlag & 128)
      return b.suspense.next();
    const w = g(b.anchor || b.el), C = w && w[mr];
    return C ? g(C) : w;
  };
  let ne = !1;
  const J = (b, w, C) => {
    let D;
    b == null ? w._vnode && (z(w._vnode, null, null, !0), D = w._vnode.component) : E(
      w._vnode || null,
      b,
      w,
      null,
      null,
      null,
      C
    ), w._vnode = b, ne || (ne = !0, Ul(D), mi(), ne = !1);
  }, ue = {
    p: E,
    um: z,
    m: M,
    r: se,
    mt: Re,
    mc: y,
    pc: S,
    pbc: A,
    n: U,
    o: e
  };
  return {
    render: J,
    hydrate: void 0,
    createApp: Dr(J)
  };
}
function Mn({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function Zt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Zr(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Gi(e, t, s = !1) {
  const n = e.children, i = t.children;
  if (me(n) && me(i))
    for (let r = 0; r < n.length; r++) {
      const c = n[r];
      let u = i[r];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = i[r] = It(i[r]), u.el = c.el), !s && u.patchFlag !== -2 && Gi(c, u)), u.type === bn && (u.patchFlag === -1 && (u = i[r] = It(u)), u.el = c.el), u.type === Bt && !u.el && (u.el = c.el);
    }
}
function Xr(e) {
  const t = e.slice(), s = [0];
  let n, i, r, c, u;
  const d = e.length;
  for (n = 0; n < d; n++) {
    const h = e[n];
    if (h !== 0) {
      if (i = s[s.length - 1], e[i] < h) {
        t[n] = i, s.push(n);
        continue;
      }
      for (r = 0, c = s.length - 1; r < c; )
        u = r + c >> 1, e[s[u]] < h ? r = u + 1 : c = u;
      h < e[s[r]] && (r > 0 && (t[n] = s[r - 1]), s[r] = n);
    }
  }
  for (r = s.length, c = s[r - 1]; r-- > 0; )
    s[r] = c, c = t[c];
  return s;
}
function Bi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Bi(t);
}
function Ql(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Hi(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Hi(t.subTree) : null;
}
const Wi = (e) => e.__isSuspense;
function ec(e, t) {
  t && t.pendingBranch ? me(e) ? t.effects.push(...e) : t.effects.push(e) : fr(e);
}
const Y = /* @__PURE__ */ Symbol.for("v-fgt"), bn = /* @__PURE__ */ Symbol.for("v-txt"), Bt = /* @__PURE__ */ Symbol.for("v-cmt"), On = /* @__PURE__ */ Symbol.for("v-stc"), Es = [];
let ft = null;
function _(e = !1) {
  Es.push(ft = e ? null : []);
}
function tc() {
  Es.pop(), ft = Es[Es.length - 1] || null;
}
let Ns = 1;
function nn(e, t = !1) {
  Ns += e, e < 0 && ft && t && (ft.hasOnce = !0);
}
function ji(e) {
  return e.dynamicChildren = Ns > 0 ? ft || rs : null, tc(), Ns > 0 && ft && ft.push(e), e;
}
function v(e, t, s, n, i, r) {
  return ji(
    l(
      e,
      t,
      s,
      n,
      i,
      r,
      !0
    )
  );
}
function ze(e, t, s, n, i) {
  return ji(
    ee(
      e,
      t,
      s,
      n,
      i,
      !0
    )
  );
}
function Ds(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ys(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ki = ({ key: e }) => e ?? null, Js = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? We(e) || /* @__PURE__ */ Be(e) || ve(e) ? { i: tt, r: e, k: t, f: !!s } : e : null);
function l(e, t = null, s = null, n = 0, i = null, r = e === Y ? 0 : 1, c = !1, u = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ki(t),
    ref: t && Js(t),
    scopeId: vi,
    slotScopeIds: null,
    children: s,
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
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: tt
  };
  return u ? (Cl(d, s), r & 128 && e.normalize(d)) : s && (d.shapeFlag |= We(s) ? 8 : 16), Ns > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  ft && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (d.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  d.patchFlag !== 32 && ft.push(d), d;
}
const ee = sc;
function sc(e, t = null, s = null, n = 0, i = null, r = !1) {
  if ((!e || e === Er) && (e = Bt), Ds(e)) {
    const u = ps(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Cl(u, s), Ns > 0 && !r && ft && (u.shapeFlag & 6 ? ft[ft.indexOf(e)] = u : ft.push(u)), u.patchFlag = -2, u;
  }
  if (fc(e) && (e = e.__vccOpts), t) {
    t = nc(t);
    let { class: u, style: d } = t;
    u && !We(u) && (t.class = pe(u)), Ie(d) && (/* @__PURE__ */ pn(d) && !me(d) && (d = Qe({}, d)), t.style = rl(d));
  }
  const c = We(e) ? 1 : Wi(e) ? 128 : br(e) ? 64 : Ie(e) ? 4 : ve(e) ? 2 : 0;
  return l(
    e,
    t,
    s,
    n,
    i,
    c,
    r,
    !0
  );
}
function nc(e) {
  return e ? /* @__PURE__ */ pn(e) || Ni(e) ? Qe({}, e) : e : null;
}
function ps(e, t, s = !1, n = !1) {
  const { props: i, ref: r, patchFlag: c, children: u, transition: d } = e, h = t ? lc(i || {}, t) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: h,
    key: h && Ki(h),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? me(r) ? r.concat(Js(t)) : [r, Js(t)] : Js(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: u,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Y ? c === -1 ? 16 : c | 16 : c,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: d,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ps(e.ssContent),
    ssFallback: e.ssFallback && ps(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return d && n && vl(
    f,
    d.clone(f)
  ), f;
}
function Sl(e = " ", t = 0) {
  return ee(bn, null, e, t);
}
function re(e = "", t = !1) {
  return t ? (_(), ze(Bt, null, e)) : ee(Bt, null, e);
}
function xt(e) {
  return e == null || typeof e == "boolean" ? ee(Bt) : me(e) ? ee(
    Y,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ds(e) ? It(e) : ee(bn, null, String(e));
}
function It(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ps(e);
}
function Cl(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (me(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Cl(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !Ni(t) ? t._ctx = tt : i === 3 && tt && (tt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else ve(t) ? (t = { default: t, _ctx: tt }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Sl(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function lc(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = pe([t.class, n.class]));
      else if (i === "style")
        t.style = rl([t.style, n.style]);
      else if (on(i)) {
        const r = t[i], c = n[i];
        c && r !== c && !(me(r) && r.includes(c)) && (t[i] = r ? [].concat(r, c) : c);
      } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function $t(e, t, s, n = null) {
  At(e, t, 7, [
    s,
    n
  ]);
}
const ac = Ai();
let ic = 0;
function oc(e, t, s) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || ac, r = {
    uid: ic++,
    vnode: e,
    type: n,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ja(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Li(n, i),
    emitsOptions: Pi(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: De,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: De,
    data: De,
    props: De,
    attrs: De,
    slots: De,
    refs: De,
    setupState: De,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Fr.bind(null, r), e.ce && e.ce(r), r;
}
let at = null;
const zi = () => at || tt;
let ln, Jn;
{
  const e = dn(), t = (s, n) => {
    let i;
    return (i = e[s]) || (i = e[s] = []), i.push(n), (r) => {
      i.length > 1 ? i.forEach((c) => c(r)) : i[0](r);
    };
  };
  ln = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => at = s
  ), Jn = t(
    "__VUE_SSR_SETTERS__",
    (s) => Ls = s
  );
}
const Gs = (e) => {
  const t = at;
  return ln(e), e.scope.on(), () => {
    e.scope.off(), ln(t);
  };
}, Yl = () => {
  at && at.scope.off(), ln(null);
};
function qi(e) {
  return e.vnode.shapeFlag & 4;
}
let Ls = !1;
function rc(e, t = !1, s = !1) {
  t && Jn(t);
  const { props: n, children: i } = e.vnode, r = qi(e);
  Wr(e, n, r, t), qr(e, i, s || t);
  const c = r ? cc(e, t) : void 0;
  return t && Jn(!1), c;
}
function cc(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Tr);
  const { setup: n } = s;
  if (n) {
    Ft();
    const i = e.setupContext = n.length > 1 ? dc(e) : null, r = Gs(e), c = Vs(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), u = Ga(c);
    if (Ut(), r(), (u || e.sp) && !ds(e) && ki(e), u) {
      if (c.then(Yl, Yl), t)
        return c.then((d) => {
          Zl(e, d);
        }).catch((d) => {
          hn(d, e, 0);
        });
      e.asyncDep = c;
    } else
      Zl(e, c);
  } else
    Ji(e);
}
function Zl(e, t, s) {
  ve(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ie(t) && (e.setupState = ml(t)), Ji(e);
}
function Ji(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Et);
  {
    const i = Gs(e);
    Ft();
    try {
      Ar(e);
    } finally {
      Ut(), i();
    }
  }
}
const uc = {
  get(e, t) {
    return et(e, "get", ""), e[t];
  }
};
function dc(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, uc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function vn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ml(_l(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Rs)
        return Rs[s](e);
    },
    has(t, s) {
      return s in t || s in Rs;
    }
  })) : e.proxy;
}
function fc(e) {
  return ve(e) && "__vccOpts" in e;
}
const K = (e, t) => /* @__PURE__ */ or(e, t, Ls);
function Qi(e, t, s) {
  try {
    nn(-1);
    const n = arguments.length;
    return n === 2 ? Ie(t) && !me(t) ? Ds(t) ? ee(e, null, [t]) : ee(e, t) : ee(e, null, t) : (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && Ds(s) && (s = [s]), ee(e, t, s));
  } finally {
    nn(1);
  }
}
const pc = "3.5.30";
/**
* @vue/runtime-dom v3.5.30
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Qn;
const Xl = typeof window < "u" && window.trustedTypes;
if (Xl)
  try {
    Qn = /* @__PURE__ */ Xl.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Yi = Qn ? (e) => Qn.createHTML(e) : (e) => e, hc = "http://www.w3.org/2000/svg", gc = "http://www.w3.org/1998/Math/MathML", Ot = typeof document < "u" ? document : null, ea = Ot && /* @__PURE__ */ Ot.createElement("template"), _c = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const i = t === "svg" ? Ot.createElementNS(hc, e) : t === "mathml" ? Ot.createElementNS(gc, e) : s ? Ot.createElement(e, { is: s }) : Ot.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => Ot.createTextNode(e),
  createComment: (e) => Ot.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ot.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, i, r) {
    const c = s ? s.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), s), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      ea.innerHTML = Yi(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const u = ea.content;
      if (n === "svg" || n === "mathml") {
        const d = u.firstChild;
        for (; d.firstChild; )
          u.appendChild(d.firstChild);
        u.removeChild(d);
      }
      t.insertBefore(u, s);
    }
    return [
      // first
      c ? c.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, mc = /* @__PURE__ */ Symbol("_vtc");
function bc(e, t, s) {
  const n = e[mc];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const ta = /* @__PURE__ */ Symbol("_vod"), vc = /* @__PURE__ */ Symbol("_vsh"), yc = /* @__PURE__ */ Symbol(""), wc = /(?:^|;)\s*display\s*:/;
function kc(e, t, s) {
  const n = e.style, i = We(s);
  let r = !1;
  if (s && !i) {
    if (t)
      if (We(t))
        for (const c of t.split(";")) {
          const u = c.slice(0, c.indexOf(":")).trim();
          s[u] == null && Qs(n, u, "");
        }
      else
        for (const c in t)
          s[c] == null && Qs(n, c, "");
    for (const c in s)
      c === "display" && (r = !0), Qs(n, c, s[c]);
  } else if (i) {
    if (t !== s) {
      const c = n[yc];
      c && (s += ";" + c), n.cssText = s, r = wc.test(s);
    }
  } else t && e.removeAttribute("style");
  ta in e && (e[ta] = r ? n.display : "", e[vc] && (n.display = "none"));
}
const sa = /\s*!important$/;
function Qs(e, t, s) {
  if (me(s))
    s.forEach((n) => Qs(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = $c(e, t);
    sa.test(s) ? e.setProperty(
      Qt(n),
      s.replace(sa, ""),
      "important"
    ) : e[n] = s;
  }
}
const na = ["Webkit", "Moz", "ms"], In = {};
function $c(e, t) {
  const s = In[t];
  if (s)
    return s;
  let n = mt(t);
  if (n !== "filter" && n in e)
    return In[t] = n;
  n = Wa(n);
  for (let i = 0; i < na.length; i++) {
    const r = na[i] + n;
    if (r in e)
      return In[t] = r;
  }
  return t;
}
const la = "http://www.w3.org/1999/xlink";
function aa(e, t, s, n, i, r = Po(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(la, t.slice(6, t.length)) : e.setAttributeNS(la, t, s) : s == null || r && !Ka(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : vt(s) ? String(s) : s
  );
}
function ia(e, t, s, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Yi(s) : s);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const u = r === "OPTION" ? e.getAttribute("value") || "" : e.value, d = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (u !== d || !("_value" in e)) && (e.value = d), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let c = !1;
  if (s === "" || s == null) {
    const u = typeof e[t];
    u === "boolean" ? s = Ka(s) : s == null && u === "string" ? (s = "", c = !0) : u === "number" && (s = 0, c = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  c && e.removeAttribute(i || t);
}
function Lt(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Sc(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const oa = /* @__PURE__ */ Symbol("_vei");
function Cc(e, t, s, n, i = null) {
  const r = e[oa] || (e[oa] = {}), c = r[t];
  if (n && c)
    c.value = n;
  else {
    const [u, d] = xc(t);
    if (n) {
      const h = r[t] = Tc(
        n,
        i
      );
      Lt(e, u, h, d);
    } else c && (Sc(e, u, c, d), r[t] = void 0);
  }
}
const ra = /(?:Once|Passive|Capture)$/;
function xc(e) {
  let t;
  if (ra.test(e)) {
    t = {};
    let n;
    for (; n = e.match(ra); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Qt(e.slice(2)), t];
}
let Nn = 0;
const Rc = /* @__PURE__ */ Promise.resolve(), Ec = () => Nn || (Rc.then(() => Nn = 0), Nn = Date.now());
function Tc(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    At(
      Ac(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Ec(), s;
}
function Ac(e, t) {
  if (me(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (i) => !i._stopped && n && n(i)
    );
  } else
    return t;
}
const ca = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Pc = (e, t, s, n, i, r) => {
  const c = i === "svg";
  t === "class" ? bc(e, n, c) : t === "style" ? kc(e, s, n) : on(t) ? il(t) || Cc(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Mc(e, t, n, c)) ? (ia(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && aa(e, t, n, c, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Oc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !We(n))) ? ia(e, mt(t), n, r, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), aa(e, t, n, c));
};
function Mc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ca(t) && ve(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return ca(t) && We(s) ? !1 : t in e;
}
function Oc(e, t) {
  const s = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!s)
    return !1;
  const n = mt(t);
  return Array.isArray(s) ? s.some((i) => mt(i) === n) : Object.keys(s).some((i) => mt(i) === n);
}
const Jt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return me(t) ? (s) => zs(t, s) : t;
};
function Ic(e) {
  e.target.composing = !0;
}
function ua(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const gt = /* @__PURE__ */ Symbol("_assign");
function da(e, t, s) {
  return t && (e = e.trim()), s && (e = un(e)), e;
}
const Ue = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, i) {
    e[gt] = Jt(i);
    const r = n || i.props && i.props.type === "number";
    Lt(e, t ? "change" : "input", (c) => {
      c.target.composing || e[gt](da(e.value, s, r));
    }), (s || r) && Lt(e, "change", () => {
      e.value = da(e.value, s, r);
    }), t || (Lt(e, "compositionstart", Ic), Lt(e, "compositionend", ua), Lt(e, "change", ua));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: i, number: r } }, c) {
    if (e[gt] = Jt(c), e.composing) return;
    const u = (r || e.type === "number") && !/^0\d/.test(e.value) ? un(e.value) : e.value, d = t ?? "";
    u !== d && (document.activeElement === e && e.type !== "range" && (n && t === s || i && e.value.trim() === d) || (e.value = d));
  }
}, os = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, s) {
    e[gt] = Jt(s), Lt(e, "change", () => {
      const n = e._modelValue, i = hs(e), r = e.checked, c = e[gt];
      if (me(n)) {
        const u = cl(n, i), d = u !== -1;
        if (r && !d)
          c(n.concat(i));
        else if (!r && d) {
          const h = [...n];
          h.splice(u, 1), c(h);
        }
      } else if (ms(n)) {
        const u = new Set(n);
        r ? u.add(i) : u.delete(i), c(u);
      } else
        c(Zi(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: fa,
  beforeUpdate(e, t, s) {
    e[gt] = Jt(s), fa(e, t, s);
  }
};
function fa(e, { value: t, oldValue: s }, n) {
  e._modelValue = t;
  let i;
  if (me(t))
    i = cl(t, n.props.value) > -1;
  else if (ms(t))
    i = t.has(n.props.value);
  else {
    if (t === s) return;
    i = qt(t, Zi(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const Nc = {
  created(e, { value: t }, s) {
    e.checked = qt(t, s.props.value), e[gt] = Jt(s), Lt(e, "change", () => {
      e[gt](hs(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: s }, n) {
    e[gt] = Jt(n), t !== s && (e.checked = qt(t, n.props.value));
  }
}, _t = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    const i = ms(t);
    Lt(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => s ? un(hs(c)) : hs(c)
      );
      e[gt](
        e.multiple ? i ? new Set(r) : r : r[0]
      ), e._assigning = !0, gn(() => {
        e._assigning = !1;
      });
    }), e[gt] = Jt(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    pa(e, t);
  },
  beforeUpdate(e, t, s) {
    e[gt] = Jt(s);
  },
  updated(e, { value: t }) {
    e._assigning || pa(e, t);
  }
};
function pa(e, t) {
  const s = e.multiple, n = me(t);
  if (!(s && !n && !ms(t))) {
    for (let i = 0, r = e.options.length; i < r; i++) {
      const c = e.options[i], u = hs(c);
      if (s)
        if (n) {
          const d = typeof u;
          d === "string" || d === "number" ? c.selected = t.some((h) => String(h) === String(u)) : c.selected = cl(t, u) > -1;
        } else
          c.selected = t.has(u);
      else if (qt(hs(c), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function hs(e) {
  return "_value" in e ? e._value : e.value;
}
function Zi(e, t) {
  const s = t ? "_trueValue" : "_falseValue";
  return s in e ? e[s] : t;
}
const Dc = {
  created(e, t, s) {
    js(e, t, s, null, "created");
  },
  mounted(e, t, s) {
    js(e, t, s, null, "mounted");
  },
  beforeUpdate(e, t, s, n) {
    js(e, t, s, n, "beforeUpdate");
  },
  updated(e, t, s, n) {
    js(e, t, s, n, "updated");
  }
};
function Lc(e, t) {
  switch (e) {
    case "SELECT":
      return _t;
    case "TEXTAREA":
      return Ue;
    default:
      switch (t) {
        case "checkbox":
          return os;
        case "radio":
          return Nc;
        default:
          return Ue;
      }
  }
}
function js(e, t, s, n, i) {
  const c = Lc(
    e.tagName,
    s.props && s.props.type
  )[i];
  c && c(e, t, s, n);
}
const Fc = ["ctrl", "shift", "alt", "meta"], Uc = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Fc.some((s) => e[`${s}Key`] && !t.includes(s))
}, bs = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = (i, ...r) => {
    for (let c = 0; c < t.length; c++) {
      const u = Uc[t[c]];
      if (u && u(i, t)) return;
    }
    return e(i, ...r);
  });
}, Vc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Gc = (e, t) => {
  const s = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return s[n] || (s[n] = (i) => {
    if (!("key" in i))
      return;
    const r = Qt(i.key);
    if (t.some(
      (c) => c === r || Vc[c] === r
    ))
      return e(i);
  });
}, Bc = /* @__PURE__ */ Qe({ patchProp: Pc }, _c);
let ha;
function Hc() {
  return ha || (ha = Qr(Bc));
}
const Wc = (...e) => {
  const t = Hc().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const i = Kc(n);
    if (!i) return;
    const r = t._component;
    !ve(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const c = s(i, !1, jc(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), c;
  }, t;
};
function jc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Kc(e) {
  return We(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Xi;
const yn = (e) => Xi = e, eo = (
  /* istanbul ignore next */
  Symbol()
);
function Yn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Ts;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Ts || (Ts = {}));
function zc() {
  const e = Qa(!0), t = e.run(() => /* @__PURE__ */ j({}));
  let s = [], n = [];
  const i = _l({
    install(r) {
      yn(i), i._a = r, r.provide(eo, i), r.config.globalProperties.$pinia = i, n.forEach((c) => s.push(c)), n = [];
    },
    use(r) {
      return this._a ? s.push(r) : n.push(r), this;
    },
    _p: s,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return i;
}
const to = () => {
};
function ga(e, t, s, n = to) {
  e.push(t);
  const i = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), n());
  };
  return !s && Ya() && Oo(i), i;
}
function ls(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const qc = (e) => e(), _a = Symbol(), Dn = Symbol();
function Zn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((s, n) => e.set(n, s)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const n = t[s], i = e[s];
    Yn(i) && Yn(n) && e.hasOwnProperty(s) && !/* @__PURE__ */ Be(n) && !/* @__PURE__ */ Tt(n) ? e[s] = Zn(i, n) : e[s] = n;
  }
  return e;
}
const Jc = (
  /* istanbul ignore next */
  Symbol()
);
function Qc(e) {
  return !Yn(e) || !e.hasOwnProperty(Jc);
}
const { assign: jt } = Object;
function Yc(e) {
  return !!(/* @__PURE__ */ Be(e) && e.effect);
}
function Zc(e, t, s, n) {
  const { state: i, actions: r, getters: c } = t, u = s.state.value[e];
  let d;
  function h() {
    u || (s.state.value[e] = i ? i() : {});
    const f = /* @__PURE__ */ sr(s.state.value[e]);
    return jt(f, r, Object.keys(c || {}).reduce((p, g) => (p[g] = _l(K(() => {
      yn(s);
      const m = s._s.get(e);
      return c[g].call(m, m);
    })), p), {}));
  }
  return d = so(e, h, t, s, n, !0), d;
}
function so(e, t, s = {}, n, i, r) {
  let c;
  const u = jt({ actions: {} }, s), d = { deep: !0 };
  let h, f, p = [], g = [], m;
  const k = n.state.value[e];
  !r && !k && (n.state.value[e] = {});
  let E;
  function $(y) {
    let R;
    h = f = !1, typeof y == "function" ? (y(n.state.value[e]), R = {
      type: Ts.patchFunction,
      storeId: e,
      events: m
    }) : (Zn(n.state.value[e], y), R = {
      type: Ts.patchObject,
      payload: y,
      storeId: e,
      events: m
    });
    const A = E = Symbol();
    gn().then(() => {
      E === A && (h = !0);
    }), f = !0, ls(p, R, n.state.value[e]);
  }
  const I = r ? function() {
    const { state: R } = s, A = R ? R() : {};
    this.$patch((ce) => {
      jt(ce, A);
    });
  } : (
    /* istanbul ignore next */
    to
  );
  function x() {
    c.stop(), p = [], g = [], n._s.delete(e);
  }
  const H = (y, R = "") => {
    if (_a in y)
      return y[Dn] = R, y;
    const A = function() {
      yn(n);
      const ce = Array.from(arguments), oe = [], he = [];
      function Re(P) {
        oe.push(P);
      }
      function Le(P) {
        he.push(P);
      }
      ls(g, {
        args: ce,
        name: A[Dn],
        store: Z,
        after: Re,
        onError: Le
      });
      let $e;
      try {
        $e = y.apply(this && this.$id === e ? this : Z, ce);
      } catch (P) {
        throw ls(he, P), P;
      }
      return $e instanceof Promise ? $e.then((P) => (ls(oe, P), P)).catch((P) => (ls(he, P), Promise.reject(P))) : (ls(oe, $e), $e);
    };
    return A[_a] = !0, A[Dn] = R, A;
  }, L = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: ga.bind(null, g),
    $patch: $,
    $reset: I,
    $subscribe(y, R = {}) {
      const A = ga(p, y, R.detached, () => ce()), ce = c.run(() => Oe(() => n.state.value[e], (oe) => {
        (R.flush === "sync" ? f : h) && y({
          storeId: e,
          type: Ts.direct,
          events: m
        }, oe);
      }, jt({}, d, R)));
      return A;
    },
    $dispose: x
  }, Z = /* @__PURE__ */ Vt(L);
  n._s.set(e, Z);
  const T = (n._a && n._a.runWithContext || qc)(() => n._e.run(() => (c = Qa()).run(() => t({ action: H }))));
  for (const y in T) {
    const R = T[y];
    if (/* @__PURE__ */ Be(R) && !Yc(R) || /* @__PURE__ */ Tt(R))
      r || (k && Qc(R) && (/* @__PURE__ */ Be(R) ? R.value = k[y] : Zn(R, k[y])), n.state.value[e][y] = R);
    else if (typeof R == "function") {
      const A = H(R, y);
      T[y] = A, u.actions[y] = R;
    }
  }
  return jt(Z, T), jt(/* @__PURE__ */ xe(Z), T), Object.defineProperty(Z, "$state", {
    get: () => n.state.value[e],
    set: (y) => {
      $((R) => {
        jt(R, y);
      });
    }
  }), n._p.forEach((y) => {
    jt(Z, c.run(() => y({
      store: Z,
      app: n._a,
      pinia: n,
      options: u
    })));
  }), k && r && s.hydrate && s.hydrate(Z.$state, k), h = !0, f = !0, Z;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function wn(e, t, s) {
  let n, i;
  const r = typeof t == "function";
  typeof e == "string" ? (n = e, i = r ? s : t) : (i = e, n = e.id);
  function c(u, d) {
    const h = pr();
    return u = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    u || (h ? ht(eo, null) : null), u && yn(u), u = Xi, u._s.has(n) || (r ? so(n, t, i, u) : Zc(n, i, u)), u._s.get(n);
  }
  return c.$id = n, c;
}
function no(e) {
  {
    const t = /* @__PURE__ */ xe(e), s = {};
    for (const n in t) {
      const i = t[n];
      i.effect ? s[n] = // ...
      K({
        get: () => e[n],
        set(r) {
          e[n] = r;
        }
      }) : (/* @__PURE__ */ Be(i) || /* @__PURE__ */ Tt(i)) && (s[n] = // ---
      /* @__PURE__ */ ar(e, n));
    }
    return s;
  }
}
const xl = "openclaw-guard.auth-token", Xn = "openclaw-guard:unauthorized";
function lo() {
  return typeof window > "u" ? null : window.localStorage.getItem(xl);
}
function Xc(e) {
  typeof window > "u" || window.localStorage.setItem(xl, e);
}
function ao() {
  typeof window > "u" || window.localStorage.removeItem(xl);
}
function eu() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Xn));
}
function tu(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Xn, e), () => window.removeEventListener(Xn, e));
}
async function su(e) {
  if ((e.headers.get("content-type") || "").includes("application/json"))
    try {
      const n = await e.json();
      return n.message || n.error || `Request failed with ${e.status}`;
    } catch {
      return `Request failed with ${e.status}`;
    }
  return await e.text() || `Request failed with ${e.status}`;
}
async function Rl(e, t = {}) {
  const s = new Headers(t.headers);
  s.set("Accept", "application/json");
  let n = !1;
  if (!s.has("Authorization")) {
    const c = lo();
    c && (s.set("Authorization", `Bearer ${c}`), n = !0);
  }
  let i = t.body;
  i && typeof i == "object" && !(i instanceof FormData) && !(i instanceof URLSearchParams) && !(i instanceof Blob) && (s.set("Content-Type", "application/json"), i = JSON.stringify(i));
  const r = await fetch(e, {
    ...t,
    headers: s,
    body: i
  });
  if (!r.ok)
    throw r.status === 401 && n && (ao(), eu()), new Error(await su(r));
  return r.json();
}
function Ee(e) {
  return Rl(e);
}
function Ve(e, t) {
  return Rl(e, {
    method: "POST",
    body: t
  });
}
function io(e) {
  return Rl(e, {
    method: "DELETE"
  });
}
async function nu() {
  return Ee("/api/auth/status");
}
async function lu() {
  return Ee("/api/info");
}
async function au(e) {
  return Ve("/api/auth/login", { password: e });
}
async function iu() {
  return Ve("/api/auth/logout", {});
}
async function ou(e, t) {
  return Ve("/api/auth/change-password", {
    currentPassword: e,
    newPassword: t
  });
}
const kn = /* @__PURE__ */ wn("auth", () => {
  const e = /* @__PURE__ */ j(!1), t = /* @__PURE__ */ j(!1), s = /* @__PURE__ */ j(!0), n = /* @__PURE__ */ j(!1), i = /* @__PURE__ */ j(!1), r = /* @__PURE__ */ j(null), c = /* @__PURE__ */ j("openclaw-guard auth show-password"), u = /* @__PURE__ */ j(!1), d = /* @__PURE__ */ j(!1), h = K(() => e.value && s.value && !u.value);
  function f() {
    ao(), u.value = !1, d.value = !1;
  }
  async function p() {
    if (!(t.value || e.value)) {
      t.value = !0;
      try {
        const x = await nu();
        if (s.value = x.enabled, n.value = x.configured, i.value = x.initialPasswordAvailable, r.value = x.initialPasswordCreatedAt, c.value = x.revealCommand || c.value, !x.enabled) {
          u.value = !0;
          return;
        }
        if (!lo()) {
          f();
          return;
        }
        try {
          await lu(), u.value = !0;
        } catch {
          f();
        }
      } finally {
        e.value = !0, t.value = !1;
      }
    }
  }
  async function g(x) {
    const H = await au(x);
    return H.token && (Xc(H.token), u.value = !0), H;
  }
  async function m() {
    try {
      await iu();
    } catch {
    } finally {
      f();
    }
  }
  async function k(x, H) {
    const L = await ou(x, H);
    if (!L.success)
      throw new Error(L.error || "Password update failed");
    return f(), L;
  }
  function E() {
    d.value = !0;
  }
  function $() {
    d.value = !1;
  }
  function I() {
    s.value && f();
  }
  return {
    ready: e,
    bootstrapping: t,
    authEnabled: s,
    configured: n,
    initialPasswordAvailable: i,
    initialPasswordCreatedAt: r,
    revealCommand: c,
    authenticated: u,
    requiresLogin: h,
    changePasswordOpen: d,
    hydrate: p,
    login: g,
    logout: m,
    changePassword: k,
    openChangePassword: E,
    closeChangePassword: $,
    handleUnauthorized: I
  };
});
let ru = 0;
const ut = /* @__PURE__ */ wn("feedback", () => {
  const e = /* @__PURE__ */ j([]), t = /* @__PURE__ */ j(null);
  let s = null;
  function n(u) {
    const d = {
      id: ++ru,
      title: u.title,
      message: u.message,
      tone: u.tone || "info"
    };
    e.value.push(d);
    const h = typeof u.durationMs == "number" ? u.durationMs : 3600;
    return typeof window < "u" && h > 0 && window.setTimeout(() => i(d.id), h), d.id;
  }
  function i(u) {
    e.value = e.value.filter((d) => d.id !== u);
  }
  function r(u) {
    return s && (s(!1), s = null), t.value = {
      title: u.title,
      message: u.message,
      confirmLabel: u.confirmLabel || "Confirm",
      cancelLabel: u.cancelLabel || "Cancel",
      tone: u.tone || "default"
    }, new Promise((d) => {
      s = d;
    });
  }
  function c(u) {
    const d = s;
    s = null, t.value = null, d == null || d(u);
  }
  return {
    toasts: e,
    confirmRequest: t,
    pushToast: n,
    dismissToast: i,
    confirm: r,
    resolveConfirm: c
  };
}), ma = "openclaw-guard.theme", ba = "openclaw-guard.lang", va = "openclaw-guard.developer-mode";
function cu() {
  return typeof window > "u" ? "dark" : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
const qe = /* @__PURE__ */ wn("ui", () => {
  const e = /* @__PURE__ */ j("auto"), t = /* @__PURE__ */ j("zh"), s = /* @__PURE__ */ j(!1), n = /* @__PURE__ */ j(!1), i = K(() => e.value === "auto" ? cu() : e.value);
  function r() {
    typeof document > "u" || (document.documentElement.dataset.theme = i.value, document.documentElement.lang = t.value === "zh" ? "zh-CN" : "en", document.documentElement.dataset.developerMode = s.value ? "on" : "off");
  }
  function c() {
    if (n.value || typeof window > "u") {
      r();
      return;
    }
    const p = window.localStorage.getItem(ma), g = window.localStorage.getItem(ba), m = window.localStorage.getItem(va);
    (p === "auto" || p === "light" || p === "dark") && (e.value = p), (g === "zh" || g === "en") && (t.value = g), s.value = m === "1", n.value = !0, r();
  }
  function u(p) {
    e.value = p, typeof window < "u" && window.localStorage.setItem(ma, p), r();
  }
  function d(p) {
    t.value = p, typeof window < "u" && window.localStorage.setItem(ba, p), r();
  }
  function h(p) {
    s.value = p, typeof window < "u" && window.localStorage.setItem(va, p ? "1" : "0"), r();
  }
  function f(p, g) {
    return t.value === "zh" ? p : g;
  }
  return {
    themePreference: e,
    language: t,
    developerMode: s,
    resolvedTheme: i,
    hydrate: c,
    setThemePreference: u,
    setLanguage: d,
    setDeveloperMode: h,
    applyDocumentState: r,
    label: f
  };
}), uu = { class: "confirm-dialog auth-dialog" }, du = { class: "confirm-dialog__header" }, fu = { class: "page-card__eyebrow" }, pu = { class: "page-card__title" }, hu = { class: "auth-dialog__body" }, gu = { class: "field-stack" }, _u = { class: "field-stack" }, mu = { class: "field-stack" }, bu = { class: "login-note" }, vu = {
  key: 0,
  class: "login-error"
}, yu = { class: "confirm-dialog__footer" }, wu = ["disabled"], ku = /* @__PURE__ */ Ge({
  __name: "ChangePasswordDialog",
  setup(e) {
    const t = qe(), s = kn(), n = ut(), i = /* @__PURE__ */ j(""), r = /* @__PURE__ */ j(""), c = /* @__PURE__ */ j(""), u = /* @__PURE__ */ j(!1), d = /* @__PURE__ */ j("");
    function h() {
      i.value = "", r.value = "", c.value = "", d.value = "", u.value = !1;
    }
    function f() {
      h(), s.closeChangePassword();
    }
    async function p() {
      if (!i.value || !r.value) {
        d.value = t.label("请先填写当前密码和新密码。", "Enter the current password and the new password first.");
        return;
      }
      if (r.value.length < 6) {
        d.value = t.label("新密码至少需要 6 位。", "The new password must be at least 6 characters long.");
        return;
      }
      if (r.value !== c.value) {
        d.value = t.label("两次输入的新密码不一致。", "The new passwords do not match.");
        return;
      }
      u.value = !0, d.value = "";
      try {
        await s.changePassword(i.value, r.value), f(), n.pushToast({
          tone: "success",
          title: t.label("密码已更新", "Password updated"),
          message: t.label("当前会话已失效，请使用新密码重新登录。", "The current session has been cleared. Sign in again with the new password.")
        });
      } catch (g) {
        d.value = g instanceof Error ? g.message : String(g), u.value = !1;
      }
    }
    return (g, m) => a(s).changePasswordOpen ? (_(), v("div", {
      key: 0,
      class: "confirm-backdrop",
      onClick: bs(f, ["self"])
    }, [
      l("section", uu, [
        l("header", du, [
          l("p", fu, o(a(t).label("账号安全", "Account security")), 1),
          l("h2", pu, o(a(t).label("修改访问密码", "Change access password")), 1)
        ]),
        l("div", hu, [
          l("label", gu, [
            l("span", null, o(a(t).label("当前密码", "Current password")), 1),
            ke(l("input", {
              "onUpdate:modelValue": m[0] || (m[0] = (k) => i.value = k),
              class: "input-field",
              type: "password",
              autocomplete: "current-password"
            }, null, 512), [
              [Ue, i.value]
            ])
          ]),
          l("label", _u, [
            l("span", null, o(a(t).label("新密码", "New password")), 1),
            ke(l("input", {
              "onUpdate:modelValue": m[1] || (m[1] = (k) => r.value = k),
              class: "input-field",
              type: "password",
              autocomplete: "new-password"
            }, null, 512), [
              [Ue, r.value]
            ])
          ]),
          l("label", mu, [
            l("span", null, o(a(t).label("确认新密码", "Confirm new password")), 1),
            ke(l("input", {
              "onUpdate:modelValue": m[2] || (m[2] = (k) => c.value = k),
              class: "input-field",
              type: "password",
              autocomplete: "new-password"
            }, null, 512), [
              [Ue, c.value]
            ])
          ]),
          l("p", bu, o(a(t).label("修改成功后，Guard 会自动让当前登录会话失效，防止旧凭证继续可用。", "After the password changes, Guard automatically invalidates the current session so the old credential cannot keep running.")), 1),
          d.value ? (_(), v("p", vu, o(d.value), 1)) : re("", !0)
        ]),
        l("footer", yu, [
          l("button", {
            class: "inline-link",
            type: "button",
            onClick: f
          }, o(a(t).label("取消", "Cancel")), 1),
          l("button", {
            class: "inline-link inline-link--primary",
            type: "button",
            disabled: u.value,
            onClick: p
          }, o(u.value ? a(t).label("更新中…", "Updating…") : a(t).label("确认修改", "Update password")), 9, wu)
        ])
      ])
    ])) : re("", !0);
  }
}), $u = { class: "login-screen" }, Su = { class: "login-card" }, Cu = { class: "login-card__copy" }, xu = { class: "page-card__eyebrow" }, Ru = { class: "page-card__title" }, Eu = { class: "muted-copy" }, Tu = { class: "field-stack" }, Au = ["placeholder"], Pu = { class: "login-note" }, Mu = {
  key: 0,
  class: "login-command"
}, Ou = {
  key: 1,
  class: "login-error"
}, Iu = ["disabled"], Nu = "/ui/logo.png", Du = /* @__PURE__ */ Ge({
  __name: "LoginPage",
  setup(e) {
    const t = qe(), s = kn(), n = /* @__PURE__ */ j(""), i = /* @__PURE__ */ j(!1), r = /* @__PURE__ */ j(""), c = K(() => s.initialPasswordAvailable ? t.label(
      "如果忘记当前登录密码，可以在本机终端重新查看。",
      "If you forget the current password, you can reveal it again from a local terminal."
    ) : t.label(
      "如果这是较早版本创建的环境，旧版本可能已经删掉了密码回看记录。",
      "If this environment was created by an older Guard version, the reveal record may already have been removed."
    ));
    async function u() {
      if (!n.value.trim()) {
        r.value = t.label("请输入访问密码。", "Enter the access password.");
        return;
      }
      i.value = !0, r.value = "";
      try {
        await s.login(n.value.trim()), n.value = "";
      } catch (d) {
        r.value = d instanceof Error ? d.message : String(d);
      } finally {
        i.value = !1;
      }
    }
    return (d, h) => (_(), v("div", $u, [
      l("section", Su, [
        l("div", { class: "login-card__brand" }, [
          l("img", {
            class: "login-card__logo",
            src: Nu,
            alt: "OpenClaw Guard"
          }),
          h[1] || (h[1] = l("div", null, [
            l("p", { class: "brand-lockup__eyebrow" }, "OpenClaw Guard Next"),
            l("h1", { class: "brand-lockup__title" }, "OpenClaw Guard")
          ], -1))
        ]),
        l("div", Cu, [
          l("p", xu, o(a(t).label("安全登录", "Secure Sign-in")), 1),
          l("h2", Ru, o(a(t).label("输入本机访问密码", "Enter the local access password")), 1),
          l("p", Eu, o(a(t).label("先完成登录，再进入新的模块化控制台。主题、语言和页面结构会沿用到后续生产替换。", "Sign in first to enter the modular console. Theme, language, and structure here are the base for the production cutover.")), 1)
        ]),
        l("form", {
          class: "login-form",
          onSubmit: bs(u, ["prevent"])
        }, [
          l("label", Tu, [
            l("span", null, o(a(t).label("访问密码", "Access password")), 1),
            ke(l("input", {
              "onUpdate:modelValue": h[0] || (h[0] = (f) => n.value = f),
              class: "input-field",
              type: "password",
              autocomplete: "current-password",
              placeholder: a(t).label("请输入 Guard 登录密码", "Enter the Guard password")
            }, null, 8, Au), [
              [Ue, n.value]
            ])
          ]),
          l("p", Pu, o(c.value), 1),
          a(s).initialPasswordAvailable ? (_(), v("div", Mu, [
            l("span", null, o(a(t).label("回看命令", "Reveal command")), 1),
            l("code", null, o(a(s).revealCommand), 1)
          ])) : re("", !0),
          r.value ? (_(), v("p", Ou, o(r.value), 1)) : re("", !0),
          l("button", {
            class: "inline-link inline-link--primary login-submit",
            type: "submit",
            disabled: i.value
          }, o(i.value ? a(t).label("登录中…", "Signing in…") : a(t).label("进入控制台", "Open console")), 9, Iu)
        ], 32)
      ])
    ]));
  }
}), Lu = { class: "confirm-dialog__header" }, Fu = { class: "page-card__title" }, Uu = { class: "confirm-dialog__body" }, Vu = { class: "confirm-dialog__footer" }, Gu = /* @__PURE__ */ Ge({
  __name: "ConfirmDialog",
  setup(e) {
    const t = ut(), { confirmRequest: s } = no(t), n = K(() => !!s.value);
    return (i, r) => {
      var c, u, d, h, f, p;
      return n.value ? (_(), v("div", {
        key: 0,
        class: "confirm-backdrop",
        onClick: r[2] || (r[2] = bs((g) => a(t).resolveConfirm(!1), ["self"]))
      }, [
        l("section", {
          class: pe(["confirm-dialog", { "confirm-dialog--danger": ((c = a(s)) == null ? void 0 : c.tone) === "danger" }])
        }, [
          l("header", Lu, [
            r[3] || (r[3] = l("p", { class: "page-card__eyebrow" }, "Confirm", -1)),
            l("h2", Fu, o((u = a(s)) == null ? void 0 : u.title), 1)
          ]),
          l("p", Uu, o((d = a(s)) == null ? void 0 : d.message), 1),
          l("footer", Vu, [
            l("button", {
              class: "inline-link",
              type: "button",
              onClick: r[0] || (r[0] = (g) => a(t).resolveConfirm(!1))
            }, o((h = a(s)) == null ? void 0 : h.cancelLabel), 1),
            l("button", {
              class: pe(["inline-link", { "inline-link--danger": ((f = a(s)) == null ? void 0 : f.tone) === "danger" }]),
              type: "button",
              onClick: r[1] || (r[1] = (g) => a(t).resolveConfirm(!0))
            }, o((p = a(s)) == null ? void 0 : p.confirmLabel), 3)
          ])
        ], 2)
      ])) : re("", !0);
    };
  }
}), Bu = {
  class: "toast-viewport",
  "aria-live": "polite",
  "aria-atomic": "true"
}, Hu = { class: "toast-card__content" }, Wu = { key: 0 }, ju = ["onClick"], Ku = /* @__PURE__ */ Ge({
  __name: "ToastViewport",
  setup(e) {
    const t = ut(), { toasts: s } = no(t);
    return (n, i) => (_(), v("div", Bu, [
      (_(!0), v(Y, null, ye(a(s), (r) => (_(), v("article", {
        key: r.id,
        class: pe(["toast-card", `toast-card--${r.tone}`])
      }, [
        l("div", Hu, [
          r.title ? (_(), v("strong", Wu, o(r.title), 1)) : re("", !0),
          l("p", null, o(r.message), 1)
        ]),
        l("button", {
          class: "toast-card__close",
          type: "button",
          onClick: (c) => a(t).dismissToast(r.id)
        }, " × ", 8, ju)
      ], 2))), 128))
    ]));
  }
});
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const is = typeof document < "u";
function oo(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function zu(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && oo(e.default);
}
const Pe = Object.assign;
function Ln(e, t) {
  const s = {};
  for (const n in t) {
    const i = t[n];
    s[n] = wt(i) ? i.map(e) : e(i);
  }
  return s;
}
const As = () => {
}, wt = Array.isArray;
function ya(e, t) {
  const s = {};
  for (const n in e) s[n] = n in t ? t[n] : e[n];
  return s;
}
const ro = /#/g, qu = /&/g, Ju = /\//g, Qu = /=/g, Yu = /\?/g, co = /\+/g, Zu = /%5B/g, Xu = /%5D/g, uo = /%5E/g, ed = /%60/g, fo = /%7B/g, td = /%7C/g, po = /%7D/g, sd = /%20/g;
function El(e) {
  return e == null ? "" : encodeURI("" + e).replace(td, "|").replace(Zu, "[").replace(Xu, "]");
}
function nd(e) {
  return El(e).replace(fo, "{").replace(po, "}").replace(uo, "^");
}
function el(e) {
  return El(e).replace(co, "%2B").replace(sd, "+").replace(ro, "%23").replace(qu, "%26").replace(ed, "`").replace(fo, "{").replace(po, "}").replace(uo, "^");
}
function ld(e) {
  return el(e).replace(Qu, "%3D");
}
function ad(e) {
  return El(e).replace(ro, "%23").replace(Yu, "%3F");
}
function id(e) {
  return ad(e).replace(Ju, "%2F");
}
function Fs(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const od = /\/$/, rd = (e) => e.replace(od, "");
function Fn(e, t, s = "/") {
  let n, i = {}, r = "", c = "";
  const u = t.indexOf("#");
  let d = t.indexOf("?");
  return d = u >= 0 && d > u ? -1 : d, d >= 0 && (n = t.slice(0, d), r = t.slice(d, u > 0 ? u : t.length), i = e(r.slice(1))), u >= 0 && (n = n || t.slice(0, u), c = t.slice(u, t.length)), n = fd(n ?? t, s), {
    fullPath: n + r + c,
    path: n,
    query: i,
    hash: Fs(c)
  };
}
function cd(e, t) {
  const s = t.query ? e(t.query) : "";
  return t.path + (s && "?") + s + (t.hash || "");
}
function wa(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function ud(e, t, s) {
  const n = t.matched.length - 1, i = s.matched.length - 1;
  return n > -1 && n === i && gs(t.matched[n], s.matched[i]) && ho(t.params, s.params) && e(t.query) === e(s.query) && t.hash === s.hash;
}
function gs(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ho(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var s in e) if (!dd(e[s], t[s])) return !1;
  return !0;
}
function dd(e, t) {
  return wt(e) ? ka(e, t) : wt(t) ? ka(t, e) : (e == null ? void 0 : e.valueOf()) === (t == null ? void 0 : t.valueOf());
}
function ka(e, t) {
  return wt(t) ? e.length === t.length && e.every((s, n) => s === t[n]) : e.length === 1 && e[0] === t;
}
function fd(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const s = t.split("/"), n = e.split("/"), i = n[n.length - 1];
  (i === ".." || i === ".") && n.push("");
  let r = s.length - 1, c, u;
  for (c = 0; c < n.length; c++)
    if (u = n[c], u !== ".")
      if (u === "..")
        r > 1 && r--;
      else break;
  return s.slice(0, r).join("/") + "/" + n.slice(c).join("/");
}
const Wt = {
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
let tl = /* @__PURE__ */ function(e) {
  return e.pop = "pop", e.push = "push", e;
}({}), Un = /* @__PURE__ */ function(e) {
  return e.back = "back", e.forward = "forward", e.unknown = "", e;
}({});
function pd(e) {
  if (!e) if (is) {
    const t = document.querySelector("base");
    e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
  } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), rd(e);
}
const hd = /^[^#]+#/;
function gd(e, t) {
  return e.replace(hd, "#") + t;
}
function _d(e, t) {
  const s = document.documentElement.getBoundingClientRect(), n = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: n.left - s.left - (t.left || 0),
    top: n.top - s.top - (t.top || 0)
  };
}
const $n = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function md(e) {
  let t;
  if ("el" in e) {
    const s = e.el, n = typeof s == "string" && s.startsWith("#"), i = typeof s == "string" ? n ? document.getElementById(s.slice(1)) : document.querySelector(s) : s;
    if (!i)
      return;
    t = _d(i, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function $a(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const sl = /* @__PURE__ */ new Map();
function bd(e, t) {
  sl.set(e, t);
}
function vd(e) {
  const t = sl.get(e);
  return sl.delete(e), t;
}
function yd(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function go(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let He = /* @__PURE__ */ function(e) {
  return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
}({});
const _o = Symbol("");
He.MATCHER_NOT_FOUND + "", He.NAVIGATION_GUARD_REDIRECT + "", He.NAVIGATION_ABORTED + "", He.NAVIGATION_CANCELLED + "", He.NAVIGATION_DUPLICATED + "";
function _s(e, t) {
  return Pe(/* @__PURE__ */ new Error(), {
    type: e,
    [_o]: !0
  }, t);
}
function Mt(e, t) {
  return e instanceof Error && _o in e && (t == null || !!(e.type & t));
}
const wd = [
  "params",
  "query",
  "hash"
];
function kd(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const s of wd) s in e && (t[s] = e[s]);
  return JSON.stringify(t, null, 2);
}
function $d(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let n = 0; n < s.length; ++n) {
    const i = s[n].replace(co, " "), r = i.indexOf("="), c = Fs(r < 0 ? i : i.slice(0, r)), u = r < 0 ? null : Fs(i.slice(r + 1));
    if (c in t) {
      let d = t[c];
      wt(d) || (d = t[c] = [d]), d.push(u);
    } else t[c] = u;
  }
  return t;
}
function Sa(e) {
  let t = "";
  for (let s in e) {
    const n = e[s];
    if (s = ld(s), n == null) {
      n !== void 0 && (t += (t.length ? "&" : "") + s);
      continue;
    }
    (wt(n) ? n.map((i) => i && el(i)) : [n && el(n)]).forEach((i) => {
      i !== void 0 && (t += (t.length ? "&" : "") + s, i != null && (t += "=" + i));
    });
  }
  return t;
}
function Sd(e) {
  const t = {};
  for (const s in e) {
    const n = e[s];
    n !== void 0 && (t[s] = wt(n) ? n.map((i) => i == null ? null : "" + i) : n == null ? n : "" + n);
  }
  return t;
}
const mo = Symbol(""), Ca = Symbol(""), Sn = Symbol(""), Tl = Symbol(""), nl = Symbol("");
function ws() {
  let e = [];
  function t(n) {
    return e.push(n), () => {
      const i = e.indexOf(n);
      i > -1 && e.splice(i, 1);
    };
  }
  function s() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: s
  };
}
function Cd(e, t, s) {
  const n = () => {
    e[t].delete(s);
  };
  wl(n), Ci(n), Si(() => {
    e[t].add(s);
  }), e[t].add(s);
}
function xd(e) {
  const t = ht(mo, {}).value;
  t && Cd(t, "leaveGuards", e);
}
function zt(e, t, s, n, i, r = (c) => c()) {
  const c = n && (n.enterCallbacks[i] = n.enterCallbacks[i] || []);
  return () => new Promise((u, d) => {
    const h = (g) => {
      g === !1 ? d(_s(He.NAVIGATION_ABORTED, {
        from: s,
        to: t
      })) : g instanceof Error ? d(g) : yd(g) ? d(_s(He.NAVIGATION_GUARD_REDIRECT, {
        from: t,
        to: g
      })) : (c && n.enterCallbacks[i] === c && typeof g == "function" && c.push(g), u());
    }, f = r(() => e.call(n && n.instances[i], t, s, h));
    let p = Promise.resolve(f);
    e.length < 3 && (p = p.then(h)), p.catch((g) => d(g));
  });
}
function Vn(e, t, s, n, i = (r) => r()) {
  const r = [];
  for (const c of e)
    for (const u in c.components) {
      let d = c.components[u];
      if (!(t !== "beforeRouteEnter" && !c.instances[u]))
        if (oo(d)) {
          const h = (d.__vccOpts || d)[t];
          h && r.push(zt(h, s, n, c, u, i));
        } else {
          let h = d();
          r.push(() => h.then((f) => {
            if (!f) throw new Error(`Couldn't resolve component "${u}" at "${c.path}"`);
            const p = zu(f) ? f.default : f;
            c.mods[u] = f, c.components[u] = p;
            const g = (p.__vccOpts || p)[t];
            return g && zt(g, s, n, c, u, i)();
          }));
        }
    }
  return r;
}
function Rd(e, t) {
  const s = [], n = [], i = [], r = Math.max(t.matched.length, e.matched.length);
  for (let c = 0; c < r; c++) {
    const u = t.matched[c];
    u && (e.matched.find((h) => gs(h, u)) ? n.push(u) : s.push(u));
    const d = e.matched[c];
    d && (t.matched.find((h) => gs(h, d)) || i.push(d));
  }
  return [
    s,
    n,
    i
  ];
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Ed = () => location.protocol + "//" + location.host;
function bo(e, t) {
  const { pathname: s, search: n, hash: i } = t, r = e.indexOf("#");
  if (r > -1) {
    let c = i.includes(e.slice(r)) ? e.slice(r).length : 1, u = i.slice(c);
    return u[0] !== "/" && (u = "/" + u), wa(u, "");
  }
  return wa(s, e) + n + i;
}
function Td(e, t, s, n) {
  let i = [], r = [], c = null;
  const u = ({ state: g }) => {
    const m = bo(e, location), k = s.value, E = t.value;
    let $ = 0;
    if (g) {
      if (s.value = m, t.value = g, c && c === k) {
        c = null;
        return;
      }
      $ = E ? g.position - E.position : 0;
    } else n(m);
    i.forEach((I) => {
      I(s.value, k, {
        delta: $,
        type: tl.pop,
        direction: $ ? $ > 0 ? Un.forward : Un.back : Un.unknown
      });
    });
  };
  function d() {
    c = s.value;
  }
  function h(g) {
    i.push(g);
    const m = () => {
      const k = i.indexOf(g);
      k > -1 && i.splice(k, 1);
    };
    return r.push(m), m;
  }
  function f() {
    if (document.visibilityState === "hidden") {
      const { history: g } = window;
      if (!g.state) return;
      g.replaceState(Pe({}, g.state, { scroll: $n() }), "");
    }
  }
  function p() {
    for (const g of r) g();
    r = [], window.removeEventListener("popstate", u), window.removeEventListener("pagehide", f), document.removeEventListener("visibilitychange", f);
  }
  return window.addEventListener("popstate", u), window.addEventListener("pagehide", f), document.addEventListener("visibilitychange", f), {
    pauseListeners: d,
    listen: h,
    destroy: p
  };
}
function xa(e, t, s, n = !1, i = !1) {
  return {
    back: e,
    current: t,
    forward: s,
    replaced: n,
    position: window.history.length,
    scroll: i ? $n() : null
  };
}
function Ad(e) {
  const { history: t, location: s } = window, n = { value: bo(e, s) }, i = { value: t.state };
  i.value || r(n.value, {
    back: null,
    current: n.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function r(d, h, f) {
    const p = e.indexOf("#"), g = p > -1 ? (s.host && document.querySelector("base") ? e : e.slice(p)) + d : Ed() + e + d;
    try {
      t[f ? "replaceState" : "pushState"](h, "", g), i.value = h;
    } catch (m) {
      console.error(m), s[f ? "replace" : "assign"](g);
    }
  }
  function c(d, h) {
    r(d, Pe({}, t.state, xa(i.value.back, d, i.value.forward, !0), h, { position: i.value.position }), !0), n.value = d;
  }
  function u(d, h) {
    const f = Pe({}, i.value, t.state, {
      forward: d,
      scroll: $n()
    });
    r(f.current, f, !0), r(d, Pe({}, xa(n.value, d, null), { position: f.position + 1 }, h), !1), n.value = d;
  }
  return {
    location: n,
    state: i,
    push: u,
    replace: c
  };
}
function Pd(e) {
  e = pd(e);
  const t = Ad(e), s = Td(e, t.state, t.location, t.replace);
  function n(r, c = !0) {
    c || s.pauseListeners(), history.go(r);
  }
  const i = Pe({
    location: "",
    base: e,
    go: n,
    createHref: gd.bind(null, e)
  }, t, s);
  return Object.defineProperty(i, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(i, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), i;
}
function Md(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Pd(e);
}
let es = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
}({});
var Ke = /* @__PURE__ */ function(e) {
  return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.ParamRegExp = 2] = "ParamRegExp", e[e.ParamRegExpEnd = 3] = "ParamRegExpEnd", e[e.EscapeNext = 4] = "EscapeNext", e;
}(Ke || {});
const Od = {
  type: es.Static,
  value: ""
}, Id = /[a-zA-Z0-9_]/;
function Nd(e) {
  if (!e) return [[]];
  if (e === "/") return [[Od]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${s})/"${h}": ${m}`);
  }
  let s = Ke.Static, n = s;
  const i = [];
  let r;
  function c() {
    r && i.push(r), r = [];
  }
  let u = 0, d, h = "", f = "";
  function p() {
    h && (s === Ke.Static ? r.push({
      type: es.Static,
      value: h
    }) : s === Ke.Param || s === Ke.ParamRegExp || s === Ke.ParamRegExpEnd ? (r.length > 1 && (d === "*" || d === "+") && t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`), r.push({
      type: es.Param,
      value: h,
      regexp: f,
      repeatable: d === "*" || d === "+",
      optional: d === "*" || d === "?"
    })) : t("Invalid state to consume buffer"), h = "");
  }
  function g() {
    h += d;
  }
  for (; u < e.length; ) {
    if (d = e[u++], d === "\\" && s !== Ke.ParamRegExp) {
      n = s, s = Ke.EscapeNext;
      continue;
    }
    switch (s) {
      case Ke.Static:
        d === "/" ? (h && p(), c()) : d === ":" ? (p(), s = Ke.Param) : g();
        break;
      case Ke.EscapeNext:
        g(), s = n;
        break;
      case Ke.Param:
        d === "(" ? s = Ke.ParamRegExp : Id.test(d) ? g() : (p(), s = Ke.Static, d !== "*" && d !== "?" && d !== "+" && u--);
        break;
      case Ke.ParamRegExp:
        d === ")" ? f[f.length - 1] == "\\" ? f = f.slice(0, -1) + d : s = Ke.ParamRegExpEnd : f += d;
        break;
      case Ke.ParamRegExpEnd:
        p(), s = Ke.Static, d !== "*" && d !== "?" && d !== "+" && u--, f = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return s === Ke.ParamRegExp && t(`Unfinished custom RegExp for param "${h}"`), p(), c(), i;
}
const Ra = "[^/]+?", Dd = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
};
var nt = /* @__PURE__ */ function(e) {
  return e[e._multiplier = 10] = "_multiplier", e[e.Root = 90] = "Root", e[e.Segment = 40] = "Segment", e[e.SubSegment = 30] = "SubSegment", e[e.Static = 40] = "Static", e[e.Dynamic = 20] = "Dynamic", e[e.BonusCustomRegExp = 10] = "BonusCustomRegExp", e[e.BonusWildcard = -50] = "BonusWildcard", e[e.BonusRepeatable = -20] = "BonusRepeatable", e[e.BonusOptional = -8] = "BonusOptional", e[e.BonusStrict = 0.7000000000000001] = "BonusStrict", e[e.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e;
}(nt || {});
const Ld = /[.+*?^${}()[\]/\\]/g;
function Fd(e, t) {
  const s = Pe({}, Dd, t), n = [];
  let i = s.start ? "^" : "";
  const r = [];
  for (const h of e) {
    const f = h.length ? [] : [nt.Root];
    s.strict && !h.length && (i += "/");
    for (let p = 0; p < h.length; p++) {
      const g = h[p];
      let m = nt.Segment + (s.sensitive ? nt.BonusCaseSensitive : 0);
      if (g.type === es.Static)
        p || (i += "/"), i += g.value.replace(Ld, "\\$&"), m += nt.Static;
      else if (g.type === es.Param) {
        const { value: k, repeatable: E, optional: $, regexp: I } = g;
        r.push({
          name: k,
          repeatable: E,
          optional: $
        });
        const x = I || Ra;
        if (x !== Ra) {
          m += nt.BonusCustomRegExp;
          try {
            `${x}`;
          } catch (L) {
            throw new Error(`Invalid custom RegExp for param "${k}" (${x}): ` + L.message);
          }
        }
        let H = E ? `((?:${x})(?:/(?:${x}))*)` : `(${x})`;
        p || (H = $ && h.length < 2 ? `(?:/${H})` : "/" + H), $ && (H += "?"), i += H, m += nt.Dynamic, $ && (m += nt.BonusOptional), E && (m += nt.BonusRepeatable), x === ".*" && (m += nt.BonusWildcard);
      }
      f.push(m);
    }
    n.push(f);
  }
  if (s.strict && s.end) {
    const h = n.length - 1;
    n[h][n[h].length - 1] += nt.BonusStrict;
  }
  s.strict || (i += "/?"), s.end ? i += "$" : s.strict && !i.endsWith("/") && (i += "(?:/|$)");
  const c = new RegExp(i, s.sensitive ? "" : "i");
  function u(h) {
    const f = h.match(c), p = {};
    if (!f) return null;
    for (let g = 1; g < f.length; g++) {
      const m = f[g] || "", k = r[g - 1];
      p[k.name] = m && k.repeatable ? m.split("/") : m;
    }
    return p;
  }
  function d(h) {
    let f = "", p = !1;
    for (const g of e) {
      (!p || !f.endsWith("/")) && (f += "/"), p = !1;
      for (const m of g) if (m.type === es.Static) f += m.value;
      else if (m.type === es.Param) {
        const { value: k, repeatable: E, optional: $ } = m, I = k in h ? h[k] : "";
        if (wt(I) && !E) throw new Error(`Provided param "${k}" is an array but it is not repeatable (* or + modifiers)`);
        const x = wt(I) ? I.join("/") : I;
        if (!x) if ($)
          g.length < 2 && (f.endsWith("/") ? f = f.slice(0, -1) : p = !0);
        else throw new Error(`Missing required param "${k}"`);
        f += x;
      }
    }
    return f || "/";
  }
  return {
    re: c,
    score: n,
    keys: r,
    parse: u,
    stringify: d
  };
}
function Ud(e, t) {
  let s = 0;
  for (; s < e.length && s < t.length; ) {
    const n = t[s] - e[s];
    if (n) return n;
    s++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === nt.Static + nt.Segment ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === nt.Static + nt.Segment ? 1 : -1 : 0;
}
function vo(e, t) {
  let s = 0;
  const n = e.score, i = t.score;
  for (; s < n.length && s < i.length; ) {
    const r = Ud(n[s], i[s]);
    if (r) return r;
    s++;
  }
  if (Math.abs(i.length - n.length) === 1) {
    if (Ea(n)) return 1;
    if (Ea(i)) return -1;
  }
  return i.length - n.length;
}
function Ea(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Vd = {
  strict: !1,
  end: !0,
  sensitive: !1
};
function Gd(e, t, s) {
  const n = Fd(Nd(e.path), s), i = Pe(n, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
}
function Bd(e, t) {
  const s = [], n = /* @__PURE__ */ new Map();
  t = ya(Vd, t);
  function i(p) {
    return n.get(p);
  }
  function r(p, g, m) {
    const k = !m, E = Aa(p);
    E.aliasOf = m && m.record;
    const $ = ya(t, p), I = [E];
    if ("alias" in p) {
      const L = typeof p.alias == "string" ? [p.alias] : p.alias;
      for (const Z of L) I.push(Aa(Pe({}, E, {
        components: m ? m.record.components : E.components,
        path: Z,
        aliasOf: m ? m.record : E
      })));
    }
    let x, H;
    for (const L of I) {
      const { path: Z } = L;
      if (g && Z[0] !== "/") {
        const V = g.record.path, T = V[V.length - 1] === "/" ? "" : "/";
        L.path = g.record.path + (Z && T + Z);
      }
      if (x = Gd(L, g, $), m ? m.alias.push(x) : (H = H || x, H !== x && H.alias.push(x), k && p.name && !Pa(x) && c(p.name)), yo(x) && d(x), E.children) {
        const V = E.children;
        for (let T = 0; T < V.length; T++) r(V[T], x, m && m.children[T]);
      }
      m = m || x;
    }
    return H ? () => {
      c(H);
    } : As;
  }
  function c(p) {
    if (go(p)) {
      const g = n.get(p);
      g && (n.delete(p), s.splice(s.indexOf(g), 1), g.children.forEach(c), g.alias.forEach(c));
    } else {
      const g = s.indexOf(p);
      g > -1 && (s.splice(g, 1), p.record.name && n.delete(p.record.name), p.children.forEach(c), p.alias.forEach(c));
    }
  }
  function u() {
    return s;
  }
  function d(p) {
    const g = jd(p, s);
    s.splice(g, 0, p), p.record.name && !Pa(p) && n.set(p.record.name, p);
  }
  function h(p, g) {
    let m, k = {}, E, $;
    if ("name" in p && p.name) {
      if (m = n.get(p.name), !m) throw _s(He.MATCHER_NOT_FOUND, { location: p });
      $ = m.record.name, k = Pe(Ta(g.params, m.keys.filter((H) => !H.optional).concat(m.parent ? m.parent.keys.filter((H) => H.optional) : []).map((H) => H.name)), p.params && Ta(p.params, m.keys.map((H) => H.name))), E = m.stringify(k);
    } else if (p.path != null)
      E = p.path, m = s.find((H) => H.re.test(E)), m && (k = m.parse(E), $ = m.record.name);
    else {
      if (m = g.name ? n.get(g.name) : s.find((H) => H.re.test(g.path)), !m) throw _s(He.MATCHER_NOT_FOUND, {
        location: p,
        currentLocation: g
      });
      $ = m.record.name, k = Pe({}, g.params, p.params), E = m.stringify(k);
    }
    const I = [];
    let x = m;
    for (; x; )
      I.unshift(x.record), x = x.parent;
    return {
      name: $,
      path: E,
      params: k,
      matched: I,
      meta: Wd(I)
    };
  }
  e.forEach((p) => r(p));
  function f() {
    s.length = 0, n.clear();
  }
  return {
    addRoute: r,
    resolve: h,
    removeRoute: c,
    clearRoutes: f,
    getRoutes: u,
    getRecordMatcher: i
  };
}
function Ta(e, t) {
  const s = {};
  for (const n of t) n in e && (s[n] = e[n]);
  return s;
}
function Aa(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Hd(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function Hd(e) {
  const t = {}, s = e.props || !1;
  if ("component" in e) t.default = s;
  else for (const n in e.components) t[n] = typeof s == "object" ? s[n] : s;
  return t;
}
function Pa(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Wd(e) {
  return e.reduce((t, s) => Pe(t, s.meta), {});
}
function jd(e, t) {
  let s = 0, n = t.length;
  for (; s !== n; ) {
    const r = s + n >> 1;
    vo(e, t[r]) < 0 ? n = r : s = r + 1;
  }
  const i = Kd(e);
  return i && (n = t.lastIndexOf(i, n - 1)), n;
}
function Kd(e) {
  let t = e;
  for (; t = t.parent; ) if (yo(t) && vo(e, t) === 0) return t;
}
function yo({ record: e }) {
  return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
function Ma(e) {
  const t = ht(Sn), s = ht(Tl), n = K(() => {
    const d = a(e.to);
    return t.resolve(d);
  }), i = K(() => {
    const { matched: d } = n.value, { length: h } = d, f = d[h - 1], p = s.matched;
    if (!f || !p.length) return -1;
    const g = p.findIndex(gs.bind(null, f));
    if (g > -1) return g;
    const m = Oa(d[h - 2]);
    return h > 1 && Oa(f) === m && p[p.length - 1].path !== m ? p.findIndex(gs.bind(null, d[h - 2])) : g;
  }), r = K(() => i.value > -1 && Qd(s.params, n.value.params)), c = K(() => i.value > -1 && i.value === s.matched.length - 1 && ho(s.params, n.value.params));
  function u(d = {}) {
    if (Jd(d)) {
      const h = t[a(e.replace) ? "replace" : "push"](a(e.to)).catch(As);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => h), h;
    }
    return Promise.resolve();
  }
  return {
    route: n,
    href: K(() => n.value.href),
    isActive: r,
    isExactActive: c,
    navigate: u
  };
}
function zd(e) {
  return e.length === 1 ? e[0] : e;
}
const qd = /* @__PURE__ */ Ge({
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
  useLink: Ma,
  setup(e, { slots: t }) {
    const s = /* @__PURE__ */ Vt(Ma(e)), { options: n } = ht(Sn), i = K(() => ({
      [Ia(e.activeClass, n.linkActiveClass, "router-link-active")]: s.isActive,
      [Ia(e.exactActiveClass, n.linkExactActiveClass, "router-link-exact-active")]: s.isExactActive
    }));
    return () => {
      const r = t.default && zd(t.default(s));
      return e.custom ? r : Qi("a", {
        "aria-current": s.isExactActive ? e.ariaCurrentValue : null,
        href: s.href,
        onClick: s.navigate,
        class: i.value
      }, r);
    };
  }
}), Al = qd;
function Jd(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Qd(e, t) {
  for (const s in t) {
    const n = t[s], i = e[s];
    if (typeof n == "string") {
      if (n !== i) return !1;
    } else if (!wt(i) || i.length !== n.length || n.some((r, c) => r.valueOf() !== i[c].valueOf())) return !1;
  }
  return !0;
}
function Oa(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Ia = (e, t, s) => e ?? t ?? s, Yd = /* @__PURE__ */ Ge({
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
  setup(e, { attrs: t, slots: s }) {
    const n = ht(nl), i = K(() => e.route || n.value), r = ht(Ca, 0), c = K(() => {
      let h = a(r);
      const { matched: f } = i.value;
      let p;
      for (; (p = f[h]) && !p.components; ) h++;
      return h;
    }), u = K(() => i.value.matched[c.value]);
    qs(Ca, K(() => c.value + 1)), qs(mo, u), qs(nl, i);
    const d = /* @__PURE__ */ j();
    return Oe(() => [
      d.value,
      u.value,
      e.name
    ], ([h, f, p], [g, m, k]) => {
      f && (f.instances[p] = h, m && m !== f && h && h === g && (f.leaveGuards.size || (f.leaveGuards = m.leaveGuards), f.updateGuards.size || (f.updateGuards = m.updateGuards))), h && f && (!m || !gs(f, m) || !g) && (f.enterCallbacks[p] || []).forEach((E) => E(h));
    }, { flush: "post" }), () => {
      const h = i.value, f = e.name, p = u.value, g = p && p.components[f];
      if (!g) return Na(s.default, {
        Component: g,
        route: h
      });
      const m = p.props[f], k = m ? m === !0 ? h.params : typeof m == "function" ? m(h) : m : null, $ = Qi(g, Pe({}, k, t, {
        onVnodeUnmounted: (I) => {
          I.component.isUnmounted && (p.instances[f] = null);
        },
        ref: d
      }));
      return Na(s.default, {
        Component: $,
        route: h
      }) || $;
    };
  }
});
function Na(e, t) {
  if (!e) return null;
  const s = e(t);
  return s.length === 1 ? s[0] : s;
}
const wo = Yd;
function Zd(e) {
  const t = Bd(e.routes, e), s = e.parseQuery || $d, n = e.stringifyQuery || Sa, i = e.history, r = ws(), c = ws(), u = ws(), d = /* @__PURE__ */ Xo(Wt);
  let h = Wt;
  is && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const f = Ln.bind(null, (U) => "" + U), p = Ln.bind(null, id), g = Ln.bind(null, Fs);
  function m(U, ne) {
    let J, ue;
    return go(U) ? (J = t.getRecordMatcher(U), ue = ne) : ue = U, t.addRoute(ue, J);
  }
  function k(U) {
    const ne = t.getRecordMatcher(U);
    ne && t.removeRoute(ne);
  }
  function E() {
    return t.getRoutes().map((U) => U.record);
  }
  function $(U) {
    return !!t.getRecordMatcher(U);
  }
  function I(U, ne) {
    if (ne = Pe({}, ne || d.value), typeof U == "string") {
      const C = Fn(s, U, ne.path), D = t.resolve({ path: C.path }, ne), G = i.createHref(C.fullPath);
      return Pe(C, D, {
        params: g(D.params),
        hash: Fs(C.hash),
        redirectedFrom: void 0,
        href: G
      });
    }
    let J;
    if (U.path != null)
      J = Pe({}, U, { path: Fn(s, U.path, ne.path).path });
    else {
      const C = Pe({}, U.params);
      for (const D in C) C[D] == null && delete C[D];
      J = Pe({}, U, { params: p(C) }), ne.params = p(ne.params);
    }
    const ue = t.resolve(J, ne), we = U.hash || "";
    ue.params = f(g(ue.params));
    const b = cd(n, Pe({}, U, {
      hash: nd(we),
      path: ue.path
    })), w = i.createHref(b);
    return Pe({
      fullPath: b,
      hash: we,
      query: n === Sa ? Sd(U.query) : U.query || {}
    }, ue, {
      redirectedFrom: void 0,
      href: w
    });
  }
  function x(U) {
    return typeof U == "string" ? Fn(s, U, d.value.path) : Pe({}, U);
  }
  function H(U, ne) {
    if (h !== U) return _s(He.NAVIGATION_CANCELLED, {
      from: ne,
      to: U
    });
  }
  function L(U) {
    return T(U);
  }
  function Z(U) {
    return L(Pe(x(U), { replace: !0 }));
  }
  function V(U, ne) {
    const J = U.matched[U.matched.length - 1];
    if (J && J.redirect) {
      const { redirect: ue } = J;
      let we = typeof ue == "function" ? ue(U, ne) : ue;
      return typeof we == "string" && (we = we.includes("?") || we.includes("#") ? we = x(we) : { path: we }, we.params = {}), Pe({
        query: U.query,
        hash: U.hash,
        params: we.path != null ? {} : U.params
      }, we);
    }
  }
  function T(U, ne) {
    const J = h = I(U), ue = d.value, we = U.state, b = U.force, w = U.replace === !0, C = V(J, ue);
    if (C) return T(Pe(x(C), {
      state: typeof C == "object" ? Pe({}, we, C.state) : we,
      force: b,
      replace: w
    }), ne || J);
    const D = J;
    D.redirectedFrom = ne;
    let G;
    return !b && ud(n, ue, J) && (G = _s(He.NAVIGATION_DUPLICATED, {
      to: D,
      from: ue
    }), M(ue, ue, !0, !1)), (G ? Promise.resolve(G) : A(D, ue)).catch((F) => Mt(F) ? Mt(F, He.NAVIGATION_GUARD_REDIRECT) ? F : Se(F) : S(F, D, ue)).then((F) => {
      if (F) {
        if (Mt(F, He.NAVIGATION_GUARD_REDIRECT))
          return T(Pe({ replace: w }, x(F.to), {
            state: typeof F.to == "object" ? Pe({}, we, F.to.state) : we,
            force: b
          }), ne || D);
      } else F = oe(D, ue, !0, w, we);
      return ce(D, ue, F), F;
    });
  }
  function y(U, ne) {
    const J = H(U, ne);
    return J ? Promise.reject(J) : Promise.resolve();
  }
  function R(U) {
    const ne = Te.values().next().value;
    return ne && typeof ne.runWithContext == "function" ? ne.runWithContext(U) : U();
  }
  function A(U, ne) {
    let J;
    const [ue, we, b] = Rd(U, ne);
    J = Vn(ue.reverse(), "beforeRouteLeave", U, ne);
    for (const C of ue) C.leaveGuards.forEach((D) => {
      J.push(zt(D, U, ne));
    });
    const w = y.bind(null, U, ne);
    return J.push(w), Ze(J).then(() => {
      J = [];
      for (const C of r.list()) J.push(zt(C, U, ne));
      return J.push(w), Ze(J);
    }).then(() => {
      J = Vn(we, "beforeRouteUpdate", U, ne);
      for (const C of we) C.updateGuards.forEach((D) => {
        J.push(zt(D, U, ne));
      });
      return J.push(w), Ze(J);
    }).then(() => {
      J = [];
      for (const C of b) if (C.beforeEnter) if (wt(C.beforeEnter)) for (const D of C.beforeEnter) J.push(zt(D, U, ne));
      else J.push(zt(C.beforeEnter, U, ne));
      return J.push(w), Ze(J);
    }).then(() => (U.matched.forEach((C) => C.enterCallbacks = {}), J = Vn(b, "beforeRouteEnter", U, ne, R), J.push(w), Ze(J))).then(() => {
      J = [];
      for (const C of c.list()) J.push(zt(C, U, ne));
      return J.push(w), Ze(J);
    }).catch((C) => Mt(C, He.NAVIGATION_CANCELLED) ? C : Promise.reject(C));
  }
  function ce(U, ne, J) {
    u.list().forEach((ue) => R(() => ue(U, ne, J)));
  }
  function oe(U, ne, J, ue, we) {
    const b = H(U, ne);
    if (b) return b;
    const w = ne === Wt, C = is ? history.state : {};
    J && (ue || w ? i.replace(U.fullPath, Pe({ scroll: w && C && C.scroll }, we)) : i.push(U.fullPath, we)), d.value = U, M(U, ne, J, w), Se();
  }
  let he;
  function Re() {
    he || (he = i.listen((U, ne, J) => {
      if (!dt.listening) return;
      const ue = I(U), we = V(ue, dt.currentRoute.value);
      if (we) {
        T(Pe(we, {
          replace: !0,
          force: !0
        }), ue).catch(As);
        return;
      }
      h = ue;
      const b = d.value;
      is && bd($a(b.fullPath, J.delta), $n()), A(ue, b).catch((w) => Mt(w, He.NAVIGATION_ABORTED | He.NAVIGATION_CANCELLED) ? w : Mt(w, He.NAVIGATION_GUARD_REDIRECT) ? (T(Pe(x(w.to), { force: !0 }), ue).then((C) => {
        Mt(C, He.NAVIGATION_ABORTED | He.NAVIGATION_DUPLICATED) && !J.delta && J.type === tl.pop && i.go(-1, !1);
      }).catch(As), Promise.reject()) : (J.delta && i.go(-J.delta, !1), S(w, ue, b))).then((w) => {
        w = w || oe(ue, b, !1), w && (J.delta && !Mt(w, He.NAVIGATION_CANCELLED) ? i.go(-J.delta, !1) : J.type === tl.pop && Mt(w, He.NAVIGATION_ABORTED | He.NAVIGATION_DUPLICATED) && i.go(-1, !1)), ce(ue, b, w);
      }).catch(As);
    }));
  }
  let Le = ws(), $e = ws(), P;
  function S(U, ne, J) {
    Se(U);
    const ue = $e.list();
    return ue.length ? ue.forEach((we) => we(U, ne, J)) : console.error(U), Promise.reject(U);
  }
  function B() {
    return P && d.value !== Wt ? Promise.resolve() : new Promise((U, ne) => {
      Le.add([U, ne]);
    });
  }
  function Se(U) {
    return P || (P = !U, Re(), Le.list().forEach(([ne, J]) => U ? J(U) : ne()), Le.reset()), U;
  }
  function M(U, ne, J, ue) {
    const { scrollBehavior: we } = e;
    if (!is || !we) return Promise.resolve();
    const b = !J && vd($a(U.fullPath, 0)) || (ue || !J) && history.state && history.state.scroll || null;
    return gn().then(() => we(U, ne, b)).then((w) => w && md(w)).catch((w) => S(w, U, ne));
  }
  const z = (U) => i.go(U);
  let se;
  const Te = /* @__PURE__ */ new Set(), dt = {
    currentRoute: d,
    listening: !0,
    addRoute: m,
    removeRoute: k,
    clearRoutes: t.clearRoutes,
    hasRoute: $,
    getRoutes: E,
    resolve: I,
    options: e,
    push: L,
    replace: Z,
    go: z,
    back: () => z(-1),
    forward: () => z(1),
    beforeEach: r.add,
    beforeResolve: c.add,
    afterEach: u.add,
    onError: $e.add,
    isReady: B,
    install(U) {
      U.component("RouterLink", Al), U.component("RouterView", wo), U.config.globalProperties.$router = dt, Object.defineProperty(U.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => a(d)
      }), is && !se && d.value === Wt && (se = !0, L(i.location).catch((ue) => {
      }));
      const ne = {};
      for (const ue in Wt) Object.defineProperty(ne, ue, {
        get: () => d.value[ue],
        enumerable: !0
      });
      U.provide(Sn, dt), U.provide(Tl, /* @__PURE__ */ fi(ne)), U.provide(nl, d);
      const J = U.unmount;
      Te.add(U), U.unmount = function() {
        Te.delete(U), Te.size < 1 && (h = Wt, he && he(), he = null, d.value = Wt, se = !1, P = !1), J();
      };
    }
  };
  function Ze(U) {
    return U.reduce((ne, J) => ne.then(() => R(J)), Promise.resolve());
  }
  return dt;
}
function Pl() {
  return ht(Sn);
}
function Xd(e) {
  return ht(Tl);
}
const ef = { class: "guard-shell" }, tf = { class: "guard-shell__topbar" }, sf = { class: "topbar-actions" }, nf = { class: "toolbar-menu" }, lf = ["title"], af = { class: "toolbar-popover" }, of = ["onClick"], rf = { class: "toolbar-menu" }, cf = ["title"], uf = { class: "toolbar-popover" }, df = {
  key: 0,
  class: "toolbar-menu"
}, ff = ["title"], pf = { class: "toolbar-popover" }, hf = {
  class: "toolbar-link",
  href: "/legacy",
  target: "_blank",
  rel: "noreferrer"
}, gf = { class: "guard-shell__body" }, _f = { class: "guard-shell__sidebar" }, mf = { class: "sidebar-current" }, bf = { class: "sidebar-current__label" }, vf = { class: "sidebar-current__title" }, yf = { class: "sidebar-current__meta" }, wf = { class: "sidebar-nav" }, kf = { class: "sidebar-group__title" }, $f = { class: "guard-shell__content" }, Sf = "/ui/logo.png", Cf = /* @__PURE__ */ Ge({
  __name: "GuardShell",
  setup(e) {
    const t = qe(), s = kn(), n = ut(), i = Xd(), r = Pl(), c = [
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
    ], u = {
      "/settings": { zh: "设置", en: "Settings" }
    }, d = [
      { value: "auto", icon: "⌘", zh: "跟随系统", en: "Auto" },
      { value: "light", icon: "☀", zh: "浅色", en: "Light" },
      { value: "dark", icon: "☾", zh: "深色", en: "Dark" }
    ], h = K(() => t.themePreference === "light" ? "☀" : t.themePreference === "dark" ? "☾" : "⌘"), f = K(() => {
      const m = c.flatMap((E) => E.items).find((E) => E.to === i.path);
      if (m)
        return t.label(m.zh, m.en);
      const k = u[i.path];
      return k ? t.label(k.zh, k.en) : t.label("首页", "Home");
    });
    Ye(() => {
      t.hydrate();
    }), Oe(() => t.themePreference, () => t.applyDocumentState()), Oe(() => t.language, () => t.applyDocumentState()), Oe(() => t.developerMode, () => t.applyDocumentState());
    function p() {
      r.push("/settings");
    }
    async function g() {
      await n.confirm({
        title: t.label("退出当前登录？", "Sign out of the current session?"),
        message: t.label("退出后需要重新输入本机访问密码。", "You will need the local access password to sign in again."),
        confirmLabel: t.label("退出登录", "Sign out"),
        cancelLabel: t.label("取消", "Cancel")
      }) && (await s.logout(), n.pushToast({
        tone: "success",
        title: t.label("已退出登录", "Signed out"),
        message: t.label("你已经退出新的模块化控制台。", "You have signed out of the modular console.")
      }));
    }
    return (m, k) => (_(), v("div", ef, [
      l("header", tf, [
        l("div", { class: "brand-lockup" }, [
          l("img", {
            class: "brand-lockup__logo",
            src: Sf,
            alt: "OpenClaw Guard"
          }),
          k[3] || (k[3] = l("div", null, [
            l("p", { class: "brand-lockup__eyebrow" }, "OpenClaw Guard Next"),
            l("h1", { class: "brand-lockup__title" }, "OpenClaw Guard")
          ], -1))
        ]),
        l("div", sf, [
          l("div", nf, [
            l("button", {
              class: "toolbar-icon",
              type: "button",
              title: a(t).label("主题", "Theme")
            }, o(h.value), 9, lf),
            l("div", af, [
              (_(), v(Y, null, ye(d, (E) => l("button", {
                key: E.value,
                class: "toolbar-popover__item",
                type: "button",
                onClick: ($) => a(t).setThemePreference(E.value)
              }, [
                l("span", null, o(E.icon), 1),
                l("span", null, o(a(t).label(E.zh, E.en)), 1)
              ], 8, of)), 64))
            ])
          ]),
          l("div", rf, [
            l("button", {
              class: "toolbar-icon",
              type: "button",
              title: a(t).label("语言", "Language")
            }, " 🌐 ", 8, cf),
            l("div", uf, [
              l("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: k[0] || (k[0] = (E) => a(t).setLanguage("zh"))
              }, [...k[4] || (k[4] = [
                l("span", null, "中", -1),
                l("span", null, "中文", -1)
              ])]),
              l("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: k[1] || (k[1] = (E) => a(t).setLanguage("en"))
              }, [...k[5] || (k[5] = [
                l("span", null, "EN", -1),
                l("span", null, "English", -1)
              ])])
            ])
          ]),
          a(s).authEnabled && a(s).authenticated ? (_(), v("div", df, [
            l("button", {
              class: "toolbar-icon",
              type: "button",
              title: a(t).label("账号", "Account")
            }, " ⚙ ", 8, ff),
            l("div", pf, [
              l("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: p
              }, [
                k[6] || (k[6] = l("span", null, "⟡", -1)),
                l("span", null, o(a(t).label("设置", "Settings")), 1)
              ]),
              l("button", {
                class: "toolbar-popover__item",
                type: "button",
                onClick: k[2] || (k[2] = (E) => a(s).openChangePassword())
              }, [
                k[7] || (k[7] = l("span", null, "🔑", -1)),
                l("span", null, o(a(t).label("修改密码", "Change password")), 1)
              ]),
              l("button", {
                class: "toolbar-popover__item toolbar-popover__item--danger",
                type: "button",
                onClick: g
              }, [
                k[8] || (k[8] = l("span", null, "↩", -1)),
                l("span", null, o(a(t).label("退出登录", "Sign out")), 1)
              ])
            ])
          ])) : re("", !0),
          l("a", hf, o(a(t).label("打开旧版控制台", "Open legacy console")), 1)
        ])
      ]),
      l("div", gf, [
        l("aside", _f, [
          l("div", mf, [
            l("p", bf, o(a(t).label("当前页面", "Current page")), 1),
            l("p", vf, o(f.value), 1),
            l("p", yf, o(a(t).label("这里是 dev-rust 分支上的模块化预览壳层。当前继续迁移真实业务页面，但不会替换正式运行时。", "This is the modular preview shell on the dev-rust line. We keep migrating real product pages here without replacing the production runtime yet.")), 1)
          ]),
          l("nav", wf, [
            (_(), v(Y, null, ye(c, (E) => l("section", {
              key: E.id,
              class: "sidebar-group"
            }, [
              l("p", kf, o(a(t).label(E.zh, E.en)), 1),
              (_(!0), v(Y, null, ye(E.items, ($) => (_(), ze(a(Al), {
                key: $.to,
                to: $.to,
                class: pe(["sidebar-link", { "sidebar-link--active": a(i).path === $.to }])
              }, {
                default: ae(() => [
                  Sl(o(a(t).label($.zh, $.en)), 1)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128))
            ])), 64))
          ])
        ]),
        l("main", $f, [
          ee(a(wo))
        ])
      ])
    ]));
  }
}), xf = {
  key: 0,
  class: "shell-loading"
}, Rf = /* @__PURE__ */ Ge({
  __name: "App",
  setup(e) {
    const t = kn(), s = ut(), n = qe();
    let i = () => {
    };
    return Ye(() => {
      t.hydrate(), i = tu(() => {
        t.handleUnauthorized(), s.pushToast({
          tone: "warning",
          title: n.label("登录已失效", "Session expired"),
          message: n.label("请重新登录后继续使用新的模块化控制台。", "Sign in again to keep using the modular console.")
        });
      });
    }), yl(() => {
      i();
    }), (r, c) => (_(), v(Y, null, [
      a(t).ready ? a(t).requiresLogin ? (_(), ze(Du, { key: 1 })) : (_(), ze(Cf, { key: 2 })) : (_(), v("div", xf, [...c[0] || (c[0] = [
        l("div", { class: "page-empty shell-loading__card" }, " Loading Guard Next… ", -1)
      ])])),
      ee(Ku),
      ee(Gu),
      ee(ku)
    ], 64));
  }
});
function ct(e, t = null, s = {}) {
  const n = /* @__PURE__ */ j(t), i = s.immediate !== !1, r = /* @__PURE__ */ j(i && t === null), c = /* @__PURE__ */ j(!1), u = /* @__PURE__ */ j(null);
  async function d(h = {}) {
    h.silent === !0 ? c.value = !0 : r.value = !0, u.value = null;
    try {
      n.value = await e();
    } catch (p) {
      u.value = p instanceof Error ? p.message : String(p);
    } finally {
      r.value = !1, c.value = !1;
    }
  }
  return Ye(() => {
    i && d();
  }), ml({
    data: n,
    loading: r,
    refreshing: c,
    error: u,
    execute: d
  });
}
function it(e) {
  if (!e) return "-";
  const t = Date.parse(e);
  return Number.isFinite(t) ? new Intl.DateTimeFormat(void 0, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(t)) : e;
}
function _e(e) {
  return e == null || !Number.isFinite(e) ? "-" : new Intl.NumberFormat(void 0).format(e);
}
function Ef(e) {
  return e == null || !Number.isFinite(e) ? "-" : `${e.toFixed(e >= 10 ? 0 : 1)}%`;
}
function Tf(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "-";
  if (e < 1024) return `${_e(e)} B`;
  const t = ["KB", "MB", "GB", "TB"];
  let s = e / 1024, n = 0;
  for (; s >= 1024 && n < t.length - 1; )
    s /= 1024, n += 1;
  return `${s.toFixed(s >= 10 ? 1 : 2)} ${t[n]}`;
}
function Da(e, t = "USD") {
  if (e == null || !Number.isFinite(e)) return "-";
  if (/^[A-Z]{3}$/.test(t)) {
    const n = e >= 1 ? 2 : 4;
    return new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: t,
      minimumFractionDigits: n,
      maximumFractionDigits: n
    }).format(e);
  }
  const s = e >= 1 ? 2 : 4;
  return `${e.toFixed(s)} ${t}`.trim();
}
function La(e) {
  return e ? e.slice(0, 7) : "-";
}
function Ks(e) {
  const t = {
    appId: "App ID",
    appSecret: "App Secret",
    encryptKey: "Encrypt Key",
    verificationToken: "Verification Token",
    domain: "Domain",
    connectionMode: "Connection Mode",
    webhookPath: "Webhook Path",
    webhookHost: "Webhook Host",
    webhookPort: "Webhook Port",
    dmPolicy: "DM Policy",
    groupPolicy: "Group Policy",
    requireMention: "Require Mention",
    streaming: "Streaming Reply",
    renderMode: "Render Mode",
    whisperModel: "Whisper Model",
    botToken: "Bot Token",
    appToken: "App Token",
    baseUrl: "Base URL",
    apiType: "API Type",
    apiKey: "API Key",
    modelId: "Model ID"
  };
  return t[e] ? t[e] : e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/\b\w/g, (s) => s.toUpperCase());
}
function Af(e) {
  return typeof e == "boolean" ? e : typeof e == "string" ? ["true", "1", "yes", "on"].includes(e.trim().toLowerCase()) : !1;
}
function an(e) {
  const t = e.trim();
  if (!t) return;
  const s = Number(t);
  return Number.isFinite(s) ? s : void 0;
}
function Fa(e) {
  return /token|secret|key|password/i.test(e);
}
const Pf = { class: "page-card" }, Mf = { class: "page-card__header" }, Of = {
  key: 0,
  class: "page-card__eyebrow"
}, If = { class: "page-card__title" }, Nf = { class: "page-card__body" }, ie = /* @__PURE__ */ Ge({
  __name: "PageCard",
  props: {
    title: {},
    eyebrow: {}
  },
  setup(e) {
    return (t, s) => (_(), v("section", Pf, [
      l("header", Mf, [
        l("div", null, [
          e.eyebrow ? (_(), v("p", Of, o(e.eyebrow), 1)) : re("", !0),
          l("h2", If, o(e.title), 1)
        ]),
        Bl(t.$slots, "actions")
      ]),
      l("div", Nf, [
        Bl(t.$slots, "default")
      ])
    ]));
  }
});
async function Df() {
  const [e, t, s] = await Promise.all([
    Ee("/api/channels"),
    Ee("/api/channels/meta"),
    Ee("/api/feishu/plugin").catch(() => ({ installed: !1 }))
  ]);
  return {
    channels: e,
    definitions: t,
    feishuPlugin: s
  };
}
function Lf(e, t) {
  return Ve(`/api/channels/${encodeURIComponent(e)}`, t);
}
function Ff(e) {
  return io(`/api/channels/${encodeURIComponent(e)}`);
}
const Uf = { class: "page-stack" }, Vf = { class: "page-header" }, Gf = { class: "page-header__eyebrow" }, Bf = { class: "page-header__title" }, Hf = { class: "page-header__description" }, Wf = {
  key: 0,
  class: "page-empty"
}, jf = {
  key: 1,
  class: "page-empty page-empty--error"
}, Kf = {
  key: 0,
  class: "status-banner status-banner--warning"
}, zf = { class: "stat-grid" }, qf = { class: "stat-card" }, Jf = { class: "stat-card__label" }, Qf = { class: "stat-card" }, Yf = { class: "stat-card__label" }, Zf = { class: "stat-card" }, Xf = { class: "stat-card__label" }, ep = { class: "stat-card" }, tp = { class: "stat-card__label" }, sp = { class: "page-two-column" }, np = { class: "catalog-list" }, lp = ["onClick"], ap = { class: "catalog-list__title" }, ip = { class: "pill-row" }, op = { class: "page-stack" }, rp = { class: "page-inline-status" }, cp = { class: "muted-copy" }, up = { class: "settings-grid" }, dp = { key: 0 }, fp = ["onUpdate:modelValue", "type"], pp = ["onUpdate:modelValue"], hp = ["value"], gp = {
  key: 3,
  class: "checkbox-row"
}, _p = ["onUpdate:modelValue"], mp = { class: "page-actions" }, bp = ["disabled"], vp = ["disabled"], yp = { class: "list-stack" }, wp = { class: "action-row" }, kp = { class: "action-row" }, $p = { class: "action-row" }, Sp = {
  key: 0,
  class: "code-panel"
}, Cp = {
  key: 1,
  class: "muted-copy"
}, xp = /* @__PURE__ */ Ge({
  __name: "ChannelsPage",
  setup(e) {
    const t = {
      connectionMode: ["websocket", "webhook"],
      dmPolicy: ["open", "allowlist", "closed"],
      groupPolicy: ["open", "allowlist", "closed"],
      renderMode: ["auto", "rich", "compact"]
    };
    let s = null;
    const n = qe(), i = ut(), r = ct(() => Df(), s, { immediate: !1 }), c = /* @__PURE__ */ j(""), u = /* @__PURE__ */ j(!1), d = /* @__PURE__ */ j(!1), h = /* @__PURE__ */ Vt({}), f = /* @__PURE__ */ Vt({}), p = K(() => {
      var y;
      return new Map((((y = r.data) == null ? void 0 : y.channels) || []).map((R) => [R.id, R]));
    }), g = K(() => {
      var y;
      return new Map((((y = r.data) == null ? void 0 : y.definitions) || []).map((R) => [R.id, R]));
    }), m = K(() => {
      var y, R;
      return g.value.get(c.value) || ((R = (y = r.data) == null ? void 0 : y.definitions) == null ? void 0 : R[0]) || null;
    }), k = K(() => {
      const y = m.value;
      return y ? p.value.get(y.id) || {
        id: y.id,
        name: y.name,
        icon: y.icon,
        enabled: !1,
        configured: !1,
        config: {}
      } : null;
    }), E = K(() => {
      var y;
      return (((y = r.data) == null ? void 0 : y.channels) || []).filter((R) => R.enabled).length;
    }), $ = K(() => {
      var y;
      return (((y = r.data) == null ? void 0 : y.channels) || []).filter((R) => R.configured).length;
    }), I = K(() => {
      const y = m.value, R = [
        {
          key: "enabled",
          label: n.label("启用这个渠道", "Enable this channel"),
          kind: "boolean",
          help: n.label("关闭后保留配置，但运行态不会接收这个入口的消息。", "Keep the config but stop receiving traffic from this channel.")
        }
      ];
      for (const A of (y == null ? void 0 : y.fields) || []) {
        if (A === "requireMention" || A === "streaming") {
          R.push({
            key: A,
            label: Ks(A),
            kind: "boolean",
            help: n.label("勾选即启用。", "Checked means enabled.")
          });
          continue;
        }
        if (t[A]) {
          R.push({
            key: A,
            label: Ks(A),
            kind: "text",
            inputType: "select",
            options: t[A].map((ce) => ({ value: ce, label: ce }))
          });
          continue;
        }
        R.push({
          key: A,
          label: Ks(A),
          kind: "text",
          inputType: /port/i.test(A) ? "number" : Fa(A) ? "password" : "text"
        });
      }
      for (const A of (y == null ? void 0 : y.envFields) || [])
        R.push({
          key: `env:${A}`,
          label: `${Ks(A)} (${A})`,
          kind: "text",
          inputType: "password",
          env: !0,
          help: n.label("留空会清除这个本机环境变量。", "Leave blank to clear this local environment variable.")
        });
      return R;
    });
    function x() {
      for (const y of Object.keys(h)) delete h[y];
      for (const y of Object.keys(f)) delete f[y];
    }
    function H() {
      var A, ce;
      x();
      const y = k.value, R = m.value;
      if (!(!y || !R)) {
        f.enabled = y.enabled === !0;
        for (const oe of R.fields) {
          const he = (A = y.config) == null ? void 0 : A[oe];
          oe === "requireMention" || oe === "streaming" ? f[oe] = Af(he) : h[oe] = he == null ? "" : String(he);
        }
        for (const oe of R.envFields) {
          const he = `env:${oe}`;
          h[he] = ((ce = y.config) == null ? void 0 : ce[he]) == null ? "" : String(y.config[he]);
        }
      }
    }
    Oe(
      () => r.data,
      (y) => {
        y && (s = y);
        const R = (y == null ? void 0 : y.definitions) || [];
        if (R.length) {
          if (!c.value || !g.value.has(c.value)) {
            c.value = R[0].id;
            return;
          }
          H();
        }
      },
      { immediate: !0 }
    ), Oe(c, () => {
      H();
    }), Ye(() => {
      r.execute({ silent: !!r.data });
    });
    function L() {
      const y = k.value;
      return y ? y.id === "feishu" ? y.enabled ? n.label(
        "飞书在开源版里作为官方渠道维护。保存后会直接更新当前机器上的接入配置和回复策略。",
        "Feishu is maintained here as an official channel. Saving updates the live connection settings on this machine."
      ) : n.label(
        "飞书当前处于停用状态。先补齐机器人凭据和接入方式，再决定是否启用会更稳妥。",
        "Feishu is currently disabled. Complete the bot credentials and connection mode first, then decide whether to enable it."
      ) : y.enabled ? n.label("保存后会直接更新当前消息入口配置。", "Saving here updates the live channel configuration immediately.") : n.label("这个消息入口当前停用中。可以先补齐配置，再决定是否启用。", "This channel is currently disabled. Finish the settings first, then decide whether to enable it.") : "";
    }
    async function Z() {
      const y = k.value, R = m.value;
      if (!(!y || !R)) {
        u.value = !0;
        try {
          const A = {
            enabled: f.enabled === !0
          };
          for (const oe of R.fields) {
            if (oe === "requireMention" || oe === "streaming") {
              A[oe] = f[oe] === !0;
              continue;
            }
            const he = h[oe] ?? "";
            /port/i.test(oe) ? A[oe] = an(he) ?? "" : A[oe] = he;
          }
          for (const oe of R.envFields)
            A[`env:${oe}`] = h[`env:${oe}`] ?? "";
          const ce = await Lf(y.id, A);
          i.pushToast({
            tone: ce.success ? "success" : "error",
            message: ce.message
          }), await r.execute({ silent: !0 });
        } catch (A) {
          i.pushToast({
            tone: "error",
            message: A instanceof Error ? A.message : String(A)
          });
        } finally {
          u.value = !1;
        }
      }
    }
    async function V() {
      const y = k.value;
      if (!(!y || !await i.confirm({
        title: n.label("清空渠道配置", "Clear channel configuration"),
        message: n.label(
          `确认清空 ${y.name || y.id} 的配置吗？这会移除本机保存的字段和值。`,
          `Clear the configuration for ${y.name || y.id}? This removes the saved local values for this channel.`
        ),
        confirmLabel: n.label("确认清空", "Clear configuration"),
        cancelLabel: n.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        d.value = !0;
        try {
          const A = await Ff(y.id);
          i.pushToast({
            tone: A.success ? "success" : "error",
            message: A.message
          }), await r.execute({ silent: !0 });
        } catch (A) {
          i.pushToast({
            tone: "error",
            message: A instanceof Error ? A.message : String(A)
          });
        } finally {
          d.value = !1;
        }
      }
    }
    function T(y) {
      return h[y] ?? "";
    }
    return (y, R) => (_(), v("div", Uf, [
      l("header", Vf, [
        l("div", null, [
          l("p", Gf, o(a(n).label("渠道 / Second slice", "Channels / Second slice")), 1),
          l("h2", Bf, o(a(n).label("渠道管理", "Channel management")), 1),
          l("p", Hf, o(a(n).label("先把官方渠道和内置入口迁入模块化外壳，保持真实配置读写，后续再承接插件扩展。", "Move official channels and built-in entry points into the modular shell with real read-write behavior, then extend from here later.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: R[0] || (R[0] = (A) => a(r).execute({ silent: !0 }))
        }, o(a(r).refreshing ? a(n).label("刷新中…", "Refreshing…") : a(n).label("刷新", "Refresh")), 1)
      ]),
      a(r).loading && !a(r).data ? (_(), v("div", Wf, o(a(n).label("正在读取渠道配置…", "Loading channel configuration…")), 1)) : a(r).error && !a(r).data ? (_(), v("div", jf, o(a(r).error), 1)) : a(r).data && k.value ? (_(), v(Y, { key: 2 }, [
        a(r).error ? (_(), v("div", Kf, o(a(n).label("已保留上一版渠道快照，但后台刷新失败：", "The last channel snapshot is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : re("", !0),
        ee(ie, {
          title: a(n).label("当前概览", "Current overview"),
          eyebrow: "Summary"
        }, {
          default: ae(() => [
            l("div", zf, [
              l("article", qf, [
                l("p", Jf, o(a(n).label("可管理渠道", "Channels")), 1),
                l("strong", null, o(a(r).data.definitions.length), 1),
                l("span", null, o(a(n).label("当前内置和官方入口总数", "Built-in and official entry points available now")), 1)
              ]),
              l("article", Qf, [
                l("p", Yf, o(a(n).label("已启用", "Enabled")), 1),
                l("strong", null, o(E.value), 1),
                l("span", null, o(a(n).label("运行态会接收消息", "Receives traffic at runtime")), 1)
              ]),
              l("article", Zf, [
                l("p", Xf, o(a(n).label("已配置", "Configured")), 1),
                l("strong", null, o($.value), 1),
                l("span", null, o(a(n).label("已经填写了字段或本机变量", "Fields or local values already exist")), 1)
              ]),
              l("article", ep, [
                l("p", tp, o(a(n).label("飞书插件", "Feishu plugin")), 1),
                l("strong", null, o(a(r).data.feishuPlugin.installed ? a(n).label("已识别", "Detected") : a(n).label("未识别", "Not detected")), 1),
                l("span", null, o(a(r).data.feishuPlugin.version || a(n).label("官方渠道仍可直接维护", "Official channel still remains manageable")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        l("div", sp, [
          ee(ie, {
            title: a(n).label("渠道目录", "Channel catalog"),
            eyebrow: "Catalog"
          }, {
            default: ae(() => [
              l("div", np, [
                (_(!0), v(Y, null, ye(a(r).data.definitions, (A) => {
                  var ce, oe, he, Re;
                  return _(), v("button", {
                    key: A.id,
                    class: pe(["catalog-list__item", { "catalog-list__item--active": c.value === A.id }]),
                    type: "button",
                    onClick: (Le) => c.value = A.id
                  }, [
                    l("div", ap, [
                      l("strong", null, o(`${A.icon} ${A.name}`), 1)
                    ]),
                    l("div", ip, [
                      l("span", {
                        class: pe(["pill", (ce = p.value.get(A.id)) != null && ce.enabled ? "pill--success" : "pill--warning"])
                      }, o((oe = p.value.get(A.id)) != null && oe.enabled ? a(n).label("已启用", "Enabled") : a(n).label("停用", "Disabled")), 3),
                      l("span", {
                        class: pe(["pill", (he = p.value.get(A.id)) != null && he.configured ? "pill--success" : "pill--muted"])
                      }, o((Re = p.value.get(A.id)) != null && Re.configured ? a(n).label("已配置", "Configured") : a(n).label("未配置", "Empty")), 3)
                    ])
                  ], 10, lp);
                }), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          l("div", op, [
            ee(ie, {
              title: k.value.name,
              eyebrow: "Editor"
            }, {
              default: ae(() => [
                l("div", rp, [
                  l("span", {
                    class: pe(["pill", k.value.enabled ? "pill--success" : "pill--warning"])
                  }, o(k.value.enabled ? a(n).label("正在接收消息", "Receiving traffic") : a(n).label("当前停用", "Currently disabled")), 3),
                  l("span", {
                    class: pe(["pill", k.value.configured ? "pill--success" : "pill--muted"])
                  }, o(k.value.configured ? a(n).label("配置已完成", "Configured") : a(n).label("还未配置", "Not configured")), 3)
                ]),
                l("p", cp, o(L()), 1),
                l("div", up, [
                  (_(!0), v(Y, null, ye(I.value, (A) => (_(), v("label", {
                    key: A.key,
                    class: "settings-field"
                  }, [
                    l("span", null, o(A.label), 1),
                    A.help ? (_(), v("small", dp, o(A.help), 1)) : re("", !0),
                    A.kind === "text" && A.inputType !== "select" ? ke((_(), v("input", {
                      key: 1,
                      "onUpdate:modelValue": (ce) => h[A.key] = ce,
                      class: "settings-input",
                      type: A.inputType || "text"
                    }, null, 8, fp)), [
                      [Dc, h[A.key]]
                    ]) : A.kind === "text" && A.inputType === "select" ? ke((_(), v("select", {
                      key: 2,
                      "onUpdate:modelValue": (ce) => h[A.key] = ce,
                      class: "settings-input"
                    }, [
                      (_(!0), v(Y, null, ye(A.options, (ce) => (_(), v("option", {
                        key: ce.value,
                        value: ce.value
                      }, o(ce.label), 9, hp))), 128))
                    ], 8, pp)), [
                      [_t, h[A.key]]
                    ]) : (_(), v("label", gp, [
                      ke(l("input", {
                        "onUpdate:modelValue": (ce) => f[A.key] = ce,
                        type: "checkbox"
                      }, null, 8, _p), [
                        [os, f[A.key]]
                      ]),
                      l("span", null, o(A.help || a(n).label("勾选即启用。", "Checked means enabled.")), 1)
                    ]))
                  ]))), 128))
                ]),
                l("div", mp, [
                  l("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: u.value,
                    onClick: Z
                  }, o(u.value ? a(n).label("保存中…", "Saving…") : a(n).label("保存渠道配置", "Save channel configuration")), 9, bp),
                  l("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: H
                  }, o(a(n).label("恢复当前值", "Reset draft")), 1),
                  l("button", {
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: d.value,
                    onClick: V
                  }, o(d.value ? a(n).label("清空中…", "Clearing…") : a(n).label("清空配置", "Clear configuration")), 9, vp)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            ee(ie, {
              title: a(n).label("配置摘要", "Configuration summary"),
              eyebrow: "Summary"
            }, {
              default: ae(() => {
                var A, ce;
                return [
                  l("div", yp, [
                    l("article", wp, [
                      l("div", null, [
                        l("h3", null, o(a(n).label("普通字段", "Regular fields")), 1),
                        l("p", null, o(a(n).label("优先看这里就能知道这个渠道是否已经具备基本接入条件。", "Start here to see whether the channel has the basic information required to connect.")), 1)
                      ]),
                      l("strong", null, o(((A = m.value) == null ? void 0 : A.fields.length) || 0), 1)
                    ]),
                    l("article", kp, [
                      l("div", null, [
                        l("h3", null, o(a(n).label("本机变量", "Local secrets")), 1),
                        l("p", null, o(a(n).label("敏感值优先以本机变量方式保存，便于后续替换或清空。", "Sensitive values are best stored as local variables so they can be rotated or cleared later.")), 1)
                      ]),
                      l("strong", null, o(((ce = m.value) == null ? void 0 : ce.envFields.length) || 0), 1)
                    ]),
                    l("article", $p, [
                      l("div", null, [
                        l("h3", null, o(a(n).label("当前草稿", "Current draft")), 1),
                        l("p", null, o(a(n).label("这里只显示你现在编辑中的内容，不会自动写入运行态。", "This only shows the values you are editing now. Nothing reaches runtime until you save.")), 1)
                      ]),
                      l("strong", null, o(k.value.id), 1)
                    ])
                  ]),
                  a(n).developerMode ? (_(), v("pre", Sp, o(JSON.stringify({
                    enabled: f.enabled,
                    fields: Object.fromEntries(Object.keys(h).filter((oe) => !oe.startsWith("env:")).map((oe) => [oe, a(Fa)(oe) && T(oe) ? "******" : T(oe)])),
                    envFields: Object.fromEntries(Object.keys(h).filter((oe) => oe.startsWith("env:")).map((oe) => [oe, T(oe) ? "******" : ""]))
                  }, null, 2)), 1)) : (_(), v("p", Cp, o(a(n).label("当前草稿的原始配置预览已收纳到开发者模式里。需要排查字段写入结果时，请先到 Settings 打开开发者模式。", "The raw draft preview now stays behind developer mode. Enable it from Settings when you need to inspect the exact payload.")), 1))
                ];
              }),
              _: 1
            }, 8, ["title"])
          ])
        ])
      ], 64)) : re("", !0)
    ]));
  }
});
function Rp() {
  return Ee("/api/cron-ui");
}
function Ep(e) {
  return Ve("/api/cron-ui/create", e);
}
function Tp(e) {
  return Ve("/api/cron-ui/update", e);
}
function Ap(e) {
  return Ve("/api/cron-ui/enable", { jobId: e });
}
function Pp(e) {
  return Ve("/api/cron-ui/disable", { jobId: e });
}
function Mp(e) {
  return Ve("/api/cron-ui/run", { jobId: e });
}
function Op(e) {
  return Ve("/api/cron-ui/remove", { jobId: e });
}
const Ip = { class: "page-stack" }, Np = { class: "page-header" }, Dp = { class: "page-header__eyebrow" }, Lp = { class: "page-header__title" }, Fp = { class: "page-header__description" }, Up = {
  key: 0,
  class: "page-empty"
}, Vp = {
  key: 1,
  class: "page-empty page-empty--error"
}, Gp = { class: "stat-grid" }, Bp = { class: "stat-card" }, Hp = { class: "stat-card__label" }, Wp = { class: "stat-card" }, jp = { class: "stat-card__label" }, Kp = { class: "stat-card" }, zp = { class: "stat-card__label" }, qp = { class: "stat-card" }, Jp = { class: "stat-card__label" }, Qp = { class: "stat-card" }, Yp = { class: "stat-card__label" }, Zp = { class: "stat-card" }, Xp = { class: "stat-card__label" }, eh = {
  key: 0,
  class: "status-banner status-banner--warning"
}, th = {
  key: 0,
  class: "code-panel"
}, sh = {
  key: 1,
  class: "muted-copy"
}, nh = { class: "list-stack" }, lh = {
  key: 0,
  class: "risk-row"
}, ah = { class: "page-split" }, ih = { class: "provider-card__header" }, oh = { class: "muted-copy" }, rh = { class: "settings-grid settings-grid--wide" }, ch = { class: "settings-field" }, uh = ["placeholder"], dh = { class: "settings-field" }, fh = ["placeholder"], ph = { class: "settings-field" }, hh = { class: "settings-field" }, gh = ["placeholder"], _h = { class: "settings-field" }, mh = { class: "settings-field" }, bh = { class: "settings-field" }, vh = ["placeholder"], yh = { class: "settings-field" }, wh = { value: "" }, kh = { class: "settings-field" }, $h = { class: "settings-field" }, Sh = { class: "settings-field" }, Ch = ["placeholder"], xh = { class: "settings-field settings-field--full" }, Rh = ["placeholder"], Eh = { class: "settings-field settings-field--full" }, Th = ["placeholder"], Ah = { class: "checkbox-grid" }, Ph = { class: "checkbox-card" }, Mh = { class: "checkbox-card__body" }, Oh = { class: "checkbox-card" }, Ih = { class: "checkbox-card__body" }, Nh = { class: "checkbox-card" }, Dh = { class: "checkbox-card__body" }, Lh = { class: "checkbox-card" }, Fh = { class: "checkbox-card__body" }, Uh = { class: "page-actions" }, Vh = ["disabled"], Gh = { class: "control-grid" }, Bh = { class: "settings-field" }, Hh = ["placeholder"], Wh = { class: "pill-row" }, jh = {
  key: 0,
  class: "provider-stack"
}, Kh = { class: "provider-card__header" }, zh = { class: "mini-list" }, qh = { class: "mini-list__item mini-list__item--stack" }, Jh = { class: "mini-list__item mini-list__item--stack" }, Qh = { class: "mini-list__item mini-list__item--stack" }, Yh = { class: "page-actions" }, Zh = ["onClick"], Xh = ["disabled", "onClick"], eg = ["disabled", "onClick"], tg = ["disabled", "onClick"], sg = {
  key: 1,
  class: "page-empty"
}, ng = /* @__PURE__ */ Ge({
  __name: "CronPage",
  setup(e) {
    let t = null;
    const s = qe(), n = ut(), i = /* @__PURE__ */ j(""), r = /* @__PURE__ */ j("all"), c = /* @__PURE__ */ j("create"), u = /* @__PURE__ */ j(""), d = /* @__PURE__ */ j(""), h = /* @__PURE__ */ j(null), f = ct(() => Rp(), t, { immediate: !1 }), p = /* @__PURE__ */ Vt($());
    Oe(() => f.data, (P) => {
      P && (t = P);
    }), Ye(() => {
      f.execute({ silent: !!f.data });
    });
    const g = K(() => {
      var P;
      return ((P = f.data) == null ? void 0 : P.jobs) || [];
    }), m = K(() => g.value.filter((P) => P.enabled)), k = K(() => g.value.filter((P) => !P.enabled)), E = K(() => {
      const P = i.value.trim().toLowerCase();
      return g.value.filter((S) => r.value === "enabled" && !S.enabled || r.value === "disabled" && S.enabled ? !1 : P ? [
        S.name,
        S.id,
        S.agentId,
        S.schedule,
        S.prompt,
        S.status
      ].join(" ").toLowerCase().includes(P) : !0);
    });
    Oe(g, () => {
      c.value === "edit" && !g.value.find((P) => P.id === u.value) && x();
    });
    function $() {
      return {
        name: "",
        description: "",
        agentId: "",
        prompt: "",
        scheduleMode: "cron",
        scheduleValue: "0 9 * * *",
        enabled: !0,
        timezone: "",
        model: "",
        thinking: "",
        session: "main",
        wake: "now",
        timeoutSeconds: "30",
        stagger: "",
        announce: !1,
        bestEffortDeliver: !1,
        deleteAfterRun: !1
      };
    }
    function I(P = $()) {
      Object.assign(p, P);
    }
    function x() {
      c.value = "create", u.value = "", I();
    }
    function H(P) {
      const S = Number(P);
      return !Number.isFinite(S) || S <= 0 ? "" : S % 864e5 === 0 ? `${S / 864e5}d` : S % 36e5 === 0 ? `${S / 36e5}h` : S % 6e4 === 0 ? `${S / 6e4}m` : S % 1e3 === 0 ? `${S / 1e3}s` : String(S);
    }
    function L(P) {
      const S = P.raw || {}, B = S.payload || {}, Se = S.schedule || {}, M = $();
      return Se.kind === "every" ? (M.scheduleMode = "every", M.scheduleValue = H(Se.everyMs)) : Se.kind === "at" ? (M.scheduleMode = "at", M.scheduleValue = String(Se.at || "")) : Se.kind === "cron" && (M.scheduleMode = "cron", M.scheduleValue = String(Se.expr || "")), !M.scheduleValue && typeof P.schedule == "string" && (P.schedule.startsWith("cron ") ? (M.scheduleMode = "cron", M.scheduleValue = P.schedule.slice(5).trim()) : P.schedule.startsWith("every ") ? (M.scheduleMode = "every", M.scheduleValue = P.schedule.slice(6).trim()) : P.schedule.startsWith("at ") ? (M.scheduleMode = "at", M.scheduleValue = P.schedule.slice(3).trim()) : M.scheduleValue = P.schedule.trim()), M.stagger = H(Se.staggerMs), M.name = String(S.name || P.name || ""), M.description = String(S.description || ""), M.agentId = String(S.agentId || P.agentId || ""), M.prompt = String(B.message || B.text || S.message || P.prompt || ""), M.enabled = P.enabled !== !1, M.timezone = String(S.tz || ""), M.model = String(S.model || B.model || ""), M.thinking = String(S.thinking || B.thinking || ""), M.session = String(S.session || B.session || M.session), M.wake = String(S.wake || M.wake), M.timeoutSeconds = S.timeoutSeconds ? String(S.timeoutSeconds) : M.timeoutSeconds, M.announce = S.announce === !0 || S.deliver === !0, M.bestEffortDeliver = S.bestEffortDeliver === !0, M.deleteAfterRun = S.deleteAfterRun === !0, M;
    }
    function Z(P) {
      return P === !0 ? s.label("已开启", "Enabled") : P === !1 ? s.label("已关闭", "Disabled") : s.label("未知", "Unknown");
    }
    function V() {
      var S;
      const P = (S = f.data) == null ? void 0 : S.status;
      return P ? P.schedulerNextWakeAt ? it(P.schedulerNextWakeAt) : s.developerMode && P.storePath ? P.storePath : P.enabled === !0 ? s.label("调度器已启用，但下一次唤醒时间暂未返回。", "The scheduler is enabled, but the next wake time has not been reported yet.") : P.enabled === !1 ? s.label("调度器当前已停用。", "The scheduler is currently disabled.") : s.label("调度器路径已收纳到开发者模式。", "The scheduler path stays behind developer mode.") : s.label("调度器信息暂缺", "Scheduler details are missing");
    }
    function T(P) {
      const S = String(P.status || "").trim().toLowerCase();
      if (!S) return P.enabled ? s.label("已启用", "Enabled") : s.label("已停用", "Disabled");
      const Se = {
        enabled: { zh: "已启用", en: "Enabled" },
        disabled: { zh: "已停用", en: "Disabled" },
        running: { zh: "执行中", en: "Running" },
        queued: { zh: "排队中", en: "Queued" },
        pending: { zh: "等待中", en: "Pending" },
        paused: { zh: "已暂停", en: "Paused" },
        success: { zh: "成功", en: "Success" },
        completed: { zh: "已完成", en: "Completed" },
        failed: { zh: "失败", en: "Failed" },
        error: { zh: "异常", en: "Error" }
      }[S];
      return Se ? s.label(Se.zh, Se.en) : S;
    }
    function y(P) {
      const S = String(P.status || "").trim().toLowerCase();
      return ["running", "success", "completed", "enabled"].includes(S) ? "pill--success" : ["queued", "pending", "paused", "disabled"].includes(S) || P.enabled === !1 ? "pill--warning" : ["failed", "error"].includes(S) ? "pill--danger" : P.enabled ? "pill--info" : "pill--warning";
    }
    function R() {
      return p.scheduleMode === "every" ? "10m / 1h" : p.scheduleMode === "at" ? "2026-03-20T09:00:00+08:00" : "0 9 * * *";
    }
    function A() {
      return {
        name: p.name.trim() || void 0,
        description: p.description.trim() || void 0,
        agentId: p.agentId.trim() || void 0,
        prompt: p.prompt.trim() || void 0,
        scheduleMode: p.scheduleMode,
        scheduleValue: p.scheduleValue.trim(),
        enabled: p.enabled,
        timezone: p.timezone.trim() || void 0,
        model: p.model.trim() || void 0,
        thinking: p.thinking || void 0,
        session: p.session || void 0,
        wake: p.wake || void 0,
        timeoutSeconds: an(p.timeoutSeconds),
        stagger: p.stagger.trim() || void 0,
        announce: p.announce,
        bestEffortDeliver: p.bestEffortDeliver,
        deleteAfterRun: p.deleteAfterRun
      };
    }
    async function ce() {
      await f.execute({ silent: !!f.data });
    }
    function oe(P, S) {
      h.value = {
        tone: S,
        message: P.message,
        detail: P.output,
        at: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    async function he(P, S = !1) {
      const B = P.success ? "success" : "error";
      oe(P, B), n.pushToast({
        tone: B,
        message: P.message
      }), P.success && S && x(), await ce();
    }
    async function Re() {
      const P = c.value === "edit" ? "update" : "create";
      d.value = P;
      try {
        const S = A(), B = c.value === "edit" ? await Tp({ jobId: u.value, ...S }) : await Ep(S);
        await he(B, B.success);
      } catch (S) {
        const B = S instanceof Error ? S.message : String(S);
        h.value = {
          tone: "error",
          message: B,
          at: (/* @__PURE__ */ new Date()).toISOString()
        }, n.pushToast({
          tone: "error",
          message: B
        });
      } finally {
        d.value = "";
      }
    }
    function Le(P) {
      c.value = "edit", u.value = P.id, I(L(P));
    }
    async function $e(P, S) {
      if (P === "remove" && !await n.confirm({
        title: s.label("删除 Cron 任务", "Delete cron job"),
        message: s.label(`确认删除任务 ${S.id}？`, `Delete cron job ${S.id}?`),
        confirmLabel: s.label("确认删除", "Delete job"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      }))
        return;
      const B = `${P}:${S.id}`;
      d.value = B;
      try {
        const Se = P === "run" ? await Mp(S.id) : P === "enable" ? await Ap(S.id) : P === "disable" ? await Pp(S.id) : await Op(S.id);
        await he(Se, P === "remove" && c.value === "edit" && u.value === S.id);
      } catch (Se) {
        const M = Se instanceof Error ? Se.message : String(Se);
        h.value = {
          tone: "error",
          message: M,
          at: (/* @__PURE__ */ new Date()).toISOString()
        }, n.pushToast({
          tone: "error",
          message: M
        });
      } finally {
        d.value = "";
      }
    }
    return (P, S) => (_(), v("div", Ip, [
      l("header", Np, [
        l("div", null, [
          l("p", Dp, o(a(s).label("Cron / Fourth slice", "Cron / Fourth slice")), 1),
          l("h2", Lp, o(a(s).label("自动化任务", "Automation jobs")), 1),
          l("p", Fp, o(a(s).label("把当前 Cron 的创建、编辑、运行、启停和删除能力迁进新壳层里，同时保持旧接口合同不变，让自动化真正进入模块化前端。", "Move cron create, edit, run, enable, disable, and remove flows into the new shell while keeping the existing backend contract unchanged, so automation is fully part of the modular frontend.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: ce
        }, o(a(f).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新任务状态", "Refresh jobs")), 1)
      ]),
      a(f).loading && !a(f).data ? (_(), v("div", Up, o(a(s).label("正在读取 Cron 状态与任务列表…", "Loading cron status and jobs…")), 1)) : a(f).error && !a(f).data ? (_(), v("div", Vp, o(a(f).error), 1)) : a(f).data ? (_(), v(Y, { key: 2 }, [
        ee(ie, {
          title: a(s).label("运行概览", "Runtime overview"),
          eyebrow: "Overview"
        }, {
          default: ae(() => [
            l("div", Gp, [
              l("article", Bp, [
                l("p", Hp, o(a(s).label("任务总数", "Jobs")), 1),
                l("strong", null, o(a(_e)(a(f).data.jobs.length)) + " / " + o(a(_e)(a(f).data.total)), 1),
                l("span", null, o(a(s).label("当前已加载任务 / 运行态汇总总量", "Loaded jobs / runtime total")), 1)
              ]),
              l("article", Wp, [
                l("p", jp, o(a(s).label("已启用", "Enabled")), 1),
                l("strong", null, o(a(_e)(m.value.length)), 1),
                l("span", null, o(a(s).label("这些任务会按计划自动执行", "These jobs run on their schedule")), 1)
              ]),
              l("article", Kp, [
                l("p", zp, o(a(s).label("已停用", "Disabled")), 1),
                l("strong", null, o(a(_e)(k.value.length)), 1),
                l("span", null, o(a(s).label("停用后仍会保留，之后可以重新开启", "Disabled jobs stay available and can be resumed later")), 1)
              ]),
              l("article", qp, [
                l("p", Jp, o(a(s).label("调度器状态", "Scheduler")), 1),
                l("strong", null, o(Z(a(f).data.status.enabled)), 1),
                l("span", null, o(V()), 1)
              ]),
              l("article", Qp, [
                l("p", Yp, o(a(s).label("运行态任务数", "Runtime job count")), 1),
                l("strong", null, o(a(_e)(a(f).data.status.jobsCount)), 1),
                l("span", null, o(a(s).label("来自 openclaw cron status 的运行态统计", "Reported directly by openclaw cron status")), 1)
              ]),
              l("article", Zp, [
                l("p", Xp, o(a(s).label("分页窗口", "Pagination window")), 1),
                l("strong", null, o(a(_e)(a(f).data.offset)) + " / " + o(a(_e)(a(f).data.limit)), 1),
                l("span", null, o(a(f).data.hasMore ? a(s).label(`还有更多任务未加载，nextOffset=${a(f).data.nextOffset ?? "-"}`, `More jobs remain, nextOffset=${a(f).data.nextOffset ?? "-"}`) : a(s).label("当前页已经完整", "The current page is complete")), 1)
              ])
            ]),
            a(f).error ? (_(), v("div", eh, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(f).error), 1)) : re("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        h.value ? (_(), ze(ie, {
          key: 0,
          title: a(s).label("最近一次任务操作", "Latest task action"),
          eyebrow: "Action"
        }, {
          default: ae(() => [
            l("div", {
              class: pe(["status-banner", h.value.tone === "success" ? "status-banner--success" : "status-banner--error"])
            }, [
              l("strong", null, o(h.value.message), 1),
              l("span", null, o(a(it)(h.value.at)), 1)
            ], 2),
            a(s).developerMode && h.value.detail ? (_(), v("pre", th, o(h.value.detail), 1)) : h.value.detail ? (_(), v("p", sh, o(a(s).label("最近一次任务动作的原始 detail 已收纳到开发者模式里。需要查看底层返回内容时，请先到 Settings 打开开发者模式。", "The raw detail from the latest task action now stays behind developer mode. Enable it from Settings if you need the underlying payload.")), 1)) : re("", !0)
          ]),
          _: 1
        }, 8, ["title"])) : re("", !0),
        a(f).data.warnings.length || a(f).data.hasMore ? (_(), ze(ie, {
          key: 1,
          title: a(s).label("当前提醒", "Current warnings"),
          eyebrow: "Warnings"
        }, {
          default: ae(() => [
            l("div", nh, [
              (_(!0), v(Y, null, ye(a(f).data.warnings, (B) => (_(), v("article", {
                key: B,
                class: "risk-row"
              }, [
                l("strong", null, o(a(s).label("注意事项", "Warning")), 1),
                l("span", null, o(B), 1)
              ]))), 128)),
              a(f).data.hasMore ? (_(), v("article", lh, [
                l("strong", null, o(a(s).label("尚未完整加载", "More jobs exist")), 1),
                l("span", null, o(a(s).label(`当前只拉取到 ${a(f).data.jobs.length} 条任务，运行态汇总显示总量为 ${a(f).data.total}。`, `Only ${a(f).data.jobs.length} jobs are loaded while the runtime reports ${a(f).data.total} in total.`)), 1)
              ])) : re("", !0)
            ])
          ]),
          _: 1
        }, 8, ["title"])) : re("", !0),
        l("div", ah, [
          ee(ie, {
            title: c.value === "edit" ? a(s).label(`编辑任务 ${u.value}`, `Edit ${u.value}`) : a(s).label("新建 Cron 任务", "Create cron job"),
            eyebrow: "Editor"
          }, {
            default: ae(() => [
              l("div", ih, [
                l("p", oh, o(a(s).label("这里直接复用现有的 cron-ui 接口，所以保存后的任务会立即回到同一套运行态里，不会产生第二套自动化系统。", "This editor talks to the existing cron-ui API directly, so saved jobs go back into the same runtime immediately instead of creating a second automation system.")), 1),
                l("span", {
                  class: pe(["pill", c.value === "edit" ? "pill--warning" : "pill--success"])
                }, o(c.value === "edit" ? a(s).label("编辑模式", "Edit mode") : a(s).label("创建模式", "Create mode")), 3)
              ]),
              l("form", {
                class: "page-form-stack",
                onSubmit: bs(Re, ["prevent"])
              }, [
                l("div", rh, [
                  l("label", ch, [
                    l("span", null, o(a(s).label("任务名称", "Job name")), 1),
                    ke(l("input", {
                      "onUpdate:modelValue": S[0] || (S[0] = (B) => p.name = B),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("例如：每日汇总", "Example: Daily brief")
                    }, null, 8, uh), [
                      [Ue, p.name]
                    ])
                  ]),
                  l("label", dh, [
                    l("span", null, o(a(s).label("Agent ID", "Agent ID")), 1),
                    ke(l("input", {
                      "onUpdate:modelValue": S[1] || (S[1] = (B) => p.agentId = B),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("例如：task-hub", "Example: task-hub")
                    }, null, 8, fh), [
                      [Ue, p.agentId]
                    ])
                  ]),
                  l("label", ph, [
                    l("span", null, o(a(s).label("调度类型", "Schedule mode")), 1),
                    ke(l("select", {
                      "onUpdate:modelValue": S[2] || (S[2] = (B) => p.scheduleMode = B),
                      class: "settings-input"
                    }, [...S[21] || (S[21] = [
                      l("option", { value: "cron" }, "cron", -1),
                      l("option", { value: "every" }, "every", -1),
                      l("option", { value: "at" }, "at", -1)
                    ])], 512), [
                      [_t, p.scheduleMode]
                    ])
                  ]),
                  l("label", hh, [
                    l("span", null, o(a(s).label("调度值", "Schedule value")), 1),
                    ke(l("input", {
                      "onUpdate:modelValue": S[3] || (S[3] = (B) => p.scheduleValue = B),
                      class: "settings-input",
                      type: "text",
                      placeholder: R()
                    }, null, 8, gh), [
                      [Ue, p.scheduleValue]
                    ]),
                    l("small", null, o(a(s).label("cron 用 5 段表达式；every 例如 10m / 1h；at 支持 ISO 时间或 +20m。", "Use a 5-field cron expression, 10m / 1h for every, or ISO time / +20m for at.")), 1)
                  ]),
                  l("label", _h, [
                    l("span", null, o(a(s).label("时区", "Timezone")), 1),
                    ke(l("input", {
                      "onUpdate:modelValue": S[4] || (S[4] = (B) => p.timezone = B),
                      class: "settings-input",
                      type: "text",
                      placeholder: "Asia/Shanghai"
                    }, null, 512), [
                      [Ue, p.timezone]
                    ])
                  ]),
                  l("label", mh, [
                    l("span", null, o(a(s).label("会话模式", "Session mode")), 1),
                    ke(l("select", {
                      "onUpdate:modelValue": S[5] || (S[5] = (B) => p.session = B),
                      class: "settings-input"
                    }, [...S[22] || (S[22] = [
                      l("option", { value: "main" }, "main", -1),
                      l("option", { value: "isolated" }, "isolated", -1)
                    ])], 512), [
                      [_t, p.session]
                    ])
                  ]),
                  l("label", bh, [
                    l("span", null, o(a(s).label("模型覆盖", "Model override")), 1),
                    ke(l("input", {
                      "onUpdate:modelValue": S[6] || (S[6] = (B) => p.model = B),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("留空则使用 Agent 默认模型", "Leave blank to use the agent default")
                    }, null, 8, vh), [
                      [Ue, p.model]
                    ])
                  ]),
                  l("label", yh, [
                    l("span", null, o(a(s).label("Thinking 等级", "Thinking level")), 1),
                    ke(l("select", {
                      "onUpdate:modelValue": S[7] || (S[7] = (B) => p.thinking = B),
                      class: "settings-input"
                    }, [
                      l("option", wh, o(a(s).label("跟随默认", "Use default")), 1),
                      S[23] || (S[23] = l("option", { value: "off" }, "off", -1)),
                      S[24] || (S[24] = l("option", { value: "minimal" }, "minimal", -1)),
                      S[25] || (S[25] = l("option", { value: "low" }, "low", -1)),
                      S[26] || (S[26] = l("option", { value: "medium" }, "medium", -1)),
                      S[27] || (S[27] = l("option", { value: "high" }, "high", -1))
                    ], 512), [
                      [_t, p.thinking]
                    ])
                  ]),
                  l("label", kh, [
                    l("span", null, o(a(s).label("唤醒时机", "Wake mode")), 1),
                    ke(l("select", {
                      "onUpdate:modelValue": S[8] || (S[8] = (B) => p.wake = B),
                      class: "settings-input"
                    }, [...S[28] || (S[28] = [
                      l("option", { value: "now" }, "now", -1),
                      l("option", { value: "next-heartbeat" }, "next-heartbeat", -1)
                    ])], 512), [
                      [_t, p.wake]
                    ])
                  ]),
                  l("label", $h, [
                    l("span", null, o(a(s).label("超时（秒）", "Timeout (seconds)")), 1),
                    ke(l("input", {
                      "onUpdate:modelValue": S[9] || (S[9] = (B) => p.timeoutSeconds = B),
                      class: "settings-input",
                      type: "number",
                      min: "1",
                      placeholder: "30"
                    }, null, 512), [
                      [Ue, p.timeoutSeconds]
                    ])
                  ]),
                  l("label", Sh, [
                    l("span", null, o(a(s).label("错峰", "Stagger")), 1),
                    ke(l("input", {
                      "onUpdate:modelValue": S[10] || (S[10] = (B) => p.stagger = B),
                      class: "settings-input",
                      type: "text",
                      placeholder: a(s).label("例如：5m，填 0 表示精确执行", "Example: 5m, use 0 for exact timing")
                    }, null, 8, Ch), [
                      [Ue, p.stagger]
                    ])
                  ]),
                  l("label", xh, [
                    l("span", null, o(a(s).label("任务消息", "Prompt")), 1),
                    ke(l("textarea", {
                      "onUpdate:modelValue": S[11] || (S[11] = (B) => p.prompt = B),
                      class: "settings-textarea",
                      placeholder: a(s).label("例如：汇总今天的新线索并输出为 Markdown。", "Example: Summarize today’s new leads in Markdown.")
                    }, null, 8, Rh), [
                      [Ue, p.prompt]
                    ])
                  ]),
                  l("label", Eh, [
                    l("span", null, o(a(s).label("描述", "Description")), 1),
                    ke(l("textarea", {
                      "onUpdate:modelValue": S[12] || (S[12] = (B) => p.description = B),
                      class: "settings-textarea",
                      placeholder: a(s).label("可选，用来解释这个任务的用途。", "Optional note explaining what this job is for.")
                    }, null, 8, Th), [
                      [Ue, p.description]
                    ])
                  ])
                ]),
                l("div", Ah, [
                  l("label", Ph, [
                    ke(l("input", {
                      "onUpdate:modelValue": S[13] || (S[13] = (B) => p.enabled = B),
                      type: "checkbox"
                    }, null, 512), [
                      [os, p.enabled]
                    ]),
                    l("div", Mh, [
                      l("strong", null, o(a(s).label("保存后立即启用", "Enable after save")), 1),
                      l("p", null, o(a(s).label("关闭时任务会保留，但不会按计划自动执行。", "When disabled, the job stays available but will not run automatically.")), 1)
                    ])
                  ]),
                  l("label", Oh, [
                    ke(l("input", {
                      "onUpdate:modelValue": S[14] || (S[14] = (B) => p.announce = B),
                      type: "checkbox"
                    }, null, 512), [
                      [os, p.announce]
                    ]),
                    l("div", Ih, [
                      l("strong", null, o(a(s).label("投递结果", "Deliver output")), 1),
                      l("p", null, o(a(s).label("执行完成后尝试把结果投递回会话或目标通道。", "Try to deliver the result back to the session or target channel after execution.")), 1)
                    ])
                  ]),
                  l("label", Nh, [
                    ke(l("input", {
                      "onUpdate:modelValue": S[15] || (S[15] = (B) => p.bestEffortDeliver = B),
                      type: "checkbox"
                    }, null, 512), [
                      [os, p.bestEffortDeliver]
                    ]),
                    l("div", Dh, [
                      l("strong", null, o(a(s).label("尽力投递", "Best effort deliver")), 1),
                      l("p", null, o(a(s).label("当目标暂时不可用时，尽量保留或稍后交付结果。", "Keep or retry delivery when the target is temporarily unavailable.")), 1)
                    ])
                  ]),
                  l("label", Lh, [
                    ke(l("input", {
                      "onUpdate:modelValue": S[16] || (S[16] = (B) => p.deleteAfterRun = B),
                      type: "checkbox"
                    }, null, 512), [
                      [os, p.deleteAfterRun]
                    ]),
                    l("div", Fh, [
                      l("strong", null, o(a(s).label("运行后删除", "Delete after run")), 1),
                      l("p", null, o(a(s).label("适合一次性任务；普通巡检或日报不建议开启。", "Useful for one-off jobs. Leave it off for recurring inspections or briefs.")), 1)
                    ])
                  ])
                ])
              ], 32),
              l("div", Uh, [
                l("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: d.value === "create" || d.value === "update",
                  onClick: Re
                }, o(d.value === "create" || d.value === "update" ? a(s).label("保存中…", "Saving…") : c.value === "edit" ? a(s).label("保存修改", "Save changes") : a(s).label("创建任务", "Create job")), 9, Vh),
                l("button", {
                  class: "inline-link",
                  type: "button",
                  onClick: x
                }, o(c.value === "edit" ? a(s).label("切回创建模式", "Switch to create mode") : a(s).label("重置表单", "Reset form")), 1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(s).label("任务列表", "Job list"),
            eyebrow: "Jobs"
          }, {
            default: ae(() => [
              l("div", Gh, [
                l("label", Bh, [
                  l("span", null, o(a(s).label("搜索", "Search")), 1),
                  ke(l("input", {
                    "onUpdate:modelValue": S[17] || (S[17] = (B) => i.value = B),
                    class: "settings-input",
                    type: "text",
                    placeholder: a(s).label("搜索任务名、Agent、调度表达式", "Search by name, agent, or schedule")
                  }, null, 8, Hh), [
                    [Ue, i.value]
                  ])
                ])
              ]),
              l("div", Wh, [
                l("button", {
                  class: pe(["pill-button", { "pill-button--active": r.value === "all" }]),
                  type: "button",
                  onClick: S[18] || (S[18] = (B) => r.value = "all")
                }, o(a(s).label(`全部 (${g.value.length})`, `All (${g.value.length})`)), 3),
                l("button", {
                  class: pe(["pill-button", { "pill-button--active": r.value === "enabled" }]),
                  type: "button",
                  onClick: S[19] || (S[19] = (B) => r.value = "enabled")
                }, o(a(s).label(`启用中 (${m.value.length})`, `Enabled (${m.value.length})`)), 3),
                l("button", {
                  class: pe(["pill-button", { "pill-button--active": r.value === "disabled" }]),
                  type: "button",
                  onClick: S[20] || (S[20] = (B) => r.value = "disabled")
                }, o(a(s).label(`已停用 (${k.value.length})`, `Disabled (${k.value.length})`)), 3)
              ]),
              E.value.length ? (_(), v("div", jh, [
                (_(!0), v(Y, null, ye(E.value, (B) => (_(), v("article", {
                  key: B.id,
                  class: "provider-card"
                }, [
                  l("header", Kh, [
                    l("div", null, [
                      l("strong", null, o(B.name || B.id), 1),
                      l("p", null, o(`${B.id} · ${B.agentId}`), 1)
                    ]),
                    l("span", {
                      class: pe(["pill", y(B)])
                    }, o(T(B)), 3)
                  ]),
                  l("div", zh, [
                    l("div", qh, [
                      l("strong", null, o(a(s).label("调度", "Schedule")), 1),
                      l("p", null, o(B.schedule || "-"), 1)
                    ]),
                    l("div", Jh, [
                      l("strong", null, o(a(s).label("任务消息", "Prompt")), 1),
                      l("p", null, o(B.prompt || "-"), 1)
                    ]),
                    l("div", Qh, [
                      l("strong", null, o(a(s).label("最近执行", "Last run")), 1),
                      l("p", null, o(a(it)(B.lastRunAt)), 1),
                      l("p", null, o(a(s).label("下次执行：", "Next run: ")) + o(a(it)(B.nextRunAt)), 1)
                    ])
                  ]),
                  l("div", Yh, [
                    l("button", {
                      class: "inline-link",
                      type: "button",
                      onClick: (Se) => Le(B)
                    }, o(a(s).label("编辑", "Edit")), 9, Zh),
                    l("button", {
                      class: "inline-link",
                      type: "button",
                      disabled: d.value === `run:${B.id}`,
                      onClick: (Se) => $e("run", B)
                    }, o(d.value === `run:${B.id}` ? a(s).label("执行中…", "Running…") : a(s).label("立即运行", "Run now")), 9, Xh),
                    l("button", {
                      class: "inline-link",
                      type: "button",
                      disabled: d.value === `enable:${B.id}` || d.value === `disable:${B.id}`,
                      onClick: (Se) => $e(B.enabled ? "disable" : "enable", B)
                    }, o(d.value === `enable:${B.id}` || d.value === `disable:${B.id}` ? a(s).label("处理中…", "Working…") : B.enabled ? a(s).label("停用", "Disable") : a(s).label("启用", "Enable")), 9, eg),
                    l("button", {
                      class: "inline-link inline-link--danger",
                      type: "button",
                      disabled: d.value === `remove:${B.id}`,
                      onClick: (Se) => $e("remove", B)
                    }, o(d.value === `remove:${B.id}` ? a(s).label("删除中…", "Deleting…") : a(s).label("删除", "Delete")), 9, tg)
                  ])
                ]))), 128))
              ])) : (_(), v("div", sg, o(a(s).label("当前筛选条件下没有匹配的任务。", "No cron jobs match the current filters.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64)) : re("", !0)
    ]));
  }
});
async function lg() {
  const [e, t, s, n] = await Promise.all([
    Ee("/api/info"),
    Ee("/api/dashboard/overview"),
    Ee("/api/service/status"),
    Ee("/api/openclaw/status")
  ]);
  return { info: e, overview: t, services: s, openclaw: n };
}
async function ag() {
  const [e, t] = await Promise.all([
    Ee("/api/service/status"),
    Ee("/api/web-background/report")
  ]);
  return { services: e, webReport: t };
}
async function ig() {
  const [e, t] = await Promise.all([
    Ee("/api/openclaw/status"),
    Ee("/api/openclaw/targets")
  ]);
  return { status: e, targets: t };
}
const og = { class: "page-stack" }, rg = { class: "page-header" }, cg = { class: "page-header__eyebrow" }, ug = { class: "page-header__title" }, dg = { class: "page-header__description" }, fg = {
  key: 0,
  class: "page-empty"
}, pg = {
  key: 1,
  class: "page-empty page-empty--error"
}, hg = {
  key: 0,
  class: "status-banner status-banner--warning"
}, gg = { class: "stat-grid" }, _g = { class: "stat-card" }, mg = { class: "stat-card" }, bg = { class: "stat-card" }, vg = { class: "stat-card__label" }, yg = { class: "list-stack" }, wg = { class: "action-row" }, kg = { class: "action-row" }, $g = {
  class: "inline-link",
  href: "/",
  target: "_blank",
  rel: "noreferrer"
}, Sg = {
  key: 0,
  class: "list-stack"
}, Cg = {
  key: 1,
  class: "muted-copy"
}, xg = /* @__PURE__ */ Ge({
  __name: "DashboardPage",
  setup(e) {
    let t = null;
    const s = qe(), n = ct(() => lg(), t, { immediate: !1 }), i = K(() => {
      var c, u;
      const r = (u = (c = n.data) == null ? void 0 : c.overview) == null ? void 0 : u.risks;
      return Array.isArray(r) ? r : [];
    });
    return Oe(() => n.data, (r) => {
      r && (t = r);
    }), Ye(() => {
      n.execute({ silent: !!n.data });
    }), (r, c) => (_(), v("div", og, [
      l("header", rg, [
        l("div", null, [
          l("p", cg, o(a(s).label("首页 / First slice", "Home / First slice")), 1),
          l("h2", ug, o(a(s).label("带路首页", "Guided Home")), 1),
          l("p", dg, o(a(s).label("先回答现在能不能用、下一步该做什么，以及哪里可能有风险。", "Answer what works now, what to do next, and where risk still exists.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: c[0] || (c[0] = (u) => a(n).execute({ silent: !0 }))
        }, o(a(n).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      a(n).loading && !a(n).data ? (_(), v("div", fg, o(a(s).label("正在加载首页快照…", "Loading the home snapshot…")), 1)) : a(n).error && !a(n).data ? (_(), v("div", pg, o(a(n).error), 1)) : a(n).data ? (_(), v(Y, { key: 2 }, [
        a(n).error ? (_(), v("div", hg, o(a(s).label("已保留上一版首页快照，但后台刷新失败：", "The last home snapshot is still on screen, but the background refresh failed: ")) + o(a(n).error), 1)) : re("", !0),
        ee(ie, {
          title: a(s).label("当前可用性", "Current availability"),
          eyebrow: "Status"
        }, {
          default: ae(() => {
            var u, d, h, f, p, g, m, k, E, $;
            return [
              l("div", gg, [
                l("article", _g, [
                  c[1] || (c[1] = l("p", { class: "stat-card__label" }, "Guard", -1)),
                  l("strong", null, o(((u = a(n).data.info) == null ? void 0 : u.guardVersion) || "unknown"), 1),
                  l("span", null, o(((d = a(n).data.info) == null ? void 0 : d.platform) || "unknown platform"), 1)
                ]),
                l("article", mg, [
                  c[2] || (c[2] = l("p", { class: "stat-card__label" }, "OpenClaw", -1)),
                  l("strong", null, o((f = (h = a(n).data.info) == null ? void 0 : h.openclaw) != null && f.installed ? ((g = (p = a(n).data.info) == null ? void 0 : p.openclaw) == null ? void 0 : g.version) || "installed" : a(s).label("未安装", "Not installed")), 1),
                  l("span", null, o(((k = (m = a(n).data.info) == null ? void 0 : m.openclaw) == null ? void 0 : k.detectedSource) || a(s).label("待检测", "Pending detection")), 1)
                ]),
                l("article", bg, [
                  l("p", vg, o(a(s).label("Node 运行时", "Node runtime")), 1),
                  l("strong", null, o(((E = a(n).data.info) == null ? void 0 : E.nodeVersion) || "unknown"), 1),
                  l("span", null, o((($ = a(n).data.info) == null ? void 0 : $.user) || a(s).label("用户未知", "Unknown user")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        ee(ie, {
          title: a(s).label("建议动作", "Suggested actions"),
          eyebrow: "Next"
        }, {
          default: ae(() => [
            l("div", yg, [
              l("article", wg, [
                l("div", null, [
                  l("h3", null, o(a(s).label("继续迁移首页 / 运维 / OpenClaw", "Keep migrating Home / Operations / OpenClaw")), 1),
                  l("p", null, o(a(s).label("这一版 Vue 壳层已经接上真实 API，下一批继续迁移渠道、模型、安全、备份与恢复。", "This Vue shell already talks to real APIs; next we migrate Channels, Models, Security, and Recovery.")), 1)
                ]),
                ee(a(Al), {
                  class: "inline-link",
                  to: "/operations"
                }, {
                  default: ae(() => [
                    Sl(o(a(s).label("查看运维页", "Open operations")), 1)
                  ]),
                  _: 1
                })
              ]),
              l("article", kg, [
                l("div", null, [
                  l("h3", null, o(a(s).label("保持旧控制台可用", "Keep the legacy console available")), 1),
                  l("p", null, o(a(s).label("新壳层目前是开发线入口，不替换正式运行时。需要完整能力时仍可打开当前正式控制台。", "The new shell is a dev-line entry for now and does not replace the production runtime yet.")), 1)
                ]),
                l("a", $g, o(a(s).label("打开正式控制台", "Open production console")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        ee(ie, {
          title: a(s).label("风险提示", "Risk summary"),
          eyebrow: "Risk"
        }, {
          default: ae(() => [
            i.value.length ? (_(), v("div", Sg, [
              (_(!0), v(Y, null, ye(i.value, (u, d) => (_(), v("article", {
                key: `${u.title}-${d}`,
                class: "risk-row"
              }, [
                l("strong", null, o(u.title || a(s).label("未命名风险", "Unnamed risk")), 1),
                l("span", null, o(u.detail || a(s).label("暂无详细描述。", "No detail provided.")), 1)
              ]))), 128))
            ])) : (_(), v("p", Cg, o(a(s).label("当前 API 未返回结构化风险列表，因此这里先显示为安全占位。后续页面迁移时会继续精炼。", "The current API did not return structured risks, so this section stays intentionally lightweight for the first scaffold.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : re("", !0)
    ]));
  }
}), Rg = {
  class: "page-tabs",
  role: "tablist"
}, Eg = ["data-tab-id", "aria-selected", "onClick"], Tg = { key: 0 }, Cn = /* @__PURE__ */ Ge({
  __name: "PageTabs",
  props: {
    items: {},
    activeId: {}
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const s = t;
    return (n, i) => (_(), v("div", Rg, [
      (_(!0), v(Y, null, ye(e.items, (r) => (_(), v("button", {
        key: r.id,
        class: pe(["page-tabs__button", { "page-tabs__button--active": r.id === e.activeId }]),
        "data-tab-id": r.id,
        type: "button",
        role: "tab",
        "aria-selected": r.id === e.activeId,
        onClick: (c) => s("change", r.id)
      }, [
        l("span", null, o(r.label), 1),
        r.hint ? (_(), v("small", Tg, o(r.hint), 1)) : re("", !0)
      ], 10, Eg))), 128))
    ]));
  }
});
function Ag(e) {
  const t = new URLSearchParams();
  e && t.set("path", e);
  const s = t.size ? `?${t.toString()}` : "";
  return Ee(`/api/files${s}`);
}
function Ua(e) {
  const t = new URLSearchParams({ path: e });
  return Ee(`/api/files/content?${t.toString()}`);
}
function Pg(e, t) {
  return Ve("/api/files/content", {
    path: e,
    content: t
  });
}
function Mg(e, t, s) {
  return Ve("/api/files/create", {
    parentPath: e,
    name: t,
    kind: s
  });
}
function Og() {
  return Ee("/api/memory");
}
function ll(e) {
  const t = String(e || "").replace(/\\/g, "/"), s = t.split("/").pop() || "";
  return ["SOUL.md", "USER.md", "AGENTS.md", "MEMORY.md"].includes(s) ? !0 : /\/memory\/.+\.md$/i.test(t);
}
function Ps(e) {
  const t = String(e || "").replace(/[\\/]+$/, "");
  if (!t) return "";
  const s = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\"));
  return s >= 0 ? t.slice(0, s) : "";
}
const Ml = /* @__PURE__ */ wn("workspace", () => {
  const e = /* @__PURE__ */ j("all"), t = /* @__PURE__ */ j(""), s = /* @__PURE__ */ j(""), n = /* @__PURE__ */ j(""), i = /* @__PURE__ */ j("all"), r = /* @__PURE__ */ j(""), c = /* @__PURE__ */ j(""), u = /* @__PURE__ */ j(null);
  function d(I) {
    e.value = I;
  }
  function h(I) {
    t.value = I;
  }
  function f(I) {
    s.value = I, I && (t.value = Ps(I) || t.value);
  }
  function p(I) {
    n.value = I;
  }
  function g(I) {
    i.value = I;
  }
  function m(I) {
    r.value = I;
  }
  function k(I) {
    c.value = I;
  }
  function E(I) {
    const x = ll(I) ? "memory" : "all";
    u.value = {
      path: I,
      mode: x,
      parentPath: Ps(I)
    }, e.value = x, x === "memory" ? n.value = I : (s.value = I, t.value = Ps(I) || t.value);
  }
  function $() {
    const I = u.value;
    return u.value = null, I;
  }
  return {
    mode: e,
    currentPath: t,
    selectedFilePath: s,
    selectedMemoryFilePath: n,
    memoryKindFilter: i,
    memoryFilterQuery: r,
    searchQuery: c,
    pendingReveal: u,
    setMode: d,
    setCurrentPath: h,
    setSelectedFilePath: f,
    setSelectedMemoryFilePath: p,
    setMemoryKindFilter: g,
    setMemoryFilterQuery: m,
    setSearchQuery: k,
    requestReveal: E,
    consumeReveal: $
  };
}), Ig = { class: "page-stack" }, Ng = { class: "page-header" }, Dg = { class: "page-header__eyebrow" }, Lg = { class: "page-header__title" }, Fg = { class: "page-header__description" }, Ug = {
  key: 0,
  class: "page-empty"
}, Vg = {
  key: 1,
  class: "page-empty page-empty--error"
}, Gg = { class: "stat-grid" }, Bg = { class: "stat-card" }, Hg = { class: "stat-card__label" }, Wg = { class: "stat-card" }, jg = { class: "stat-card__label" }, Kg = { class: "stat-card" }, zg = { class: "stat-card__label" }, qg = { class: "stat-card" }, Jg = { class: "stat-card__label" }, Qg = { class: "page-two-column" }, Yg = { class: "list-stack" }, Zg = { class: "catalog-list" }, Xg = ["onClick"], e_ = { class: "catalog-list__title" }, t_ = { class: "pill-row" }, s_ = { class: "pill pill--info" }, n_ = { class: "mini-list" }, l_ = { class: "mini-list__item mini-list__item--stack" }, a_ = { class: "page-actions" }, i_ = ["disabled"], o_ = { class: "create-row" }, r_ = { value: "file" }, c_ = { value: "directory" }, u_ = ["placeholder", "onKeydown"], d_ = ["disabled"], f_ = {
  key: 0,
  class: "directory-list"
}, p_ = ["data-entry-kind", "onClick"], h_ = { class: "entry-button__title" }, g_ = { class: "pill-row" }, __ = { class: "pill pill--muted" }, m_ = {
  key: 1,
  class: "page-empty"
}, b_ = {
  key: 0,
  class: "page-empty"
}, v_ = { class: "mini-list" }, y_ = { class: "mini-list__item mini-list__item--stack" }, w_ = { class: "provider-card__header" }, k_ = { key: 0 }, $_ = { class: "page-actions" }, S_ = ["disabled"], C_ = {
  key: 2,
  class: "page-empty"
}, x_ = { class: "stat-grid" }, R_ = { class: "stat-card" }, E_ = { class: "stat-card__label" }, T_ = { class: "stat-card" }, A_ = { class: "stat-card__label" }, P_ = { class: "stat-card" }, M_ = { class: "stat-card__label" }, O_ = { class: "stat-card" }, I_ = { class: "stat-card__label" }, N_ = { class: "page-two-column" }, D_ = { class: "settings-field" }, L_ = ["value", "placeholder"], F_ = { class: "pill-row" }, U_ = ["onClick"], V_ = { class: "muted-copy" }, G_ = {
  key: 0,
  class: "page-empty"
}, B_ = {
  key: 1,
  class: "provider-stack"
}, H_ = { class: "provider-card__header" }, W_ = { key: 0 }, j_ = { class: "pill-row" }, K_ = { class: "pill pill--info" }, z_ = { class: "pill pill--muted" }, q_ = { class: "pill pill--muted" }, J_ = { class: "directory-list" }, Q_ = ["onClick"], Y_ = { class: "entry-button__title" }, Z_ = { class: "pill-row" }, X_ = { class: "pill pill--muted" }, em = {
  key: 2,
  class: "page-empty"
}, tm = {
  key: 0,
  class: "page-empty"
}, sm = { class: "mini-list" }, nm = { class: "mini-list__item mini-list__item--stack" }, lm = { class: "provider-card__header" }, am = { class: "page-actions" }, im = ["disabled"], om = {
  key: 2,
  class: "page-empty"
}, rm = /* @__PURE__ */ Ge({
  __name: "FilesPage",
  setup(e) {
    const t = qe(), s = ut(), n = Ml(), i = /* @__PURE__ */ j(!0), r = /* @__PURE__ */ j(!1), c = /* @__PURE__ */ j(!1), u = /* @__PURE__ */ j(!1), d = /* @__PURE__ */ j(null), h = /* @__PURE__ */ j(null), f = /* @__PURE__ */ j(null), p = /* @__PURE__ */ j([]), g = /* @__PURE__ */ j(null), m = /* @__PURE__ */ j(""), k = /* @__PURE__ */ j(""), E = /* @__PURE__ */ j(null), $ = /* @__PURE__ */ j(""), I = /* @__PURE__ */ j(""), x = /* @__PURE__ */ j(!1), H = /* @__PURE__ */ j(!1), L = /* @__PURE__ */ j("file"), Z = /* @__PURE__ */ j(""), V = K(() => [
      {
        id: "all",
        label: t.label("全部文件", "All files"),
        hint: t.label("浏览受 Guard 管理的工作区目录", "Browse Guard-managed workspace directories")
      },
      {
        id: "memory",
        label: t.label("核心记忆", "Core memory"),
        hint: t.label("集中查看 SOUL / USER / AGENTS / MEMORY 与 memory/", "Focus on SOUL / USER / AGENTS / MEMORY and memory/")
      }
    ]), T = K(() => n.mode === "memory" ? h.value : d.value), y = K(() => {
      var N;
      return ((N = f.value) == null ? void 0 : N.roots) || [];
    }), R = K(() => {
      var N;
      return ((N = f.value) == null ? void 0 : N.entries) || [];
    }), A = K(() => {
      var N;
      return ((N = f.value) == null ? void 0 : N.currentPath) || n.currentPath;
    }), ce = K(() => {
      var N;
      return ((N = f.value) == null ? void 0 : N.parentPath) || null;
    }), oe = K(() => y.value.filter((N) => A.value === N.path || A.value.startsWith(`${N.path}\\`) || A.value.startsWith(`${N.path}/`)).sort((N, Q) => Q.path.length - N.path.length)[0] || null), he = K(() => R.value.filter((N) => N.isDirectory).length), Re = K(() => R.value.length - he.value), Le = K(() => p.value), $e = K(() => {
      const N = n.memoryFilterQuery.trim().toLowerCase();
      return Le.value.filter((Q) => n.memoryKindFilter !== "all" && z(Q) !== n.memoryKindFilter ? !1 : N ? [
        Q.agentId,
        Q.type,
        Q.relativePath,
        Q.path
      ].join(" ").toLowerCase().includes(N) : !0).sort((Q, O) => {
        const fe = String(Q.agentId || "").localeCompare(String(O.agentId || ""));
        if (fe !== 0) return fe;
        const je = z(Q).localeCompare(z(O));
        return je !== 0 ? je : dt(Q).localeCompare(dt(O));
      });
    }), P = K(() => {
      var Q;
      const N = /* @__PURE__ */ new Map();
      for (const O of $e.value) {
        const fe = String(O.agentId || "");
        N.has(fe) || N.set(fe, []), (Q = N.get(fe)) == null || Q.push(O);
      }
      return Array.from(N.entries()).map(([O, fe]) => ({
        agentId: O,
        label: Te(O),
        files: fe,
        docsCount: fe.filter((je) => z(je) === "docs").length,
        notesCount: fe.filter((je) => z(je) === "notes").length
      })).sort((O, fe) => O.label.localeCompare(fe.label));
    }), S = K(() => Ze("file")), B = K(() => Ze("memory")), Se = K(() => S.value || B.value);
    function M(N) {
      return N.replace(/\r\n/g, `
`);
    }
    function z(N) {
      return N.type === "memory" ? "notes" : "docs";
    }
    function se(N) {
      return N === "docs" ? t.label("核心文档", "Core docs") : N === "notes" ? t.label("记忆片段", "Memory notes") : t.label("全部", "All");
    }
    function Te(N) {
      if (!N) return t.label("未分组", "Ungrouped");
      if (!N.startsWith("detected:")) return N;
      const Q = N.slice(9) || "workspace";
      return t.label(`自动发现：${Q}`, `Auto-detected: ${Q}`);
    }
    function dt(N) {
      if (N.type === "memory") {
        const Q = N.relativePath.split(/[\\/]/);
        return Q[Q.length - 1] || N.relativePath;
      }
      return N.type;
    }
    function Ze(N) {
      return N === "file" ? g.value !== null && M(m.value) !== k.value : E.value !== null && M($.value) !== I.value;
    }
    async function U() {
      return Se.value ? s.confirm({
        title: t.label("离开文件页", "Leave Files"),
        message: t.label(
          "当前仍有未保存的文件或记忆改动。现在离开会丢失这些修改。",
          "There are still unsaved file or memory edits. Leaving now will discard those changes."
        ),
        confirmLabel: t.label("放弃并离开", "Discard and leave"),
        cancelLabel: t.label("留在当前页", "Stay here"),
        tone: "danger"
      }) : !0;
    }
    async function ne(N) {
      if (!Ze(N)) return !0;
      const Q = N === "memory";
      return s.confirm({
        title: t.label(Q ? "切换记忆文件" : "切换文件", Q ? "Switch memory file" : "Switch file"),
        message: t.label(
          Q ? "当前记忆编辑器里有未保存修改，继续切换会丢失这些内容。" : "当前文件编辑器里有未保存修改，继续切换会丢失这些内容。",
          Q ? "There are unsaved changes in the memory editor. Switching now discards them." : "There are unsaved changes in the file editor. Switching now discards them."
        ),
        confirmLabel: t.label("放弃并继续", "Discard and continue"),
        cancelLabel: t.label("取消", "Cancel"),
        tone: "danger"
      });
    }
    async function J(N, Q = !1) {
      Q || (r.value = !0), d.value = null;
      try {
        const O = await Ag(N);
        f.value = O, n.setCurrentPath(O.currentPath);
      } catch (O) {
        d.value = O instanceof Error ? O.message : String(O);
      } finally {
        r.value = !1;
      }
    }
    async function ue(N = !1) {
      N || (c.value = !0), h.value = null;
      try {
        const Q = await Og();
        p.value = Q.files || [];
      } catch (Q) {
        h.value = Q instanceof Error ? Q.message : String(Q);
      } finally {
        c.value = !1;
      }
    }
    async function we(N, Q = !0) {
      if (Q && !await ne("file")) return !1;
      u.value = !0;
      try {
        const O = await Ua(N);
        return g.value = O, m.value = O.content || "", k.value = M(O.content || ""), n.setSelectedFilePath(N), !0;
      } catch (O) {
        return s.pushToast({
          tone: "error",
          message: O instanceof Error ? O.message : String(O)
        }), !1;
      } finally {
        u.value = !1;
      }
    }
    async function b(N, Q = !0) {
      if (Q && !await ne("memory")) return !1;
      u.value = !0;
      try {
        const O = await Ua(N);
        return E.value = O, $.value = O.content || "", I.value = M(O.content || ""), n.setSelectedMemoryFilePath(N), !0;
      } catch (O) {
        return s.pushToast({
          tone: "error",
          message: O instanceof Error ? O.message : String(O)
        }), !1;
      } finally {
        u.value = !1;
      }
    }
    async function w() {
      const N = n.currentPath || Ps(n.selectedFilePath) || void 0;
      await J(N, !0), n.selectedFilePath && await we(n.selectedFilePath, !1);
    }
    async function C() {
      await ue(!0), n.selectedMemoryFilePath && await b(n.selectedMemoryFilePath, !1);
    }
    async function D(N, Q, O = !0) {
      if (Q === "memory") {
        if (n.mode === "all" && O && !await ne("file")) return;
        n.setMode("memory"), await ue(!0), N && await b(N, !1);
        return;
      }
      n.mode === "memory" && O && !await ne("memory") || (n.setMode("all"), await J(Ps(N) || n.currentPath || void 0, !0), N && await we(N, !1));
    }
    async function G(N) {
      var fe, je;
      const Q = N === "memory" ? "memory" : "all";
      if (Q === n.mode) return;
      const O = Q === "memory" ? n.selectedMemoryFilePath || ((fe = E.value) == null ? void 0 : fe.path) || "" : n.selectedFilePath || ((je = g.value) == null ? void 0 : je.path) || "";
      await D(O, Q, !0), Q === "all" && !O && (n.setMode("all"), await J(n.currentPath || void 0, !0)), Q === "memory" && !O && (n.setMode("memory"), await ue(!0));
    }
    async function F(N) {
      if (N.isDirectory) {
        if (!await ne("file")) return;
        g.value = null, m.value = "", k.value = "", n.setSelectedFilePath(""), await J(N.path);
        return;
      }
      await we(N.path, !0);
    }
    async function te(N) {
      await ne("file") && (g.value = null, m.value = "", k.value = "", n.setSelectedFilePath(""), await J(N));
    }
    async function X() {
      ce.value && await ne("file") && (g.value = null, m.value = "", k.value = "", n.setSelectedFilePath(""), await J(ce.value));
    }
    async function q() {
      await J(A.value || void 0, !0);
    }
    async function W() {
      var N;
      (N = g.value) != null && N.path && await we(g.value.path, !0);
    }
    async function ge() {
      var N;
      (N = E.value) != null && N.path && await b(E.value.path, !0);
    }
    async function le(N) {
      const Q = N === "file" ? g.value : E.value, O = N === "file" ? m.value : $.value;
      if (Q != null && Q.path) {
        x.value = !0;
        try {
          const fe = await Pg(Q.path, O);
          s.pushToast({
            tone: fe.success ? "success" : "error",
            message: fe.message
          }), fe.success && (N === "file" ? (k.value = M(O), g.value && (g.value.content = O), await J(A.value || void 0, !0)) : (I.value = M(O), E.value && (E.value.content = O), await ue(!0)));
        } catch (fe) {
          s.pushToast({
            tone: "error",
            message: fe instanceof Error ? fe.message : String(fe)
          });
        } finally {
          x.value = !1;
        }
      }
    }
    async function de() {
      const N = A.value;
      if (!N) return;
      const Q = Z.value.trim();
      if (!Q) {
        s.pushToast({
          tone: "warning",
          message: t.label("请输入要创建的文件名或目录名。", "Enter the file or directory name first.")
        });
        return;
      }
      H.value = !0;
      try {
        const O = await Mg(N, Q, L.value);
        s.pushToast({
          tone: O.success ? "success" : "error",
          message: O.message
        }), O.success && (Z.value = "", await J(N, !0), L.value === "file" && O.path && await we(O.path, !1));
      } catch (O) {
        s.pushToast({
          tone: "error",
          message: O instanceof Error ? O.message : String(O)
        });
      } finally {
        H.value = !1;
      }
    }
    function be(N) {
      n.setMemoryKindFilter(N === "docs" || N === "notes" ? N : "all");
    }
    async function Ce() {
      var N;
      (N = E.value) != null && N.path && await D(E.value.path, "all", !0);
    }
    async function Ne() {
      i.value = !0;
      const N = n.consumeReveal();
      if (N != null && N.path) {
        await D(N.path, N.mode, !1), i.value = !1;
        return;
      }
      n.mode === "memory" ? await C() : await w(), i.value = !1;
    }
    async function Ae() {
      var N, Q, O, fe;
      if (n.mode === "memory") {
        if (await ue(!0), (N = E.value) != null && N.path && !B.value) {
          await b(E.value.path, !1);
          return;
        }
        (Q = E.value) != null && Q.path && B.value && s.pushToast({
          tone: "info",
          message: t.label(
            "已刷新记忆目录，但为避免覆盖未保存改动，当前编辑器内容保持不变。",
            "The memory catalog was refreshed, but the current editor content was kept to avoid overwriting unsaved changes."
          ),
          durationMs: 2600
        });
        return;
      }
      if (await J(A.value || void 0, !0), (O = g.value) != null && O.path && !S.value) {
        await we(g.value.path, !1);
        return;
      }
      (fe = g.value) != null && fe.path && S.value && s.pushToast({
        tone: "info",
        message: t.label(
          "已刷新目录列表，但为避免覆盖未保存改动，当前编辑器内容保持不变。",
          "The directory list was refreshed, but the current editor content was kept to avoid overwriting unsaved changes."
        ),
        durationMs: 2600
      });
    }
    Ye(() => {
      typeof window < "u" && window.addEventListener("beforeunload", Je), Ne();
    }), yl(() => {
      typeof window < "u" && window.removeEventListener("beforeunload", Je);
    }), xd(async () => U());
    function Je(N) {
      Se.value && (N.preventDefault(), N.returnValue = "");
    }
    return (N, Q) => (_(), v("div", Ig, [
      l("header", Ng, [
        l("div", null, [
          l("p", Dg, o(a(t).label("文件 / Third slice", "Files / Third slice")), 1),
          l("h2", Lg, o(a(t).label("文件与记忆", "Files and memory")), 1),
          l("p", Fg, o(a(t).label("保留“全部文件”和“核心记忆”双视图，让搜索、角色工作区和实际编辑动作都能在新壳层里接得上。", "Keep both the All Files and Core Memory views so search results, role workspaces, and real editing actions can all land cleanly in the new shell.")), 1)
        ]),
        l("button", {
          "data-testid": "files-soft-refresh",
          class: "page-header__action",
          type: "button",
          onClick: Ae
        }, o(i.value || r.value || c.value ? a(t).label("刷新中…", "Refreshing…") : a(t).label("Refresh", "Refresh")), 1)
      ]),
      ee(Cn, {
        items: V.value,
        "active-id": a(n).mode,
        onChange: G
      }, null, 8, ["items", "active-id"]),
      i.value ? (_(), v("div", Ug, o(a(t).label("正在恢复文件视图…", "Restoring the workspace view…")), 1)) : T.value && (a(n).mode === "all" && !f.value || a(n).mode === "memory" && !p.value.length) ? (_(), v("div", Vg, o(T.value), 1)) : a(n).mode === "all" ? (_(), v(Y, { key: 2 }, [
        ee(ie, {
          title: a(t).label("当前目录概览", "Current directory overview"),
          eyebrow: "Summary"
        }, {
          default: ae(() => {
            var O, fe, je;
            return [
              l("div", Gg, [
                l("article", Bg, [
                  l("p", Hg, o(a(t).label("受控根目录", "Managed roots")), 1),
                  l("strong", null, o(a(_e)(y.value.length)), 1),
                  l("span", null, o(((O = oe.value) == null ? void 0 : O.label) || a(t).label("当前正在受控范围内浏览", "Browsing inside the managed scope now")), 1)
                ]),
                l("article", Wg, [
                  l("p", jg, o(a(t).label("当前目录内容", "Current entries")), 1),
                  l("strong", null, o(a(_e)(R.value.length)), 1),
                  l("span", null, o(`${a(_e)(he.value)} ${a(t).label("个目录", "dirs")} / ${a(_e)(Re.value)} ${a(t).label("个文件", "files")}`), 1)
                ]),
                l("article", Kg, [
                  l("p", zg, o(a(t).label("当前打开文件", "Open file")), 1),
                  l("strong", null, o(g.value ? "1" : "0"), 1),
                  l("span", null, o(((fe = g.value) == null ? void 0 : fe.relativePath) || a(t).label("还没有打开文件", "No file opened yet")), 1)
                ]),
                l("article", qg, [
                  l("p", Jg, o(a(t).label("当前路径", "Current path")), 1),
                  l("strong", null, o(((je = oe.value) == null ? void 0 : je.type) === "detected-workspace" ? a(t).label("自动发现", "Auto-detected") : a(t).label("受控目录", "Managed")), 1),
                  l("span", null, o(A.value || a(t).label("等待路径返回", "Waiting for a resolved path")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        l("div", Qg, [
          ee(ie, {
            title: a(t).label("工作区浏览器", "Workspace browser"),
            eyebrow: "Browser"
          }, {
            default: ae(() => [
              l("div", Yg, [
                l("div", Zg, [
                  (_(!0), v(Y, null, ye(y.value, (O) => (_(), v("button", {
                    key: O.id,
                    class: pe(["catalog-list__item", { "catalog-list__item--active": A.value === O.path || A.value.startsWith(`${O.path}\\`) || A.value.startsWith(`${O.path}/`) }]),
                    type: "button",
                    onClick: (fe) => te(O.path)
                  }, [
                    l("div", e_, [
                      l("strong", null, o(O.label), 1)
                    ]),
                    l("div", t_, [
                      l("span", s_, o(O.type), 1)
                    ])
                  ], 10, Xg))), 128))
                ]),
                l("div", n_, [
                  l("div", l_, [
                    l("strong", null, o(a(t).label("当前路径", "Current path")), 1),
                    l("p", null, o(A.value || "-"), 1)
                  ])
                ]),
                l("div", a_, [
                  l("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: !ce.value,
                    onClick: X
                  }, o(a(t).label("返回上一级", "Go up")), 9, i_),
                  l("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: q
                  }, o(r.value ? a(t).label("刷新中…", "Refreshing…") : a(t).label("刷新目录", "Reload list")), 1)
                ]),
                l("div", o_, [
                  ke(l("select", {
                    "onUpdate:modelValue": Q[0] || (Q[0] = (O) => L.value = O),
                    class: "settings-input create-row__kind"
                  }, [
                    l("option", r_, o(a(t).label("文件", "File")), 1),
                    l("option", c_, o(a(t).label("目录", "Directory")), 1)
                  ], 512), [
                    [_t, L.value]
                  ]),
                  ke(l("input", {
                    "onUpdate:modelValue": Q[1] || (Q[1] = (O) => Z.value = O),
                    class: "settings-input",
                    type: "text",
                    placeholder: a(t).label("例如：README-local.md 或 drafts", "Example: README-local.md or drafts"),
                    onKeydown: Gc(bs(de, ["prevent"]), ["enter"])
                  }, null, 40, u_), [
                    [Ue, Z.value]
                  ]),
                  l("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: H.value,
                    onClick: de
                  }, o(H.value ? a(t).label("创建中…", "Creating…") : a(t).label("创建", "Create")), 9, d_)
                ]),
                R.value.length ? (_(), v("div", f_, [
                  (_(!0), v(Y, null, ye(R.value, (O) => {
                    var fe;
                    return _(), v("button", {
                      key: O.path,
                      class: pe(["entry-button", { "entry-button--active": ((fe = g.value) == null ? void 0 : fe.path) === O.path }]),
                      "data-entry-kind": O.isDirectory ? "directory" : "file",
                      type: "button",
                      onClick: (je) => F(O)
                    }, [
                      l("div", h_, [
                        l("strong", null, o(O.isDirectory ? `${a(t).label("[目录]", "[DIR]")} ${O.name}` : O.name), 1)
                      ]),
                      l("p", null, o(O.relativePath || O.path), 1),
                      l("div", g_, [
                        l("span", {
                          class: pe(["pill", O.isDirectory ? "pill--info" : "pill--muted"])
                        }, o(O.isDirectory ? a(t).label("目录", "Directory") : a(Tf)(O.size)), 3),
                        l("span", __, o(a(it)(O.modifiedAt)), 1)
                      ])
                    ], 10, p_);
                  }), 128))
                ])) : (_(), v("div", m_, o(a(t).label("当前目录下还没有可展示内容。", "The current directory does not contain any visible entries yet.")), 1))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(t).label("文件编辑器", "File editor"),
            eyebrow: "Editor"
          }, {
            default: ae(() => [
              u.value ? (_(), v("div", b_, o(a(t).label("正在读取文件内容…", "Loading file content…")), 1)) : g.value ? (_(), v(Y, { key: 1 }, [
                l("div", v_, [
                  l("div", y_, [
                    l("div", w_, [
                      l("strong", null, o(g.value.relativePath || g.value.path), 1),
                      l("span", {
                        "data-testid": "file-editor-state",
                        class: pe(["pill", S.value ? "pill--warning" : "pill--success"])
                      }, o(S.value ? a(t).label("未保存", "Unsaved") : a(t).label("已保存", "Saved")), 3)
                    ]),
                    l("p", null, o(g.value.path), 1),
                    g.value.truncated ? (_(), v("p", k_, o(a(t).label("文件内容过长，当前只预览了前一部分。", "This file is large, so only the first portion is loaded for preview and editing.")), 1)) : re("", !0)
                  ])
                ]),
                l("div", $_, [
                  l("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: W
                  }, o(a(t).label("重新读取", "Reload")), 1),
                  l("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: x.value,
                    onClick: Q[2] || (Q[2] = (O) => le("file"))
                  }, o(x.value ? a(t).label("保存中…", "Saving…") : a(t).label("保存文件", "Save file")), 9, S_)
                ]),
                ke(l("textarea", {
                  "onUpdate:modelValue": Q[3] || (Q[3] = (O) => m.value = O),
                  "data-testid": "file-editor-textarea",
                  class: "settings-textarea settings-textarea--editor",
                  rows: "22"
                }, null, 512), [
                  [Ue, m.value]
                ])
              ], 64)) : (_(), v("div", C_, o(a(t).label("先从左侧选择一个文件，再在这里查看或编辑。", "Select a file from the left side first, then view or edit it here.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64)) : (_(), v(Y, { key: 3 }, [
        ee(ie, {
          title: a(t).label("核心记忆概览", "Core memory overview"),
          eyebrow: "Summary"
        }, {
          default: ae(() => {
            var O;
            return [
              l("div", x_, [
                l("article", R_, [
                  l("p", E_, o(a(t).label("记忆文件数", "Memory files")), 1),
                  l("strong", null, o(a(_e)(Le.value.length)), 1),
                  l("span", null, o(`${a(_e)(Le.value.filter((fe) => fe.type !== "memory").length)} ${a(t).label("个核心文档", "core docs")} / ${a(_e)(Le.value.filter((fe) => fe.type === "memory").length)} ${a(t).label("个记忆片段", "memory notes")}`), 1)
                ]),
                l("article", T_, [
                  l("p", A_, o(a(t).label("覆盖角色", "Covered roles")), 1),
                  l("strong", null, o(a(_e)(P.value.length)), 1),
                  l("span", null, o(a(t).label("包含可管理记忆文件的角色或工作区", "Roles or workspaces that already have managed memory files")), 1)
                ]),
                l("article", P_, [
                  l("p", M_, o(a(t).label("当前显示", "Visible now")), 1),
                  l("strong", null, o(a(_e)($e.value.length)), 1),
                  l("span", null, o(`${se(a(n).memoryKindFilter)} / ${a(n).memoryFilterQuery || a(t).label("未设置搜索词", "No search query")}`), 1)
                ]),
                l("article", O_, [
                  l("p", I_, o(a(t).label("当前打开", "Current file")), 1),
                  l("strong", null, o(E.value ? "1" : "0"), 1),
                  l("span", null, o(((O = E.value) == null ? void 0 : O.relativePath) || a(t).label("还没有打开记忆文件", "No memory file opened yet")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        l("div", N_, [
          ee(ie, {
            title: a(t).label("记忆目录", "Memory catalog"),
            eyebrow: "Catalog"
          }, {
            default: ae(() => [
              l("div", D_, [
                l("span", null, o(a(t).label("筛选", "Filter")), 1),
                l("input", {
                  value: a(n).memoryFilterQuery,
                  class: "settings-input",
                  type: "text",
                  placeholder: a(t).label("搜索 Agent / 文件名 / 路径", "Filter by agent / file / path"),
                  onInput: Q[4] || (Q[4] = (O) => a(n).setMemoryFilterQuery(O.target.value))
                }, null, 40, L_)
              ]),
              l("div", F_, [
                (_(), v(Y, null, ye(["all", "docs", "notes"], (O) => l("button", {
                  key: O,
                  class: pe(["pill-button", { "pill-button--active": a(n).memoryKindFilter === O }]),
                  type: "button",
                  onClick: (fe) => be(O)
                }, [
                  l("span", null, o(se(O)), 1)
                ], 10, U_)), 64))
              ]),
              l("p", V_, o(a(t).label(`当前显示 ${a(_e)($e.value.length)} / ${a(_e)(Le.value.length)} 个记忆文件。`, `Showing ${a(_e)($e.value.length)} of ${a(_e)(Le.value.length)} memory files.`)), 1),
              c.value ? (_(), v("div", G_, o(a(t).label("正在读取记忆目录…", "Loading the memory catalog…")), 1)) : P.value.length ? (_(), v("div", B_, [
                (_(!0), v(Y, null, ye(P.value, (O) => (_(), v("article", {
                  key: O.agentId,
                  class: "provider-card"
                }, [
                  l("header", H_, [
                    l("div", null, [
                      l("strong", null, o(O.label), 1),
                      O.label !== O.agentId ? (_(), v("p", W_, o(O.agentId), 1)) : re("", !0)
                    ]),
                    l("div", j_, [
                      l("span", K_, o(a(_e)(O.files.length)), 1),
                      l("span", z_, o(`${se("docs")} ${a(_e)(O.docsCount)}`), 1),
                      l("span", q_, o(`${se("notes")} ${a(_e)(O.notesCount)}`), 1)
                    ])
                  ]),
                  l("div", J_, [
                    (_(!0), v(Y, null, ye(O.files, (fe) => {
                      var je;
                      return _(), v("button", {
                        key: fe.path,
                        class: pe(["entry-button", { "entry-button--active": ((je = E.value) == null ? void 0 : je.path) === fe.path }]),
                        "data-entry-kind": "memory",
                        type: "button",
                        onClick: (ot) => b(fe.path)
                      }, [
                        l("div", Y_, [
                          l("strong", null, o(dt(fe)), 1)
                        ]),
                        l("p", null, o(fe.relativePath || fe.path), 1),
                        l("div", Z_, [
                          l("span", {
                            class: pe(["pill", z(fe) === "docs" ? "pill--info" : "pill--success"])
                          }, o(se(z(fe))), 3),
                          l("span", X_, o(a(it)(fe.modifiedAt)), 1)
                        ])
                      ], 10, Q_);
                    }), 128))
                  ])
                ]))), 128))
              ])) : (_(), v("div", em, o(a(t).label("当前筛选条件下没有匹配的核心记忆文件。", "No core memory files match the current filter.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(t).label("记忆编辑器", "Memory editor"),
            eyebrow: "Editor"
          }, {
            default: ae(() => [
              u.value ? (_(), v("div", tm, o(a(t).label("正在读取记忆文件…", "Loading the memory file…")), 1)) : E.value ? (_(), v(Y, { key: 1 }, [
                l("div", sm, [
                  l("div", nm, [
                    l("div", lm, [
                      l("strong", null, o(E.value.relativePath || E.value.path), 1),
                      l("span", {
                        "data-testid": "memory-editor-state",
                        class: pe(["pill", B.value ? "pill--warning" : "pill--success"])
                      }, o(B.value ? a(t).label("未保存", "Unsaved") : a(t).label("已保存", "Saved")), 3)
                    ]),
                    l("p", null, o(E.value.path), 1),
                    l("p", null, o(a(t).label("修改后记得保存，这些内容会直接影响对应角色的行为、人格和长期记忆。", "Save after editing. These files directly affect role behavior, persona, and long-term memory.")), 1)
                  ])
                ]),
                l("div", am, [
                  l("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: ge
                  }, o(a(t).label("重新读取", "Reload")), 1),
                  l("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: Ce
                  }, o(a(t).label("在全部文件中定位", "Reveal in all files")), 1),
                  l("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: x.value,
                    onClick: Q[5] || (Q[5] = (O) => le("memory"))
                  }, o(x.value ? a(t).label("保存中…", "Saving…") : a(t).label("保存记忆文件", "Save memory file")), 9, im)
                ]),
                ke(l("textarea", {
                  "onUpdate:modelValue": Q[6] || (Q[6] = (O) => $.value = O),
                  "data-testid": "memory-editor-textarea",
                  class: "settings-textarea settings-textarea--editor",
                  rows: "22"
                }, null, 512), [
                  [Ue, $.value]
                ])
              ], 64)) : (_(), v("div", om, o(a(t).label("先从左侧选择一个记忆文件，再在这里查看或编辑。", "Select a memory file from the left side first, then view or edit it here.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ])
      ], 64))
    ]));
  }
});
async function cm(e = 200) {
  const t = await Ee(`/api/service/logs?lines=${encodeURIComponent(String(e))}`);
  return {
    logs: Array.isArray(t.logs) ? t.logs.map((s) => String(s)) : [],
    requestedLines: e
  };
}
const um = { class: "page-stack" }, dm = { class: "page-header" }, fm = { class: "page-header__eyebrow" }, pm = { class: "page-header__title" }, hm = { class: "page-header__description" }, gm = {
  key: 0,
  class: "page-empty"
}, _m = {
  key: 1,
  class: "page-empty page-empty--error"
}, mm = { class: "stat-grid" }, bm = { class: "stat-card" }, vm = { class: "stat-card__label" }, ym = { class: "stat-card" }, wm = { class: "stat-card__label" }, km = { class: "stat-card" }, $m = { class: "stat-card__label" }, Sm = { class: "stat-card" }, Cm = { class: "stat-card__label" }, xm = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Rm = { class: "page-actions" }, Em = ["onClick"], Tm = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Am = {
  key: 1,
  "data-testid": "logs-raw-output",
  class: "code-panel log-output"
}, Pm = {
  key: 0,
  class: "list-stack"
}, Mm = {
  key: 1,
  class: "page-empty"
}, Om = { class: "muted-copy" }, Im = /* @__PURE__ */ Ge({
  __name: "LogsPage",
  setup(e) {
    let t = null;
    const s = qe(), n = ut(), i = /* @__PURE__ */ j((t == null ? void 0 : t.requestedLines) || 200), r = ct(() => cm(i.value), t, { immediate: !1 }), c = [100, 200, 500], u = /(error|warn|fail|exception|timeout|denied|refused|panic|fatal|traceback|错误|失败|异常|拒绝|超时)/i, d = K(() => {
      var m;
      return ((m = r.data) == null ? void 0 : m.logs) || [];
    }), h = K(() => /^(获取日志失败|Failed to fetch logs)/.test(d.value[0] || "")), f = K(() => {
      const m = d.value.filter((k) => u.test(k));
      return m.length ? m.slice(-8) : d.value.slice(-6);
    });
    Oe(() => r.data, (m) => {
      m && (t = m);
    }), Ye(() => {
      r.execute({ silent: !!r.data });
    });
    async function p(m) {
      typeof m == "number" && (i.value = m), await r.execute({ silent: !!r.data });
    }
    async function g() {
      var m;
      typeof navigator > "u" || !((m = navigator.clipboard) != null && m.writeText) || (await navigator.clipboard.writeText(d.value.join(`
`)), n.pushToast({
        tone: "success",
        message: s.label("最近日志已复制。", "The latest log lines have been copied.")
      }));
    }
    return (m, k) => (_(), v("div", um, [
      l("header", dm, [
        l("div", null, [
          l("p", fm, o(a(s).label("日志 / Fourth slice", "Logs / Fourth slice")), 1),
          l("h2", pm, o(a(s).label("日志与排障", "Logs & troubleshooting")), 1),
          l("p", hm, o(a(s).label("先把最常用的 Gateway 日志排障入口迁进新壳层里，支持切换日志行数、静默刷新和快速复制，避免排障时还要跳回旧控制台。", "Bring the most-used Gateway log workflow into the new shell first, with line-count switching, silent refresh, and quick copy so troubleshooting no longer depends on the old console.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: k[0] || (k[0] = (E) => p())
        }, o(a(r).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新日志", "Refresh logs")), 1)
      ]),
      a(r).loading && !a(r).data ? (_(), v("div", gm, o(a(s).label("正在读取最近日志…", "Loading the latest log lines…")), 1)) : a(r).error && !a(r).data ? (_(), v("div", _m, o(a(r).error), 1)) : a(r).data ? (_(), v(Y, { key: 2 }, [
        ee(ie, {
          title: a(s).label("日志概览", "Log overview"),
          eyebrow: "Gateway"
        }, {
          default: ae(() => [
            l("div", mm, [
              l("article", bm, [
                l("p", vm, o(a(s).label("日志来源", "Source")), 1),
                k[1] || (k[1] = l("strong", null, "Gateway", -1)),
                l("span", null, o(a(s).label("当前先迁移最常用的 Gateway 日志入口", "The first migrated source is the Gateway log stream")), 1)
              ]),
              l("article", ym, [
                l("p", wm, o(a(s).label("请求行数", "Requested lines")), 1),
                l("strong", null, o(a(_e)(a(r).data.requestedLines)), 1),
                l("span", null, o(a(s).label("切换后会静默拉取新结果", "Changing this refreshes the result silently")), 1)
              ]),
              l("article", km, [
                l("p", $m, o(a(s).label("返回行数", "Returned lines")), 1),
                l("strong", null, o(a(_e)(d.value.length)), 1),
                l("span", null, o(a(s).label("展示当前接口返回的最新结果", "Shows the latest lines returned by the API")), 1)
              ]),
              l("article", Sm, [
                l("p", Cm, o(a(s).label("当前状态", "Current state")), 1),
                l("strong", null, o(h.value ? a(s).label("需要排查", "Needs attention") : a(s).label("可直接查看", "Ready to inspect")), 1),
                l("span", null, o(h.value ? a(s).label("接口返回了错误提示，建议先回到运维确认服务状态。", "The API returned an error banner. Confirm the service state in Operations first.") : a(s).label("如果最近刚执行过启停或重启，先看这里通常最快。", "If you recently started, stopped, or restarted services, this is usually the fastest place to check.")), 1)
              ])
            ]),
            a(r).error ? (_(), v("div", xm, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : re("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        ee(ie, {
          title: a(s).label("最近日志输出", "Latest log output"),
          eyebrow: "Output"
        }, {
          actions: ae(() => [
            l("div", Rm, [
              (_(), v(Y, null, ye(c, (E) => l("button", {
                key: E,
                class: pe(["pill-button", { "pill-button--active": i.value === E }]),
                type: "button",
                onClick: ($) => p(E)
              }, o(a(s).label(`最近 ${E} 行`, `${E} lines`)), 11, Em)), 64)),
              a(s).developerMode ? (_(), v("button", {
                key: 0,
                "data-testid": "logs-copy-action",
                class: "inline-link",
                type: "button",
                onClick: g
              }, o(a(s).label("复制日志", "Copy logs")), 1)) : re("", !0)
            ])
          ]),
          default: ae(() => [
            h.value ? (_(), v("div", Tm, o(d.value[0]), 1)) : re("", !0),
            a(s).developerMode ? (_(), v("pre", Am, o(d.value.join(`
`) || a(s).label("当前没有可显示的日志内容。", "No log content is available right now.")), 1)) : (_(), v(Y, { key: 2 }, [
              f.value.length ? (_(), v("div", Pm, [
                (_(!0), v(Y, null, ye(f.value, (E, $) => (_(), v("article", {
                  key: `${$}:${E}`,
                  class: "risk-row"
                }, [
                  l("strong", null, o(u.test(E) ? a(s).label("关键片段", "Key line") : a(s).label("最近输出", "Recent line")), 1),
                  l("span", null, o(E), 1)
                ]))), 128))
              ])) : (_(), v("div", Mm, o(a(s).label("当前没有可显示的日志摘要。", "No log summary is available right now.")), 1)),
              l("p", Om, o(a(s).label("完整原始日志和复制动作已收纳到开发者模式。需要逐行排障时，请先到 Settings 打开开发者模式。", "Full raw logs and copy actions now stay behind developer mode. Enable developer mode from Settings when you need line-by-line troubleshooting.")), 1)
            ], 64))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64)) : re("", !0)
    ]));
  }
});
async function Nm() {
  const [e, t] = await Promise.all([
    Ee("/api/ai/config"),
    Ee("/api/ai/providers")
  ]);
  return { config: e, catalog: t };
}
function Dm(e) {
  return Ve("/api/ai/provider", e);
}
function Lm(e) {
  return io(`/api/ai/provider/${encodeURIComponent(e)}`);
}
function Fm(e) {
  return Ve("/api/ai/primary", { modelId: e });
}
function Um(e) {
  return Ve("/api/ai/fallbacks", { modelIds: e });
}
const Vm = { class: "page-stack" }, Gm = { class: "page-header" }, Bm = { class: "page-header__eyebrow" }, Hm = { class: "page-header__title" }, Wm = { class: "page-header__description" }, jm = {
  key: 0,
  class: "page-empty"
}, Km = {
  key: 1,
  class: "page-empty page-empty--error"
}, zm = {
  key: 0,
  class: "status-banner status-banner--warning"
}, qm = { class: "stat-grid" }, Jm = { class: "stat-card" }, Qm = { class: "stat-card__label" }, Ym = { class: "stat-card" }, Zm = { class: "stat-card__label" }, Xm = { class: "stat-card" }, eb = { class: "stat-card__label" }, tb = { class: "stat-card" }, sb = { class: "stat-card__label" }, nb = { class: "settings-grid settings-grid--wide" }, lb = { class: "settings-field" }, ab = { value: "" }, ib = ["value"], ob = { class: "checkbox-grid" }, rb = ["checked", "onChange"], cb = { class: "page-actions" }, ub = ["disabled"], db = { class: "page-two-column" }, fb = { class: "catalog-list" }, pb = ["onClick"], hb = { class: "catalog-list__title" }, gb = { class: "pill-row" }, _b = { class: "page-stack" }, mb = { class: "muted-copy" }, bb = { class: "settings-grid settings-grid--wide" }, vb = { class: "settings-field" }, yb = { class: "settings-field" }, wb = { class: "settings-field" }, kb = ["value"], $b = { class: "settings-field" }, Sb = { class: "settings-field settings-field--full" }, Cb = { class: "page-actions" }, xb = ["disabled"], Rb = ["disabled"], Eb = { class: "provider-stack" }, Tb = { class: "provider-card__header" }, Ab = { class: "pill-row" }, Pb = {
  key: 0,
  class: "pill pill--success"
}, Mb = {
  key: 1,
  class: "pill pill--muted"
}, Ob = { class: "mini-list" }, Ib = { class: "pill-row" }, Nb = {
  key: 0,
  class: "pill pill--success"
}, Db = {
  key: 1,
  class: "pill pill--info"
}, Lb = /* @__PURE__ */ Ge({
  __name: "ModelsPage",
  setup(e) {
    const t = ["openai-completions", "anthropic-messages", "openai-responses"];
    let s = null;
    const n = qe(), i = ut(), r = ct(() => Nm(), s, { immediate: !1 }), c = /* @__PURE__ */ j("__new__"), u = /* @__PURE__ */ j(!1), d = /* @__PURE__ */ j(!1), h = /* @__PURE__ */ j(!1), f = /* @__PURE__ */ j(""), p = /* @__PURE__ */ j([]), g = /* @__PURE__ */ Vt({
      mode: "new",
      title: "",
      canDelete: !1,
      name: "",
      baseUrl: "",
      apiType: "openai-completions",
      apiKey: "",
      apiKeyHelp: "",
      modelsText: ""
    }), m = K(() => {
      const T = r.data, y = (T == null ? void 0 : T.config.providers) || [], R = (T == null ? void 0 : T.catalog.presets) || [];
      return [
        { value: "__new__", label: n.label("新建空白 Provider", "Create blank provider"), kind: "new" },
        ...y.map((A) => ({
          value: A.name,
          label: `${A.name} · ${n.label("已配置", "configured")}`,
          kind: "custom"
        })),
        ...R.filter((A) => !y.some((ce) => ce.name === A.id)).map((A) => ({
          value: A.id,
          label: `${A.id} · ${n.label("预设", "preset")}`,
          kind: "preset"
        }))
      ];
    }), k = K(() => {
      var y;
      return (((y = r.data) == null ? void 0 : y.config.providers) || []).flatMap((R) => R.models.map((A) => ({
        providerName: R.name,
        fullId: A.fullId,
        name: A.name,
        api: A.api
      })));
    });
    function E(T, y) {
      return T.map((R) => [
        R.id || "",
        R.name || R.id || "",
        R.contextWindow || "",
        R.maxTokens || "",
        R.api || y || ""
      ].join("|")).join(`
`);
    }
    function $(T, y) {
      return T.split(/\r?\n/).map((R) => R.trim()).filter(Boolean).map((R) => {
        const [A, ce, oe, he, Re] = R.split("|").map((Le) => Le.trim());
        return {
          id: A,
          name: ce || A,
          contextWindow: an(oe),
          maxTokens: an(he),
          api: Re || y || void 0
        };
      }).filter((R) => R.id);
    }
    function I(T) {
      var Le, $e;
      const y = r.data;
      if (!y) return;
      const R = y.config.providers, A = new Map(R.map((P) => [P.name, P])), ce = new Map((y.catalog.custom || []).map((P) => [P.name, P])), oe = new Map((y.catalog.presets || []).map((P) => [P.id, P]));
      if (!T || T === "__new__") {
        g.mode = "new", g.title = n.label("新建 Provider", "Create provider"), g.canDelete = !1, g.name = "", g.baseUrl = "", g.apiType = "openai-completions", g.apiKey = "", g.apiKeyHelp = n.label("保存后写入 openclaw.json。", "Saved into openclaw.json after you confirm."), g.modelsText = "";
        return;
      }
      const he = ce.get(T);
      if (he) {
        const P = A.get(T);
        g.mode = "custom", g.title = n.label("编辑已配置 Provider", "Edit configured provider"), g.canDelete = !0, g.name = T, g.baseUrl = he.baseUrl || "", g.apiType = he.apiType || he.api || (($e = (Le = he.models) == null ? void 0 : Le[0]) == null ? void 0 : $e.api) || "openai-completions", g.apiKey = "", g.apiKeyHelp = P != null && P.apiKeyMasked ? n.label(`留空会保留现有密钥：${P.apiKeyMasked}`, `Leave blank to keep the current key: ${P.apiKeyMasked}`) : n.label("填写后会覆盖当前密钥。", "A filled value replaces the current key."), g.modelsText = E(he.models || [], g.apiType);
        return;
      }
      const Re = oe.get(T);
      if (Re) {
        g.mode = "preset", g.title = n.label("从预设带入 Provider", "Bootstrap provider from preset"), g.canDelete = !1, g.name = Re.id, g.baseUrl = Re.defaultBaseUrl || "", g.apiType = Re.apiType || "openai-completions", g.apiKey = "", g.apiKeyHelp = Re.requiresApiKey ? n.label("保存前请填写 API Key。", "Fill in the API key before saving.") : n.label("这个 Provider 通常不需要 API Key。", "This provider usually does not require an API key."), g.modelsText = E(
          (Re.suggestedModels || []).map((P) => ({
            id: P.id,
            name: P.name,
            api: Re.apiType
          })),
          Re.apiType
        );
        return;
      }
      c.value = "__new__";
    }
    Oe(
      () => r.data,
      (T) => {
        var R;
        if (T && (s = T), !T) return;
        f.value = T.config.primaryModel || "", p.value = [...T.config.fallbackModels || []];
        const y = m.value;
        if (!y.some((A) => A.value === c.value)) {
          c.value = ((R = y[1]) == null ? void 0 : R.value) || "__new__";
          return;
        }
        I(c.value);
      },
      { immediate: !0 }
    ), Oe(c, (T) => {
      I(T);
    }), Ye(() => {
      r.execute({ silent: !!r.data });
    });
    async function x() {
      u.value = !0;
      try {
        const T = await Fm(f.value);
        if (!T.success)
          throw new Error(T.message);
        const y = await Um(p.value.filter((R) => R !== f.value));
        if (!y.success)
          throw new Error(y.message);
        i.pushToast({
          tone: "success",
          message: n.label("模型路由已更新。", "Model routing was updated.")
        }), await r.execute({ silent: !0 });
      } catch (T) {
        i.pushToast({
          tone: "error",
          message: T instanceof Error ? T.message : String(T)
        });
      } finally {
        u.value = !1;
      }
    }
    async function H() {
      d.value = !0;
      try {
        const T = await Dm({
          name: g.name.trim(),
          baseUrl: g.baseUrl.trim(),
          apiKey: g.apiKey.trim() || void 0,
          apiType: g.apiType,
          models: $(g.modelsText, g.apiType)
        });
        i.pushToast({
          tone: T.success ? "success" : "error",
          message: T.message
        }), T.success && (c.value = g.name.trim() || "__new__", await r.execute({ silent: !0 }));
      } catch (T) {
        i.pushToast({
          tone: "error",
          message: T instanceof Error ? T.message : String(T)
        });
      } finally {
        d.value = !1;
      }
    }
    async function L() {
      if (!(!g.canDelete || !g.name || !await i.confirm({
        title: n.label("删除 Provider", "Delete provider"),
        message: n.label(
          `确认删除 ${g.name} 吗？这会同时移除它的模型定义、主模型引用和备用链路。`,
          `Delete ${g.name}? This also removes its model definitions, primary selection, and fallback references.`
        ),
        confirmLabel: n.label("确认删除", "Delete provider"),
        cancelLabel: n.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        h.value = !0;
        try {
          const y = await Lm(g.name);
          i.pushToast({
            tone: y.success ? "success" : "error",
            message: y.message
          }), y.success && (c.value = "__new__", await r.execute({ silent: !0 }));
        } catch (y) {
          i.pushToast({
            tone: "error",
            message: y instanceof Error ? y.message : String(y)
          });
        } finally {
          h.value = !1;
        }
      }
    }
    function Z(T) {
      if (p.value.includes(T)) {
        p.value = p.value.filter((y) => y !== T);
        return;
      }
      p.value = [...p.value, T];
    }
    function V(T, y) {
      var R;
      return T ? n.label(`预设入口：${T.name}`, `Preset source: ${T.name}`) : (R = y == null ? void 0 : y.models) != null && R.length ? n.label(`当前已录入 ${y.models.length} 个模型`, `${y.models.length} model entries are recorded now`) : n.label("保存后就会写入当前 openclaw.json。", "Saving writes the provider into the active openclaw.json.");
    }
    return (T, y) => (_(), v("div", Vm, [
      l("header", Gm, [
        l("div", null, [
          l("p", Bm, o(a(n).label("模型 / Second slice", "Models / Second slice")), 1),
          l("h2", Hm, o(a(n).label("模型策略", "Model strategy")), 1),
          l("p", Wm, o(a(n).label("把 Provider、主模型和 fallback 链迁到模块化页面里，同时保持当前 openclaw.json 的真实读写。", "Move providers, the primary model, and the fallback chain into the modular page while keeping real read-write access to the current openclaw.json.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: y[0] || (y[0] = (R) => a(r).execute({ silent: !0 }))
        }, o(a(r).refreshing ? a(n).label("刷新中…", "Refreshing…") : a(n).label("刷新", "Refresh")), 1)
      ]),
      a(r).loading && !a(r).data ? (_(), v("div", jm, o(a(n).label("正在读取模型配置…", "Loading model configuration…")), 1)) : a(r).error && !a(r).data ? (_(), v("div", Km, o(a(r).error), 1)) : a(r).data ? (_(), v(Y, { key: 2 }, [
        a(r).error ? (_(), v("div", zm, o(a(n).label("已保留上一版模型快照，但后台刷新失败：", "The last model snapshot is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : re("", !0),
        ee(ie, {
          title: a(n).label("当前路由概览", "Current routing overview"),
          eyebrow: "Routing"
        }, {
          default: ae(() => [
            l("div", qm, [
              l("article", Jm, [
                l("p", Qm, o(a(n).label("主模型", "Primary model")), 1),
                l("strong", null, o(a(r).data.config.primaryModel || a(n).label("待设置", "Not configured")), 1),
                l("span", null, o(a(n).label("默认执行路径", "Default execution route")), 1)
              ]),
              l("article", Ym, [
                l("p", Zm, o(a(n).label("Provider 数量", "Providers")), 1),
                l("strong", null, o(a(r).data.config.providers.length), 1),
                l("span", null, o(a(n).label("已经进入运行配置", "Already present in runtime config")), 1)
              ]),
              l("article", Xm, [
                l("p", eb, o(a(n).label("备用模型", "Fallbacks")), 1),
                l("strong", null, o(a(r).data.config.fallbackModels.length), 1),
                l("span", null, o(a(n).label("主模型失败时按顺序尝试", "Tried in sequence when the primary route fails")), 1)
              ]),
              l("article", tb, [
                l("p", sb, o(a(n).label("可选模型", "Available models")), 1),
                l("strong", null, o(k.value.length), 1),
                l("span", null, o(a(n).label("来自当前已配置 Provider", "Collected from configured providers")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        ee(ie, {
          title: a(n).label("主模型与备用链路", "Primary and fallback chain"),
          eyebrow: "Routing editor"
        }, {
          default: ae(() => [
            l("div", nb, [
              l("label", lb, [
                l("span", null, o(a(n).label("主模型", "Primary model")), 1),
                l("small", null, o(a(n).label("Guard 默认先走这一条模型路径。", "Guard routes here first by default.")), 1),
                ke(l("select", {
                  "onUpdate:modelValue": y[1] || (y[1] = (R) => f.value = R),
                  class: "settings-input"
                }, [
                  l("option", ab, o(a(n).label("暂不设置", "Leave unset")), 1),
                  (_(!0), v(Y, null, ye(k.value, (R) => (_(), v("option", {
                    key: R.fullId,
                    value: R.fullId
                  }, o(`${R.providerName} / ${R.name}`), 9, ib))), 128))
                ], 512), [
                  [_t, f.value]
                ])
              ])
            ]),
            l("div", ob, [
              (_(!0), v(Y, null, ye(k.value, (R) => (_(), v("label", {
                key: R.fullId,
                class: "checkbox-card"
              }, [
                l("input", {
                  checked: p.value.includes(R.fullId),
                  type: "checkbox",
                  onChange: (A) => Z(R.fullId)
                }, null, 40, rb),
                l("div", null, [
                  l("strong", null, o(`${R.providerName} / ${R.name}`), 1),
                  l("p", null, o(R.api || a(n).label("未声明 API 类型", "API type is not declared")), 1)
                ])
              ]))), 128))
            ]),
            l("div", cb, [
              l("button", {
                class: "inline-link inline-link--primary",
                type: "button",
                disabled: u.value,
                onClick: x
              }, o(u.value ? a(n).label("保存中…", "Saving…") : a(n).label("保存路由策略", "Save routing strategy")), 9, ub)
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        l("div", db, [
          ee(ie, {
            title: a(n).label("Provider 选择器", "Provider picker"),
            eyebrow: "Provider"
          }, {
            default: ae(() => [
              l("div", fb, [
                (_(!0), v(Y, null, ye(m.value, (R) => (_(), v("button", {
                  key: R.value,
                  class: pe(["catalog-list__item", { "catalog-list__item--active": c.value === R.value }]),
                  type: "button",
                  onClick: (A) => c.value = R.value
                }, [
                  l("div", hb, [
                    l("strong", null, o(R.label), 1)
                  ]),
                  l("div", gb, [
                    l("span", {
                      class: pe(["pill", R.kind === "custom" ? "pill--success" : R.kind === "preset" ? "pill--info" : "pill--muted"])
                    }, o(R.kind === "custom" ? a(n).label("已配置", "Configured") : R.kind === "preset" ? a(n).label("预设", "Preset") : a(n).label("空白", "Blank")), 3)
                  ])
                ], 10, pb))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          l("div", _b, [
            ee(ie, {
              title: g.title,
              eyebrow: "Editor"
            }, {
              default: ae(() => [
                l("p", mb, o(V(a(r).data.catalog.presets.find((R) => R.id === c.value), a(r).data.catalog.custom.find((R) => R.name === c.value))), 1),
                l("div", bb, [
                  l("label", vb, [
                    l("span", null, o(a(n).label("Provider 名称", "Provider name")), 1),
                    ke(l("input", {
                      "onUpdate:modelValue": y[2] || (y[2] = (R) => g.name = R),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [Ue, g.name]
                    ])
                  ]),
                  l("label", yb, [
                    y[8] || (y[8] = l("span", null, "Base URL", -1)),
                    ke(l("input", {
                      "onUpdate:modelValue": y[3] || (y[3] = (R) => g.baseUrl = R),
                      class: "settings-input",
                      type: "text"
                    }, null, 512), [
                      [Ue, g.baseUrl]
                    ])
                  ]),
                  l("label", wb, [
                    l("span", null, o(a(n).label("默认 API 类型", "Default API type")), 1),
                    ke(l("select", {
                      "onUpdate:modelValue": y[4] || (y[4] = (R) => g.apiType = R),
                      class: "settings-input"
                    }, [
                      (_(), v(Y, null, ye(t, (R) => l("option", {
                        key: R,
                        value: R
                      }, o(R), 9, kb)), 64))
                    ], 512), [
                      [_t, g.apiType]
                    ])
                  ]),
                  l("label", $b, [
                    y[9] || (y[9] = l("span", null, "API Key", -1)),
                    l("small", null, o(g.apiKeyHelp), 1),
                    ke(l("input", {
                      "onUpdate:modelValue": y[5] || (y[5] = (R) => g.apiKey = R),
                      class: "settings-input",
                      type: "password"
                    }, null, 512), [
                      [Ue, g.apiKey]
                    ])
                  ]),
                  l("label", Sb, [
                    l("span", null, o(a(n).label("模型列表", "Model list")), 1),
                    l("small", null, o(a(n).label("每行格式：id | 名称 | contextWindow | maxTokens | api", "One line per model: id | name | contextWindow | maxTokens | api")), 1),
                    ke(l("textarea", {
                      "onUpdate:modelValue": y[6] || (y[6] = (R) => g.modelsText = R),
                      class: "settings-textarea",
                      rows: "8"
                    }, null, 512), [
                      [Ue, g.modelsText]
                    ])
                  ])
                ]),
                l("div", Cb, [
                  l("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    disabled: d.value,
                    onClick: H
                  }, o(d.value ? a(n).label("保存中…", "Saving…") : a(n).label("保存 Provider", "Save provider")), 9, xb),
                  l("button", {
                    class: "inline-link",
                    type: "button",
                    onClick: y[7] || (y[7] = (R) => I(c.value))
                  }, o(a(n).label("恢复当前内容", "Reset draft")), 1),
                  g.canDelete ? (_(), v("button", {
                    key: 0,
                    class: "inline-link inline-link--danger",
                    type: "button",
                    disabled: h.value,
                    onClick: L
                  }, o(h.value ? a(n).label("删除中…", "Deleting…") : a(n).label("删除 Provider", "Delete provider")), 9, Rb)) : re("", !0)
                ])
              ]),
              _: 1
            }, 8, ["title"]),
            ee(ie, {
              title: a(n).label("已配置 Provider", "Configured providers"),
              eyebrow: "Overview"
            }, {
              default: ae(() => [
                l("div", Eb, [
                  (_(!0), v(Y, null, ye(a(r).data.config.providers, (R) => (_(), v("article", {
                    key: R.name,
                    class: "provider-card"
                  }, [
                    l("header", Tb, [
                      l("div", null, [
                        l("strong", null, o(R.name), 1),
                        l("p", null, o(R.baseUrl), 1)
                      ]),
                      l("div", Ab, [
                        R.hasApiKey ? (_(), v("span", Pb, o(a(n).label("有密钥", "Has key")), 1)) : (_(), v("span", Mb, o(a(n).label("无密钥", "No key")), 1))
                      ])
                    ]),
                    l("div", Ob, [
                      (_(!0), v(Y, null, ye(R.models, (A) => (_(), v("div", {
                        key: A.fullId,
                        class: "mini-list__item"
                      }, [
                        l("div", null, [
                          l("strong", null, o(A.name), 1),
                          l("p", null, o(A.fullId), 1)
                        ]),
                        l("div", Ib, [
                          A.isPrimary ? (_(), v("span", Nb, o(a(n).label("主模型", "Primary")), 1)) : re("", !0),
                          A.isFallback ? (_(), v("span", Db, o(a(n).label("备用", "Fallback")), 1)) : re("", !0)
                        ])
                      ]))), 128))
                    ])
                  ]))), 128))
                ])
              ]),
              _: 1
            }, 8, ["title"])
          ])
        ])
      ], 64)) : re("", !0)
    ]));
  }
});
async function Fb(e = 200, t = 80) {
  const [s, n] = await Promise.all([
    Ee(`/api/notifications?limit=${encodeURIComponent(String(e))}`),
    Ee(`/api/activity?limit=${encodeURIComponent(String(t))}`)
  ]);
  return {
    summary: {
      items: Array.isArray(s.items) ? s.items : [],
      total: s.total || 0,
      unread: s.unread || 0,
      read: s.read || 0
    },
    events: Array.isArray(n.events) ? n.events : []
  };
}
function Ub(e, t) {
  return Ve("/api/notifications/read", { id: e, read: t });
}
function Vb(e) {
  return Ve("/api/notifications/bulk", { action: e });
}
const Gb = { class: "page-stack" }, Bb = { class: "page-header" }, Hb = { class: "page-header__eyebrow" }, Wb = { class: "page-header__title" }, jb = { class: "page-header__description" }, Kb = {
  key: 0,
  class: "page-empty"
}, zb = {
  key: 1,
  class: "page-empty page-empty--error"
}, qb = { class: "stat-grid" }, Jb = { class: "stat-card" }, Qb = { class: "stat-card__label" }, Yb = { class: "stat-card" }, Zb = { class: "stat-card__label" }, Xb = { class: "stat-card" }, ev = { class: "stat-card__label" }, tv = { class: "stat-card" }, sv = { class: "stat-card__label" }, nv = {
  key: 0,
  class: "status-banner status-banner--warning"
}, lv = { class: "control-grid" }, av = { class: "settings-field" }, iv = ["placeholder"], ov = { class: "settings-field" }, rv = { value: "all" }, cv = ["value"], uv = { class: "settings-field" }, dv = ["value"], fv = { class: "pill-row" }, pv = { class: "page-actions" }, hv = ["disabled"], gv = ["disabled"], _v = ["disabled"], mv = ["disabled"], bv = {
  key: 0,
  class: "muted-copy"
}, vv = {
  key: 0,
  class: "timeline-day-stack"
}, yv = { class: "timeline-day-header" }, wv = { class: "provider-stack" }, kv = { class: "provider-card__header" }, $v = { class: "pill-row" }, Sv = { class: "pill-row" }, Cv = { class: "pill pill--info" }, xv = { class: "pill pill--muted" }, Rv = { class: "page-actions" }, Ev = ["disabled", "onClick"], Tv = ["disabled", "onClick"], Av = {
  key: 1,
  class: "page-empty"
}, Pv = {
  key: 2,
  class: "pagination-bar"
}, Mv = { class: "muted-copy" }, Ov = { class: "page-actions" }, Iv = ["disabled"], Nv = ["disabled"], Dv = {
  key: 0,
  class: "provider-stack"
}, Lv = { class: "provider-card__header" }, Fv = { class: "pill pill--info" }, Uv = {
  key: 0,
  class: "muted-copy"
}, Vv = {
  key: 1,
  class: "page-empty"
}, Gv = /* @__PURE__ */ Ge({
  __name: "NotificationsPage",
  setup(e) {
    let t = null;
    const s = qe(), n = ut(), i = /* @__PURE__ */ j("reminders"), r = /* @__PURE__ */ j(""), c = /* @__PURE__ */ j("all"), u = /* @__PURE__ */ j("all"), d = /* @__PURE__ */ j(20), h = /* @__PURE__ */ j(1), f = /* @__PURE__ */ j(""), p = /* @__PURE__ */ j(""), g = /* @__PURE__ */ j(""), m = ct(() => Fb(), t, { immediate: !1 }), k = [10, 20, 50], E = K(() => [
      { id: "reminders", label: s.label("提醒", "Reminders") },
      { id: "timeline", label: s.label("时间线", "Timeline") }
    ]), $ = K(() => {
      var M;
      return ((M = m.data) == null ? void 0 : M.summary.items) || [];
    }), I = K(() => {
      var M;
      return ((M = m.data) == null ? void 0 : M.events) || [];
    }), x = K(() => $.value.filter((M) => M.severity === "warning" || M.severity === "error").length), H = K(() => $.value.filter((M) => M.severity === "success").length), L = K(() => Array.from(new Set($.value.map((M) => M.source).filter(Boolean))).sort()), Z = K(() => {
      const M = r.value.trim().toLowerCase();
      return $.value.filter((z) => u.value === "unread" && z.read || u.value === "warning" && z.severity !== "warning" && z.severity !== "error" || u.value === "success" && z.severity !== "success" || c.value !== "all" && z.source !== c.value ? !1 : M ? [
        z.title,
        z.message,
        z.type,
        z.source,
        JSON.stringify(z.meta || {})
      ].join(" ").toLowerCase().includes(M) : !0);
    }), V = K(() => Math.max(1, Math.ceil(Z.value.length / d.value))), T = K(() => {
      const M = (h.value - 1) * d.value;
      return Z.value.slice(M, M + d.value);
    }), y = K(() => {
      var z;
      const M = /* @__PURE__ */ new Map();
      for (const se of T.value) {
        const Te = se.createdAt ? se.createdAt.slice(0, 10) : "unknown";
        M.has(Te) || M.set(Te, {
          key: Te,
          label: R(se.createdAt),
          items: []
        }), (z = M.get(Te)) == null || z.items.push(se);
      }
      return Array.from(M.values());
    });
    Oe(() => m.data, (M) => {
      M && (t = M);
    }), Oe([r, c, u, d, i], () => {
      h.value = 1;
    }), Oe(V, (M) => {
      h.value > M && (h.value = M);
    }), Ye(() => {
      m.execute({ silent: !!m.data });
    });
    function R(M) {
      if (!M) return s.label("未知日期", "Unknown date");
      const z = Date.parse(M);
      return Number.isFinite(z) ? new Intl.DateTimeFormat(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(z)) : M;
    }
    function A(M) {
      return M === "success" ? "pill--success" : M === "warning" ? "pill--warning" : M === "error" ? "pill--danger" : "pill--info";
    }
    function ce(M) {
      return M === "success" ? s.label("成功", "Success") : M === "warning" ? s.label("警告", "Warning") : M === "error" ? s.label("异常", "Error") : s.label("提示", "Info");
    }
    function oe(M) {
      const se = {
        cron: { zh: "自动化", en: "Automation" },
        recovery: { zh: "备份与恢复", en: "Backup & Recovery" },
        git: { zh: "Git", en: "Git" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" },
        openclaw: { zh: "OpenClaw", en: "OpenClaw" },
        security: { zh: "安全", en: "Security" }
      }[M];
      return se ? s.label(se.zh, se.en) : M || s.label("系统提醒", "System reminder");
    }
    function he(M) {
      const se = {
        "session-started": { zh: "会话启动", en: "Session started" },
        "session-updated": { zh: "会话更新", en: "Session updated" },
        "session-ended": { zh: "会话结束", en: "Session ended" },
        "runtime-warning": { zh: "运行告警", en: "Runtime warning" },
        "cron-run": { zh: "自动化执行", en: "Automation run" },
        "git-sync": { zh: "备份与恢复", en: "Backup & Recovery" }
      }[M];
      return se ? s.label(se.zh, se.en) : M || s.label("系统事件", "System event");
    }
    function Re(M) {
      return M ? M === "cron-ui" ? s.label("Cron 管理", "Cron management") : M === "openclaw" ? "OpenClaw" : M === "guard-ui" ? "Guard UI" : M : s.label("未知来源", "Unknown source");
    }
    function Le(M) {
      return [M.agentId, M.modelId, M.status].filter(Boolean).join(" · ");
    }
    function $e(M) {
      if (!m.data) return;
      const z = {
        ...m.data,
        summary: {
          items: Array.isArray(M.items) ? M.items : [],
          total: M.total || 0,
          unread: M.unread || 0,
          read: M.read || 0
        }
      };
      m.data = z, t = z;
    }
    async function P() {
      await m.execute({ silent: !!m.data });
    }
    async function S(M) {
      const z = !M.read;
      f.value = M.id;
      try {
        const se = await Ub(M.id, z);
        $e(se.summary), n.pushToast({
          tone: se.success ? "success" : "error",
          message: se.success ? z ? s.label("已标记为已读。", "Marked as read.") : s.label("已重新标记为未读。", "Marked as unread again.") : s.label("更新提醒状态失败。", "Failed to update the reminder state.")
        });
      } catch (se) {
        n.pushToast({
          tone: "error",
          message: se instanceof Error ? se.message : String(se)
        });
      } finally {
        f.value = "";
      }
    }
    async function B(M) {
      if (!(M === "clear-all" && !await n.confirm({
        title: s.label("清空全部通知", "Clear all reminders"),
        message: s.label("确认清空全部提醒吗？这个操作不可撤销。", "Clear all reminders? This action cannot be undone."),
        confirmLabel: s.label("确认清空", "Clear all"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      }))) {
        p.value = M;
        try {
          const z = await Vb(M);
          $e(z.summary), n.pushToast({
            tone: z.success ? "success" : "error",
            message: z.message
          });
        } catch (z) {
          n.pushToast({
            tone: "error",
            message: z instanceof Error ? z.message : String(z)
          });
        } finally {
          p.value = "";
        }
      }
    }
    async function Se(M) {
      var z;
      if (!(typeof navigator > "u" || !((z = navigator.clipboard) != null && z.writeText))) {
        g.value = M.id;
        try {
          await navigator.clipboard.writeText(JSON.stringify(M, null, 2)), n.pushToast({
            tone: "success",
            message: s.label("提醒详情已复制。", "The reminder details have been copied.")
          });
        } finally {
          g.value = "";
        }
      }
    }
    return (M, z) => (_(), v("div", Gb, [
      l("header", Bb, [
        l("div", null, [
          l("p", Hb, o(a(s).label("通知 / Fourth slice", "Notifications / Fourth slice")), 1),
          l("h2", Wb, o(a(s).label("提醒与时间线", "Reminders & timeline")), 1),
          l("p", jb, o(a(s).label("把原来分散的提醒和活动时间线收回同一页里，默认先给普通用户看到可处理的提醒，切换到时间线再回看系统最近发生了什么。", "Bring reminders and the activity feed back into one page, so users first see what needs action and then switch to the timeline to review what the system has been doing.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: P
        }, o(a(m).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      ee(Cn, {
        items: E.value,
        "active-id": i.value,
        onChange: z[0] || (z[0] = (se) => i.value = se)
      }, null, 8, ["items", "active-id"]),
      a(m).loading && !a(m).data ? (_(), v("div", Kb, o(a(s).label("正在读取提醒与时间线…", "Loading reminders and timeline events…")), 1)) : a(m).error && !a(m).data ? (_(), v("div", zb, o(a(m).error), 1)) : a(m).data ? (_(), v(Y, { key: 2 }, [
        ee(ie, {
          title: a(s).label("当前概览", "Current overview"),
          eyebrow: "Overview"
        }, {
          default: ae(() => [
            l("div", qb, [
              l("article", Jb, [
                l("p", Qb, o(a(s).label("提醒总数", "Total reminders")), 1),
                l("strong", null, o(a(_e)(a(m).data.summary.total)), 1),
                l("span", null, o(a(s).label("包含已读与未读提醒", "Includes both read and unread reminders")), 1)
              ]),
              l("article", Yb, [
                l("p", Zb, o(a(s).label("待处理", "Needs attention")), 1),
                l("strong", null, o(a(_e)(a(m).data.summary.unread)), 1),
                l("span", null, o(a(s).label("建议先处理这些未读提醒", "Start with these unread reminders")), 1)
              ]),
              l("article", Xb, [
                l("p", ev, o(a(s).label("告警提醒", "Warnings / errors")), 1),
                l("strong", null, o(a(_e)(x.value)), 1),
                l("span", null, o(a(s).label("包含 warning 与 error 两种严重级别", "Counts both warning and error severity")), 1)
              ]),
              l("article", tv, [
                l("p", sv, o(a(s).label("时间线事件", "Timeline events")), 1),
                l("strong", null, o(a(_e)(I.value.length)), 1),
                l("span", null, o(a(s).label("最近活动会从这里回放", "Recent system activity is replayed here")), 1)
              ])
            ]),
            a(m).error ? (_(), v("div", nv, o(a(s).label("已保留上一版成功结果，同时后台刷新失败：", "The last successful result is still on screen, but the background refresh failed: ")) + o(a(m).error), 1)) : re("", !0)
          ]),
          _: 1
        }, 8, ["title"]),
        i.value === "reminders" ? (_(), v(Y, { key: 0 }, [
          ee(ie, {
            title: a(s).label("筛选与批量操作", "Filters & bulk actions"),
            eyebrow: "Controls"
          }, {
            default: ae(() => [
              l("div", lv, [
                l("label", av, [
                  l("span", null, o(a(s).label("搜索", "Search")), 1),
                  ke(l("input", {
                    "onUpdate:modelValue": z[1] || (z[1] = (se) => r.value = se),
                    class: "settings-input",
                    type: "text",
                    placeholder: a(s).label("搜索标题、消息、来源", "Search title, message, or source")
                  }, null, 8, iv), [
                    [Ue, r.value]
                  ])
                ]),
                l("label", ov, [
                  l("span", null, o(a(s).label("来源", "Source")), 1),
                  ke(l("select", {
                    "onUpdate:modelValue": z[2] || (z[2] = (se) => c.value = se),
                    class: "settings-input"
                  }, [
                    l("option", rv, o(a(s).label("全部来源", "All sources")), 1),
                    (_(!0), v(Y, null, ye(L.value, (se) => (_(), v("option", {
                      key: se,
                      value: se
                    }, o(Re(se)), 9, cv))), 128))
                  ], 512), [
                    [_t, c.value]
                  ])
                ]),
                l("label", uv, [
                  l("span", null, o(a(s).label("每页显示", "Per page")), 1),
                  ke(l("select", {
                    "onUpdate:modelValue": z[3] || (z[3] = (se) => d.value = se),
                    class: "settings-input"
                  }, [
                    (_(), v(Y, null, ye(k, (se) => l("option", {
                      key: se,
                      value: se
                    }, o(a(s).label(`${se} 条`, `${se}`)), 9, dv)), 64))
                  ], 512), [
                    [_t, d.value]
                  ])
                ])
              ]),
              l("div", fv, [
                l("button", {
                  class: pe(["pill-button", { "pill-button--active": u.value === "all" }]),
                  type: "button",
                  onClick: z[4] || (z[4] = (se) => u.value = "all")
                }, o(a(s).label(`全部 (${a(m).data.summary.total})`, `All (${a(m).data.summary.total})`)), 3),
                l("button", {
                  class: pe(["pill-button", { "pill-button--active": u.value === "unread" }]),
                  type: "button",
                  onClick: z[5] || (z[5] = (se) => u.value = "unread")
                }, o(a(s).label(`未读 (${a(m).data.summary.unread})`, `Unread (${a(m).data.summary.unread})`)), 3),
                l("button", {
                  class: pe(["pill-button", { "pill-button--active": u.value === "warning" }]),
                  type: "button",
                  onClick: z[6] || (z[6] = (se) => u.value = "warning")
                }, o(a(s).label(`警告 (${x.value})`, `Warning (${x.value})`)), 3),
                l("button", {
                  class: pe(["pill-button", { "pill-button--active": u.value === "success" }]),
                  type: "button",
                  onClick: z[7] || (z[7] = (se) => u.value = "success")
                }, o(a(s).label(`成功 (${H.value})`, `Success (${H.value})`)), 3)
              ]),
              l("div", pv, [
                l("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "read-all",
                  onClick: z[8] || (z[8] = (se) => B("read-all"))
                }, o(p.value === "read-all" ? a(s).label("处理中…", "Working…") : a(s).label("全部标记为已读", "Mark all as read")), 9, hv),
                l("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "unread-all",
                  onClick: z[9] || (z[9] = (se) => B("unread-all"))
                }, o(p.value === "unread-all" ? a(s).label("处理中…", "Working…") : a(s).label("全部重新标记为未读", "Mark all as unread")), 9, gv),
                l("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: p.value === "clear-read",
                  onClick: z[10] || (z[10] = (se) => B("clear-read"))
                }, o(p.value === "clear-read" ? a(s).label("处理中…", "Working…") : a(s).label("清空已读提醒", "Clear read reminders")), 9, _v),
                l("button", {
                  class: "inline-link inline-link--danger",
                  type: "button",
                  disabled: p.value === "clear-all",
                  onClick: z[11] || (z[11] = (se) => B("clear-all"))
                }, o(p.value === "clear-all" ? a(s).label("处理中…", "Working…") : a(s).label("清空全部提醒", "Clear all reminders")), 9, mv)
              ]),
              a(s).developerMode ? re("", !0) : (_(), v("p", bv, o(a(s).label("原始提醒详情复制已收纳到开发者模式里。若要导出 JSON 详情排障，请先到 Settings 打开开发者模式。", "Raw reminder-detail copy now stays behind developer mode. Enable it from Settings if you need the JSON payload for troubleshooting.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(s).label("提醒列表", "Reminder list"),
            eyebrow: "Reminders"
          }, {
            default: ae(() => [
              Z.value.length ? (_(), v("div", vv, [
                (_(!0), v(Y, null, ye(y.value, (se) => (_(), v("section", {
                  key: se.key,
                  class: "timeline-day-group"
                }, [
                  l("div", yv, [
                    l("strong", null, o(se.label), 1),
                    l("span", null, o(a(s).label(`${se.items.length} 条提醒`, `${se.items.length} reminders`)), 1)
                  ]),
                  l("div", wv, [
                    (_(!0), v(Y, null, ye(se.items, (Te) => (_(), v("article", {
                      key: Te.id,
                      class: "provider-card"
                    }, [
                      l("header", kv, [
                        l("div", null, [
                          l("strong", null, o(Te.title || a(s).label("系统提醒", "System reminder")), 1),
                          l("p", null, o(a(it)(Te.createdAt)), 1)
                        ]),
                        l("div", $v, [
                          l("span", {
                            class: pe(["pill", A(Te.severity)])
                          }, o(ce(Te.severity)), 3),
                          l("span", {
                            class: pe(["pill", Te.read ? "pill--muted" : "pill--warning"])
                          }, o(Te.read ? a(s).label("已读", "Read") : a(s).label("未读", "Unread")), 3)
                        ])
                      ]),
                      l("p", null, o(Te.message), 1),
                      l("div", Sv, [
                        l("span", Cv, o(Re(Te.source)), 1),
                        l("span", xv, o(oe(Te.type)), 1)
                      ]),
                      l("div", Rv, [
                        l("button", {
                          class: "inline-link",
                          type: "button",
                          disabled: f.value === Te.id,
                          onClick: (dt) => S(Te)
                        }, o(f.value === Te.id ? a(s).label("处理中…", "Working…") : Te.read ? a(s).label("重新标记为未读", "Mark as unread") : a(s).label("标记为已读", "Mark as read")), 9, Ev),
                        a(s).developerMode ? (_(), v("button", {
                          key: 0,
                          class: "inline-link",
                          type: "button",
                          disabled: g.value === Te.id,
                          onClick: (dt) => Se(Te)
                        }, o(g.value === Te.id ? a(s).label("复制中…", "Copying…") : a(s).label("复制详情", "Copy details")), 9, Tv)) : re("", !0)
                      ])
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (_(), v("div", Av, o(a(s).label("当前筛选条件下没有匹配的提醒。", "No reminders match the current filters.")), 1)),
              Z.value.length ? (_(), v("div", Pv, [
                l("p", Mv, o(a(s).label(
                  `当前第 ${h.value} / ${V.value} 页，共 ${Z.value.length} 条提醒`,
                  `Page ${h.value} of ${V.value}, ${Z.value.length} reminders total`
                )), 1),
                l("div", Ov, [
                  l("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: h.value <= 1,
                    onClick: z[12] || (z[12] = (se) => h.value -= 1)
                  }, o(a(s).label("上一页", "Previous")), 9, Iv),
                  l("button", {
                    class: "inline-link",
                    type: "button",
                    disabled: h.value >= V.value,
                    onClick: z[13] || (z[13] = (se) => h.value += 1)
                  }, o(a(s).label("下一页", "Next")), 9, Nv)
                ])
              ])) : re("", !0)
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (_(), ze(ie, {
          key: 1,
          title: a(s).label("最近时间线", "Recent timeline"),
          eyebrow: "Timeline"
        }, {
          default: ae(() => [
            I.value.length ? (_(), v("div", Dv, [
              (_(!0), v(Y, null, ye(I.value, (se) => (_(), v("article", {
                key: se.id,
                class: "provider-card"
              }, [
                l("header", Lv, [
                  l("div", null, [
                    l("strong", null, o(se.title || a(s).label("系统事件", "System event")), 1),
                    l("p", null, o(a(it)(se.createdAt)), 1)
                  ]),
                  l("span", Fv, o(he(se.type)), 1)
                ]),
                l("p", null, o(se.description), 1),
                Le(se) ? (_(), v("p", Uv, o(Le(se)), 1)) : re("", !0)
              ]))), 128))
            ])) : (_(), v("div", Vv, o(a(s).label("时间线里还没有新的记录。", "No timeline events are available yet.")), 1))
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : re("", !0)
    ]));
  }
}), Bv = { class: "page-stack" }, Hv = { class: "page-header" }, Wv = { class: "page-header__eyebrow" }, jv = { class: "page-header__title" }, Kv = { class: "page-header__description" }, zv = {
  key: 0,
  class: "page-empty"
}, qv = {
  key: 1,
  class: "page-empty page-empty--error"
}, Jv = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Qv = { class: "stat-grid" }, Yv = { class: "stat-card" }, Zv = { class: "stat-card__label" }, Xv = { class: "stat-card" }, ey = { class: "stat-card__label" }, ty = { class: "stat-card" }, sy = { class: "stat-card__label" }, ny = { class: "stat-card" }, ly = { class: "stat-card__label" }, ay = { class: "muted-copy" }, iy = { class: "code-panel" }, oy = { class: "code-panel" }, ry = { class: "muted-copy" }, cy = /* @__PURE__ */ Ge({
  __name: "OpenClawPage",
  setup(e) {
    let t = null;
    const s = qe(), n = ct(() => ig(), t, { immediate: !1 }), i = K(() => {
      var m;
      return (m = n.data) != null && m.status && typeof n.data.status == "object" ? n.data.status : {};
    }), r = K(() => {
      var m;
      return (m = n.data) != null && m.targets && typeof n.data.targets == "object" ? n.data.targets : {};
    }), c = K(() => i.value.installed ? String(i.value.version || s.label("已安装", "Installed")) : s.label("未安装", "Not installed")), u = K(() => String(i.value.detectedSource || s.label("待检测", "Pending detection"))), d = K(() => String(i.value.effectiveUpdater || i.value.installKind || "-")), h = K(() => String(i.value.updateChannel || "-")), f = K(() => String(i.value.latestVersion || "-")), p = K(() => i.value.installed ? i.value.updateAvailable ? s.label("当前检测到可更新版本，后续会在这里接上推荐更新与快速回退。", "An update is available. This page will next gain recommended update and quick rollback actions.") : s.label("当前版本看起来已稳定，可继续检查渠道、模型或备份与恢复设置。", "The current version looks stable. You can continue with channels, models, or backup and recovery setup.") : s.label("先完成安装或修复，再进入版本管理。", "Install or repair OpenClaw first before managing versions."));
    function g(m) {
      return JSON.stringify(m, null, 2);
    }
    return Oe(() => n.data, (m) => {
      m && (t = m);
    }), Ye(() => {
      n.execute({ silent: !!n.data });
    }), (m, k) => (_(), v("div", Bv, [
      l("header", Hv, [
        l("div", null, [
          l("p", Wv, o(a(s).label("OpenClaw", "OpenClaw")), 1),
          l("h2", jv, o(a(s).label("OpenClaw 生命周期面板", "OpenClaw lifecycle panel")), 1),
          l("p", Kv, o(a(s).label("先给出当前安装、更新方式和推荐下一步；只有在开发者模式下才显示原始状态。", "Start with the current install state, update strategy, and the best next step. Raw state stays behind developer mode.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: k[0] || (k[0] = (E) => a(n).execute({ silent: !0 }))
        }, o(a(n).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      a(n).loading && !a(n).data ? (_(), v("div", zv, o(a(s).label("正在加载 OpenClaw 状态…", "Loading the OpenClaw status…")), 1)) : a(n).error && !a(n).data ? (_(), v("div", qv, o(a(n).error), 1)) : a(n).data ? (_(), v(Y, { key: 2 }, [
        a(n).error ? (_(), v("div", Jv, o(a(s).label("已保留上一版 OpenClaw 快照，但后台刷新失败：", "The last OpenClaw snapshot is still on screen, but the background refresh failed: ")) + o(a(n).error), 1)) : re("", !0),
        ee(ie, {
          title: a(s).label("当前状态", "Current status"),
          eyebrow: "Status"
        }, {
          default: ae(() => [
            l("div", Qv, [
              l("article", Yv, [
                l("p", Zv, o(a(s).label("安装状态", "Install state")), 1),
                l("strong", null, o(c.value), 1),
                l("span", null, o(u.value), 1)
              ]),
              l("article", Xv, [
                l("p", ey, o(a(s).label("更新方式", "Update strategy")), 1),
                l("strong", null, o(d.value), 1),
                l("span", null, o(a(s).label("来源与更新引擎由当前探测结果决定。", "The source and updater come from the current detection result.")), 1)
              ]),
              l("article", ty, [
                l("p", sy, o(a(s).label("渠道", "Channel")), 1),
                l("strong", null, o(h.value), 1),
                l("span", null, o(a(s).label("当前可见的推荐更新渠道。", "The currently visible recommended update channel.")), 1)
              ]),
              l("article", ny, [
                l("p", ly, o(a(s).label("最新版本", "Latest version")), 1),
                l("strong", null, o(f.value), 1),
                l("span", null, o(a(s).label("当远端能检测到版本信息时会显示在这里。", "When the remote version can be resolved, it appears here.")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        ee(ie, {
          title: a(s).label("建议下一步", "Suggested next step"),
          eyebrow: "Next"
        }, {
          default: ae(() => [
            l("div", {
              class: pe(["status-banner", { "status-banner--warning": i.value.updateAvailable === !0 }])
            }, [
              l("div", null, [
                l("strong", null, o(a(s).label("推荐动作", "Recommended action")), 1),
                l("p", ay, o(p.value), 1)
              ])
            ], 2)
          ]),
          _: 1
        }, 8, ["title"]),
        a(s).developerMode ? (_(), ze(ie, {
          key: 1,
          title: a(s).label("原始状态快照", "Raw status snapshot"),
          eyebrow: "Developer"
        }, {
          default: ae(() => [
            l("pre", iy, o(g(i.value)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : re("", !0),
        a(s).developerMode ? (_(), ze(ie, {
          key: 2,
          title: a(s).label("原始目标目录", "Raw targets catalog"),
          eyebrow: "Developer"
        }, {
          default: ae(() => [
            l("pre", oy, o(g(r.value)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : (_(), ze(ie, {
          key: 3,
          title: a(s).label("开发者模式", "Developer mode"),
          eyebrow: "Developer"
        }, {
          default: ae(() => [
            l("p", ry, o(a(s).label("如果需要查看 OpenClaw 的原始 JSON、目标目录和诊断区，请先到 Settings 里开启开发者模式。", "If you need the raw OpenClaw JSON, target catalog, and diagnostic views, enable developer mode from Settings first.")), 1)
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : re("", !0)
    ]));
  }
}), uy = { class: "page-stack" }, dy = { class: "page-header" }, fy = { class: "page-header__eyebrow" }, py = { class: "page-header__title" }, hy = { class: "page-header__description" }, gy = {
  key: 0,
  class: "page-empty"
}, _y = {
  key: 1,
  class: "page-empty page-empty--error"
}, my = {
  key: 0,
  class: "status-banner status-banner--warning"
}, by = { class: "stat-grid" }, vy = { class: "stat-card" }, yy = { class: "stat-card__label" }, wy = { class: "stat-card" }, ky = { class: "stat-card__label" }, $y = { class: "stat-card" }, Sy = { class: "stat-card__label" }, Cy = { class: "stat-card" }, xy = { class: "stat-card__label" }, Ry = { class: "muted-copy" }, Ey = { class: "code-panel" }, Ty = { class: "code-panel" }, Ay = { class: "muted-copy" }, Py = /* @__PURE__ */ Ge({
  __name: "OperationsPage",
  setup(e) {
    let t = null;
    const s = qe(), n = ct(() => ag(), t, { immediate: !1 }), i = K(() => {
      var m;
      return (m = n.data) != null && m.webReport && typeof n.data.webReport == "object" ? n.data.webReport : {};
    }), r = K(() => {
      var m;
      return (m = n.data) != null && m.services && typeof n.data.services == "object" ? n.data.services : {};
    }), c = K(() => Object.entries(r.value)), u = K(() => i.value.running === !0 ? s.label("运行中", "Running") : s.label("未运行", "Stopped")), d = K(() => String(i.value.primaryUrl || "-")), h = K(() => String(i.value.workbenchUrl || "-")), f = K(() => String(i.value.nextAction || "-")), p = K(() => {
      const m = i.value.pid, k = i.value.port;
      return !m && !k ? "-" : m && k ? `PID ${m} · ${s.label("端口", "Port")} ${k}` : m ? `PID ${m}` : `${s.label("端口", "Port")} ${k}`;
    });
    function g(m) {
      return JSON.stringify(m, null, 2);
    }
    return Oe(() => n.data, (m) => {
      m && (t = m);
    }), Ye(() => {
      n.execute({ silent: !!n.data });
    }), (m, k) => (_(), v("div", uy, [
      l("header", dy, [
        l("div", null, [
          l("p", fy, o(a(s).label("运维 / First slice", "Operations / First slice")), 1),
          l("h2", py, o(a(s).label("运行态与后台服务", "Runtime and background services")), 1),
          l("p", hy, o(a(s).label("先把运行状态、访问地址和后台托管信息迁进新壳层，原始快照只在开发者模式下显示。", "Bring runtime status, access URLs, and managed background details into the new shell first. Raw snapshots stay behind developer mode.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: k[0] || (k[0] = (E) => a(n).execute({ silent: !0 }))
        }, o(a(n).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      a(n).loading && !a(n).data ? (_(), v("div", gy, o(a(s).label("正在加载运维状态…", "Loading operations status…")), 1)) : a(n).error && !a(n).data ? (_(), v("div", _y, o(a(n).error), 1)) : a(n).data ? (_(), v(Y, { key: 2 }, [
        a(n).error ? (_(), v("div", my, o(a(s).label("已保留上一版运维快照，但后台刷新失败：", "The last operations snapshot is still on screen, but the background refresh failed: ")) + o(a(n).error), 1)) : re("", !0),
        ee(ie, {
          title: a(s).label("运行摘要", "Runtime summary"),
          eyebrow: "Summary"
        }, {
          default: ae(() => [
            l("div", by, [
              l("article", vy, [
                l("p", yy, o(a(s).label("Guard Web", "Guard Web")), 1),
                l("strong", null, o(u.value), 1),
                l("span", null, o(String(i.value.source || "-")), 1)
              ]),
              l("article", wy, [
                l("p", ky, o(a(s).label("访问地址", "Access URL")), 1),
                l("strong", null, o(d.value), 1),
                l("span", null, o(h.value), 1)
              ]),
              l("article", $y, [
                l("p", Sy, o(a(s).label("后台进程", "Background process")), 1),
                l("strong", null, o(p.value), 1),
                l("span", null, o(i.value.managed === !0 ? a(s).label("当前由 Guard 托管", "Currently managed by Guard") : a(s).label("当前不是 Guard 托管进程", "This process is not managed by Guard")), 1)
              ]),
              l("article", Cy, [
                l("p", xy, o(a(s).label("服务快照", "Service snapshot")), 1),
                l("strong", null, o(c.value.length), 1),
                l("span", null, o(a(s).label("当前接口返回的服务条目数", "Number of service entries returned by the current API")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        ee(ie, {
          title: a(s).label("建议下一步", "Suggested next step"),
          eyebrow: "Guide"
        }, {
          default: ae(() => [
            l("div", {
              class: pe(["status-banner", { "status-banner--warning": i.value.running !== !0 }])
            }, [
              l("div", null, [
                l("strong", null, o(a(s).label("下一步", "Next step")), 1),
                l("p", Ry, o(f.value), 1)
              ])
            ], 2)
          ]),
          _: 1
        }, 8, ["title"]),
        a(s).developerMode ? (_(), ze(ie, {
          key: 1,
          title: a(s).label("后台 Web 报告", "Background web report"),
          eyebrow: "Developer"
        }, {
          default: ae(() => [
            l("pre", Ey, o(g(a(n).data.webReport)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : re("", !0),
        a(s).developerMode ? (_(), ze(ie, {
          key: 2,
          title: a(s).label("服务状态原始快照", "Service status snapshot"),
          eyebrow: "Developer"
        }, {
          default: ae(() => [
            l("pre", Ty, o(g(a(n).data.services)), 1)
          ]),
          _: 1
        }, 8, ["title"])) : (_(), ze(ie, {
          key: 3,
          title: a(s).label("开发者模式", "Developer mode"),
          eyebrow: "Developer"
        }, {
          default: ae(() => [
            l("p", Ay, o(a(s).label("如果你需要查看原始 Web 报告、服务快照或后续的刷新诊断，请先到 Settings 打开开发者模式。", "If you need raw web reports, service snapshots, or future refresh diagnostics, enable developer mode from Settings first.")), 1)
          ]),
          _: 1
        }, 8, ["title"]))
      ], 64)) : re("", !0)
    ]));
  }
});
async function My() {
  const [e, t, s, n] = await Promise.all([
    Ee("/api/recovery/overview"),
    Ee("/api/recovery/points?limit=20"),
    Ee("/api/git-sync/status"),
    Ee("/api/git-sync/gitignore-preview?mode=smart")
  ]);
  return {
    overview: e,
    points: t.items || [],
    gitStatus: s,
    gitIgnorePreview: n
  };
}
function Oy(e) {
  return Ve("/api/recovery/save", { label: e || "" });
}
function Iy(e) {
  return Ve("/api/recovery/restore", { commitSha: e });
}
function Ny() {
  return Ve("/api/git-sync/init", {});
}
function Dy() {
  return Ve("/api/git-sync/check-private", {});
}
function Ly(e) {
  return Ve("/api/git-sync/commit", { message: "" });
}
function Fy() {
  return Ve("/api/git-sync/push", {});
}
function Uy(e) {
  return Ve("/api/git-sync/sync", { message: "" });
}
function Vy(e = "smart") {
  return Ve("/api/git-sync/gitignore-apply", { mode: e });
}
const Gy = { class: "page-stack" }, By = { class: "page-header" }, Hy = { class: "page-header__eyebrow" }, Wy = { class: "page-header__title" }, jy = { class: "page-header__description" }, Ky = {
  key: 0,
  class: "page-empty"
}, zy = {
  key: 1,
  class: "page-empty page-empty--error"
}, qy = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Jy = { class: "provider-card__header" }, Qy = { class: "muted-copy" }, Yy = { class: "stat-grid" }, Zy = { class: "stat-card" }, Xy = { class: "stat-card__label" }, e1 = { class: "stat-card" }, t1 = { class: "stat-card__label" }, s1 = { class: "stat-card" }, n1 = { class: "stat-card__label" }, l1 = { class: "stat-card" }, a1 = { class: "stat-card__label" }, i1 = { class: "list-stack" }, o1 = { class: "action-row" }, r1 = { class: "pill pill--info" }, c1 = { class: "action-row" }, u1 = { class: "pill pill--success" }, d1 = { class: "settings-grid settings-grid--wide" }, f1 = { class: "settings-field settings-field--full" }, p1 = { class: "page-actions" }, h1 = ["disabled"], g1 = {
  key: 0,
  class: "provider-stack"
}, _1 = { class: "provider-card__header" }, m1 = { class: "pill-row" }, b1 = { class: "pill pill--info" }, v1 = {
  key: 0,
  class: "muted-copy"
}, y1 = { class: "page-actions" }, w1 = ["onClick"], k1 = ["disabled", "onClick"], $1 = {
  key: 1,
  class: "page-empty"
}, S1 = { class: "muted-copy" }, C1 = { class: "page-actions" }, x1 = {
  class: "inline-link",
  href: "/#recovery",
  target: "_blank",
  rel: "noreferrer"
}, R1 = { class: "stat-grid" }, E1 = { class: "stat-card" }, T1 = { class: "stat-card__label" }, A1 = { class: "stat-card" }, P1 = { class: "stat-card__label" }, M1 = { class: "stat-card" }, O1 = { class: "stat-card__label" }, I1 = { class: "stat-card" }, N1 = { class: "stat-card__label" }, D1 = { class: "page-actions" }, L1 = ["disabled"], F1 = ["disabled"], U1 = ["disabled"], V1 = ["disabled"], G1 = ["disabled"], B1 = {
  key: 0,
  class: "muted-copy"
}, H1 = { class: "list-stack" }, W1 = { class: "action-row" }, j1 = { class: "action-row" }, K1 = { class: "action-row" }, z1 = {
  key: 0,
  class: "code-panel"
}, q1 = {
  key: 1,
  class: "muted-copy"
}, J1 = { class: "muted-copy" }, Q1 = { class: "stat-grid" }, Y1 = { class: "stat-card" }, Z1 = { class: "stat-card__label" }, X1 = { class: "stat-card" }, ew = { class: "stat-card__label" }, tw = {
  key: 0,
  class: "code-panel"
}, sw = {
  key: 1,
  class: "muted-copy"
}, nw = { class: "page-actions" }, lw = ["disabled"], aw = /* @__PURE__ */ Ge({
  __name: "RecoveryPage",
  setup(e) {
    let t = null;
    const s = qe(), n = ut(), i = /* @__PURE__ */ j("center"), r = /* @__PURE__ */ j(""), c = /* @__PURE__ */ j(""), u = /* @__PURE__ */ j(!1), d = /* @__PURE__ */ j(""), h = /* @__PURE__ */ j(""), f = ct(() => My(), t, { immediate: !1 }), p = K(() => [
      { id: "center", label: s.label("恢复中心", "Recovery center") },
      { id: "advanced", label: s.label("高级 Git", "Advanced Git") }
    ]), g = K(() => {
      var T;
      const V = (T = f.data) == null ? void 0 : T.overview;
      return V ? !V.repoReady || V.warnings.length > 0 ? "pill--warning" : V.remoteReady ? "pill--success" : "pill--info" : "pill--muted";
    });
    function m() {
      var T;
      const V = (T = f.data) == null ? void 0 : T.overview;
      return V ? V.protected ? V.remoteReady ? s.label("已上云保护", "Cloud protection ready") : s.label("当前仅本机可恢复", "Local recovery only") : s.label("尚未建立保护", "Protection not set up") : s.label("读取中", "Loading");
    }
    function k(V) {
      const y = {
        "install-git": { zh: "先安装 Git", en: "Install Git first" },
        "setup-protection": { zh: "先完成保护设置", en: "Complete protection setup first" },
        "save-first-point": { zh: "创建首个恢复点", en: "Create the first recovery point" },
        "save-current-state": { zh: "先保存当前状态", en: "Save the current state first" },
        "review-restored-state": { zh: "检查刚恢复的状态", en: "Review the restored state" },
        "connect-private-remote": { zh: "连接私有仓库", en: "Connect a private remote" },
        "sync-latest-point": { zh: "把最新保护点同步到云端", en: "Sync the latest point to the cloud" },
        protected: { zh: "当前已经受保护", en: "Protection is already in place" }
      }[V || ""];
      return y ? s.label(y.zh, y.en) : V || "-";
    }
    function E(V) {
      return V.kind === "auto" ? s.label("自动保护", "Auto protection") : V.kind === "restore" ? s.label("已恢复到此状态", "Restore point") : s.label("手动保存", "Manual save");
    }
    async function $() {
      await f.execute({ silent: !!f.data });
    }
    async function I() {
      u.value = !0;
      try {
        const V = await Oy(r.value.trim() || void 0);
        n.pushToast({
          tone: V.success ? "success" : "error",
          message: V.message
        }), V.success && (r.value = "", await $());
      } catch (V) {
        n.pushToast({
          tone: "error",
          message: V instanceof Error ? V.message : String(V)
        });
      } finally {
        u.value = !1;
      }
    }
    async function x(V) {
      if (await n.confirm({
        title: s.label("恢复到这个状态", "Restore this state"),
        message: s.label(
          `确认回到 ${V.title} 吗？Guard 会先保护当前未提交内容，再在同一主线上追加一个 restore commit，不会删除历史。`,
          `Restore ${V.title}? Guard will first protect any uncommitted changes and then add a restore commit on the same main line without deleting history.`
        ),
        confirmLabel: s.label("确认恢复", "Restore now"),
        cancelLabel: s.label("取消", "Cancel"),
        tone: "danger"
      })) {
        d.value = V.commitSha;
        try {
          const y = await Iy(V.commitSha);
          n.pushToast({
            tone: y.success ? "success" : "error",
            message: y.message
          }), await $();
        } catch (y) {
          n.pushToast({
            tone: "error",
            message: y instanceof Error ? y.message : String(y)
          });
        } finally {
          d.value = "";
        }
      }
    }
    async function H(V) {
      h.value = V, c.value = "";
      try {
        const T = V === "init" ? await Ny() : V === "private" ? await Dy() : V === "checkpoint" ? await Ly() : V === "push" ? await Fy() : V === "sync" ? await Uy() : await Vy("smart");
        c.value = T.message, n.pushToast({
          tone: T.success ? "success" : "error",
          message: T.message
        }), await $();
      } catch (T) {
        const y = T instanceof Error ? T.message : String(T);
        c.value = y, n.pushToast({
          tone: "error",
          message: y
        });
      } finally {
        h.value = "";
      }
    }
    function L(V) {
      i.value = V;
    }
    async function Z(V) {
      var T;
      typeof navigator > "u" || !((T = navigator.clipboard) != null && T.writeText) || (await navigator.clipboard.writeText(V), n.pushToast({
        tone: "success",
        message: s.label("恢复点哈希已复制。", "Recovery point hash copied.")
      }));
    }
    return Oe(() => f.data, (V) => {
      V && (t = V);
    }), Ye(() => {
      f.execute({ silent: !!f.data });
    }), (V, T) => (_(), v("div", Gy, [
      l("header", By, [
        l("div", null, [
          l("p", Hy, o(a(s).label("备份与恢复 / Second slice", "Backup & Recovery / Second slice")), 1),
          l("h2", Wy, o(a(s).label("备份与恢复", "Backup & Recovery")), 1),
          l("p", jy, o(a(s).label("默认先讲“保存现在、回到某个状态、然后继续往前走”，把 Git 细节下沉到高级视图。", "Start with save now, go back to a protected state, then keep moving forward, while pushing raw Git details into the advanced view.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: $
        }, o(a(f).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新", "Refresh")), 1)
      ]),
      ee(Cn, {
        items: p.value,
        "active-id": i.value,
        onChange: L
      }, null, 8, ["items", "active-id"]),
      a(f).loading && !a(f).data ? (_(), v("div", Ky, o(a(s).label("正在读取保护状态…", "Loading protection status…")), 1)) : a(f).error && !a(f).data ? (_(), v("div", zy, o(a(f).error), 1)) : a(f).data ? (_(), v(Y, { key: 2 }, [
        a(f).error ? (_(), v("div", qy, o(a(s).label("已保留上一版备份与恢复快照，但后台刷新失败：", "The last backup and recovery snapshot is still on screen, but the background refresh failed: ")) + o(a(f).error), 1)) : re("", !0),
        i.value === "center" ? (_(), v(Y, { key: 1 }, [
          ee(ie, {
            title: a(s).label("当前保护状态", "Current protection state"),
            eyebrow: "Overview"
          }, {
            default: ae(() => {
              var y;
              return [
                l("div", Jy, [
                  l("p", Qy, o(a(s).label("先看这里就能知道现在是否已经受保护、是否已经上云，以及下一步最建议做什么。", "Start here to see whether protection is already in place, whether it has reached the cloud, and what the next recommended action is.")), 1),
                  l("span", {
                    class: pe(["pill", g.value])
                  }, o(m()), 3)
                ]),
                l("div", Yy, [
                  l("article", Zy, [
                    l("p", Xy, o(a(s).label("当前主线", "Current branch")), 1),
                    l("strong", null, o(a(f).data.overview.currentBranch || "-"), 1),
                    l("span", null, o(a(s).label("恢复后仍会继续写在这条主线上", "Future saves continue on the same main line after a restore")), 1)
                  ]),
                  l("article", e1, [
                    l("p", t1, o(a(s).label("最近保存", "Last saved")), 1),
                    l("strong", null, o(a(it)(a(f).data.overview.lastSavedAt)), 1),
                    l("span", null, o(((y = a(f).data.overview.latestPoint) == null ? void 0 : y.title) || a(s).label("还没有恢复点", "No recovery point yet")), 1)
                  ]),
                  l("article", s1, [
                    l("p", n1, o(a(s).label("最近上云", "Last pushed")), 1),
                    l("strong", null, o(a(it)(a(f).data.overview.lastPushedAt)), 1),
                    l("span", null, o(a(f).data.overview.remoteReady ? a(s).label("云端保护已就绪", "Cloud protection is ready") : a(s).label("当前还没完成云端接线", "Cloud protection is not ready yet")), 1)
                  ]),
                  l("article", l1, [
                    l("p", a1, o(a(s).label("下一步建议", "Recommended next step")), 1),
                    l("strong", null, o(k(a(f).data.overview.nextAction)), 1),
                    l("span", null, o(a(f).data.overview.unsyncedChanges ? a(s).label("当前存在未同步变化", "There are unsynced changes right now") : a(s).label("当前没有额外待处理变化", "No extra pending changes right now")), 1)
                  ])
                ])
              ];
            }),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(s).label("下一步建议", "Recommended next actions"),
            eyebrow: "Guide"
          }, {
            default: ae(() => [
              l("div", i1, [
                l("article", o1, [
                  l("div", null, [
                    l("h3", null, o(a(s).label("先保住现在", "Protect the current state")), 1),
                    l("p", null, o(a(s).label("当你刚完成一轮配置、修复或工作区整理时，就立刻保存一个恢复点。", "Whenever you finish a round of setup, fixes, or workspace cleanup, save a recovery point right away.")), 1)
                  ]),
                  l("span", r1, o(k(a(f).data.overview.nextAction)), 1)
                ]),
                l("article", c1, [
                  l("div", null, [
                    l("h3", null, o(a(s).label("回退不会删历史", "Restoring does not delete history")), 1),
                    l("p", null, o(a(s).label("Guard 会在当前主线上追加一个 restore commit，后面的版本会继续接在它后面。", "Guard adds a restore commit on the current main line, and future versions continue after that point.")), 1)
                  ]),
                  l("span", u1, o(a(s).label("同一主线继续", "Continue on the same main line")), 1)
                ]),
                (_(!0), v(Y, null, ye(a(f).data.overview.warnings, (y) => (_(), v("article", {
                  key: y,
                  class: "risk-row"
                }, [
                  l("strong", null, o(a(s).label("注意事项", "Warning")), 1),
                  l("span", null, o(y), 1)
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(s).label("立即保存", "Save now"),
            eyebrow: "Checkpoint"
          }, {
            default: ae(() => [
              l("div", d1, [
                l("label", f1, [
                  l("span", null, o(a(s).label("恢复点说明（可选）", "Recovery point label (optional)")), 1),
                  l("small", null, o(a(s).label("不写也可以，Guard 会自动生成一个带时间的恢复点标题。", "This is optional. Guard can generate a timestamped title automatically.")), 1),
                  ke(l("input", {
                    "onUpdate:modelValue": T[0] || (T[0] = (y) => r.value = y),
                    class: "settings-input",
                    type: "text"
                  }, null, 512), [
                    [Ue, r.value]
                  ])
                ])
              ]),
              l("div", p1, [
                l("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: u.value,
                  onClick: I
                }, o(u.value ? a(s).label("保存中…", "Saving…") : a(s).label("保存当前状态", "Save current state")), 9, h1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(s).label("恢复点时间线", "Recovery point timeline"),
            eyebrow: "Timeline"
          }, {
            default: ae(() => [
              a(f).data.points.length ? (_(), v("div", g1, [
                (_(!0), v(Y, null, ye(a(f).data.points, (y) => (_(), v("article", {
                  key: y.id,
                  class: "provider-card"
                }, [
                  l("header", _1, [
                    l("div", null, [
                      l("strong", null, o(y.title), 1),
                      l("p", null, o(a(it)(y.createdAt)) + " · " + o(a(La)(y.commitSha)), 1)
                    ]),
                    l("div", m1, [
                      l("span", b1, o(E(y)), 1),
                      l("span", {
                        class: pe(["pill", y.pushed ? "pill--success" : "pill--warning"])
                      }, o(y.pushed ? a(s).label("已上云", "Synced") : a(s).label("仅本机", "Local only")), 3)
                    ])
                  ]),
                  l("p", null, o(y.summary), 1),
                  y.sourceCommitSha ? (_(), v("p", v1, o(a(s).label("来源节点：", "Source commit: ")) + o(a(La)(y.sourceCommitSha)), 1)) : re("", !0),
                  l("div", y1, [
                    l("button", {
                      class: "inline-link",
                      type: "button",
                      onClick: (R) => Z(y.commitSha)
                    }, o(a(s).label("复制节点", "Copy point")), 9, w1),
                    l("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: !y.restorable || d.value === y.commitSha,
                      onClick: (R) => x(y)
                    }, o(d.value === y.commitSha ? a(s).label("恢复中…", "Restoring…") : a(s).label("回到这个状态", "Restore this state")), 9, k1)
                  ])
                ]))), 128))
              ])) : (_(), v("div", $1, o(a(s).label("当前还没有恢复点。建议先完成一次手动保存。", "No recovery points exist yet. Create a manual save first.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : (_(), v(Y, { key: 2 }, [
          ee(ie, {
            title: a(s).label("高级 Git 入口", "Advanced Git entry"),
            eyebrow: "Advanced"
          }, {
            default: ae(() => [
              l("p", S1, o(a(s).label("这里先接入最常用的高级动作和状态读取；更复杂的远端绑定、OAuth 和专家级操作，当前阶段仍保留在正式控制台。", "This view already brings in the most common advanced actions and status reads. More complex remote binding, OAuth, and expert-level operations still stay in the production console for now.")), 1),
              l("div", C1, [
                l("a", x1, o(a(s).label("打开正式控制台中的高级 Git", "Open advanced Git in the production console")), 1)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(s).label("当前仓库状态", "Current repository status"),
            eyebrow: "Status"
          }, {
            default: ae(() => [
              l("div", R1, [
                l("article", E1, [
                  l("p", T1, o(a(s).label("仓库初始化", "Repository")), 1),
                  l("strong", null, o(a(f).data.gitStatus.repoInitialized ? a(s).label("已初始化", "Initialized") : a(s).label("未初始化", "Not initialized")), 1),
                  l("span", null, o(a(f).data.gitStatus.repoPath), 1)
                ]),
                l("article", A1, [
                  l("p", P1, o(a(s).label("远端仓库", "Remote")), 1),
                  l("strong", null, o(a(f).data.gitStatus.remoteName || "-"), 1),
                  l("span", null, o(a(f).data.gitStatus.remoteUrl || a(s).label("还没绑定远端", "No remote connected yet")), 1)
                ]),
                l("article", M1, [
                  l("p", O1, o(a(s).label("认证方式", "Auth mode")), 1),
                  l("strong", null, o(a(f).data.gitStatus.authMode || "-"), 1),
                  l("span", null, o(a(f).data.gitStatus.authConfigured ? a(s).label("当前已配置认证", "Authentication is configured") : a(s).label("当前还没配置认证", "Authentication is not configured yet")), 1)
                ]),
                l("article", I1, [
                  l("p", N1, o(a(s).label("私有检查", "Private check")), 1),
                  l("strong", null, o(a(f).data.gitStatus.repoPrivate === !0 ? a(s).label("已通过", "Passed") : a(f).data.gitStatus.repoPrivate === !1 ? a(s).label("未通过", "Failed") : a(s).label("未检查", "Pending")), 1),
                  l("span", null, o(a(f).data.gitStatus.state.lastSyncAt ? `${a(s).label("最近同步", "Last sync")} ${a(it)(a(f).data.gitStatus.state.lastSyncAt)}` : a(s).label("还没有成功同步记录", "No successful sync record yet")), 1)
                ])
              ]),
              l("div", D1, [
                l("button", {
                  class: "inline-link inline-link--primary",
                  type: "button",
                  disabled: h.value === "init",
                  onClick: T[1] || (T[1] = (y) => H("init"))
                }, o(h.value === "init" ? a(s).label("初始化中…", "Initializing…") : a(s).label("初始化保护仓库", "Initialize protection repo")), 9, L1),
                l("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "private",
                  onClick: T[2] || (T[2] = (y) => H("private"))
                }, o(h.value === "private" ? a(s).label("检查中…", "Checking…") : a(s).label("检查私有仓库", "Check private remote")), 9, F1),
                l("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "checkpoint",
                  onClick: T[3] || (T[3] = (y) => H("checkpoint"))
                }, o(h.value === "checkpoint" ? a(s).label("提交中…", "Committing…") : a(s).label("创建本地 checkpoint", "Create local checkpoint")), 9, U1),
                l("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "push",
                  onClick: T[4] || (T[4] = (y) => H("push"))
                }, o(h.value === "push" ? a(s).label("推送中…", "Pushing…") : a(s).label("推送到云端", "Push to cloud")), 9, V1),
                l("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "sync",
                  onClick: T[5] || (T[5] = (y) => H("sync"))
                }, o(h.value === "sync" ? a(s).label("同步中…", "Syncing…") : a(s).label("提交并同步", "Commit and sync")), 9, G1)
              ]),
              c.value ? (_(), v("p", B1, o(c.value), 1)) : re("", !0)
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(s).label("保护范围摘要", "Protection scope summary"),
            eyebrow: "Scope"
          }, {
            default: ae(() => [
              l("div", H1, [
                l("article", W1, [
                  l("div", null, [
                    l("h3", null, o(a(s).label("当前工作树变化", "Current worktree changes")), 1),
                    l("p", null, o(a(s).label("这些文件会进入根保护线；嵌套仓库会被单独标记，不会被误提交到根线。", "These files enter the root protection line, while nested repositories are marked separately so they are not committed into the root line by mistake.")), 1)
                  ]),
                  l("strong", null, o(a(f).data.gitStatus.changedFiles.length), 1)
                ]),
                l("article", j1, [
                  l("div", null, [
                    l("h3", null, o(a(s).label("可直接纳入保护", "Stageable in root line")), 1),
                    l("p", null, o(a(s).label("这些改动可以直接由 Guard 提交为恢复点。", "These changes can be committed directly by Guard as recovery points.")), 1)
                  ]),
                  l("strong", null, o(a(f).data.gitStatus.stageableChangedFiles.length), 1)
                ]),
                l("article", K1, [
                  l("div", null, [
                    l("h3", null, o(a(s).label("嵌套仓库", "Nested repositories")), 1),
                    l("p", null, o(a(s).label("这些目录更适合单独维护，Guard 不会在根保护线里直接接管。", "These directories are better maintained separately. Guard does not take them over inside the root protection line.")), 1)
                  ]),
                  l("strong", null, o(a(f).data.gitStatus.skippedEmbeddedRepos.length), 1)
                ])
              ]),
              a(s).developerMode ? (_(), v("pre", z1, o(JSON.stringify({
                changedFiles: a(f).data.gitStatus.changedFiles,
                stageableChangedFiles: a(f).data.gitStatus.stageableChangedFiles,
                skippedEmbeddedRepos: a(f).data.gitStatus.skippedEmbeddedRepos
              }, null, 2)), 1)) : (_(), v("p", q1, o(a(s).label("原始保护范围列表已收纳到开发者模式中。若要逐条检查 changed files 或 skipped repos，请先到 Settings 打开开发者模式。", "The raw protection-scope payload now stays behind developer mode. Enable it from Settings when you need to inspect changed files or skipped repositories one by one.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(s).label(".gitignore 建议", ".gitignore suggestions"),
            eyebrow: "Ignore rules"
          }, {
            default: ae(() => [
              l("p", J1, o(a(s).label("当检测到新的嵌套仓库时，可以先看建议块，再一键追加推荐规则。", "When Guard detects new nested repositories, review the suggestion block first and then append the recommended rules with one action.")), 1),
              l("div", Q1, [
                l("article", Y1, [
                  l("p", Z1, o(a(s).label("嵌套仓库", "Embedded repos")), 1),
                  l("strong", null, o(a(f).data.gitIgnorePreview.embeddedRepos.length), 1),
                  l("span", null, o(a(s).label("需要单独维护的子仓库", "Child repositories that should be maintained separately")), 1)
                ]),
                l("article", X1, [
                  l("p", ew, o(a(s).label("待追加规则", "Missing rules")), 1),
                  l("strong", null, o(a(f).data.gitIgnorePreview.missingEntries.length), 1),
                  l("span", null, o(a(f).data.gitIgnorePreview.gitignorePath), 1)
                ])
              ]),
              a(s).developerMode ? (_(), v("pre", tw, o(a(f).data.gitIgnorePreview.appendBlock || a(s).label("当前没有需要追加的规则。", "There are no extra rules to append right now.")), 1)) : (_(), v("p", sw, o(a(s).label("推荐规则的原始追加块已收纳到开发者模式中。若你需要逐行检查 appendBlock，请先到 Settings 打开开发者模式。", "The raw append block for recommended rules now stays behind developer mode. Enable it from Settings if you need to inspect the exact appendBlock line by line.")), 1)),
              l("div", nw, [
                l("button", {
                  class: "inline-link",
                  type: "button",
                  disabled: h.value === "gitignore",
                  onClick: T[6] || (T[6] = (y) => H("gitignore"))
                }, o(h.value === "gitignore" ? a(s).label("写入中…", "Applying…") : a(s).label("追加推荐规则", "Append recommended rules")), 9, lw)
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64))
      ], 64)) : re("", !0)
    ]));
  }
});
function iw() {
  return Ee("/api/agents");
}
const ow = { class: "page-stack" }, rw = { class: "page-header" }, cw = { class: "page-header__eyebrow" }, uw = { class: "page-header__title" }, dw = { class: "page-header__description" }, fw = {
  key: 0,
  class: "page-empty"
}, pw = {
  key: 1,
  class: "page-empty page-empty--error"
}, hw = {
  key: 0,
  class: "status-banner status-banner--warning"
}, gw = { class: "stat-grid" }, _w = { class: "stat-card" }, mw = { class: "stat-card__label" }, bw = { class: "stat-card" }, vw = { class: "stat-card__label" }, yw = { class: "stat-card" }, ww = { class: "stat-card__label" }, kw = { class: "stat-card" }, $w = { class: "stat-card__label" }, Sw = {
  key: 0,
  class: "provider-stack"
}, Cw = { class: "provider-card__header" }, xw = { class: "pill-row" }, Rw = {
  key: 0,
  class: "pill pill--success"
}, Ew = {
  key: 1,
  class: "pill pill--muted"
}, Tw = { class: "mini-list" }, Aw = { class: "mini-list__item mini-list__item--stack" }, Pw = { class: "mini-list__item mini-list__item--stack" }, Mw = { class: "mini-list__item mini-list__item--stack" }, Ow = { class: "pill-row" }, Iw = { class: "page-actions" }, Nw = ["onClick"], Dw = {
  key: 1,
  class: "page-empty"
}, Lw = /* @__PURE__ */ Ge({
  __name: "RolesPage",
  setup(e) {
    let t = null;
    const s = qe(), n = Pl(), i = Ml(), r = ct(() => iw(), t, { immediate: !1 }), c = K(() => {
      var k;
      return ((k = r.data) == null ? void 0 : k.agents) || [];
    }), u = K(() => c.value.filter((k) => k.isDefault).length), d = K(() => c.value.filter((k) => k.workspaceExists).length), h = K(() => c.value.filter((k) => f(k)).length);
    function f(k) {
      return k.docStatus.soul && k.docStatus.user && k.docStatus.agents && k.docStatus.memory;
    }
    function p(k) {
      i.setMode("all"), i.setCurrentPath(k.resolvedWorkspace), i.setSelectedFilePath(""), i.setSelectedMemoryFilePath(""), n.push("/files");
    }
    function g(k) {
      return s.developerMode ? k.resolvedWorkspace || k.workspace || k.id : k.workspace || k.id;
    }
    function m(k) {
      return s.developerMode ? s.label("当前显示的是实际工作区路径。", "Showing the resolved workspace path.") : k.workspaceExists ? s.label("实际工作区路径已收纳到开发者模式，可直接点击“打开工作区”继续查看。", "The exact workspace path stays behind developer mode. Use Open workspace to continue.") : s.label("Guard 还没有在当前机器上找到这个工作区目录。", "Guard has not found this workspace directory on the current machine yet.");
    }
    return Oe(() => r.data, (k) => {
      k && (t = k);
    }), Ye(() => {
      r.execute({ silent: !!r.data });
    }), (k, E) => (_(), v("div", ow, [
      l("header", rw, [
        l("div", null, [
          l("p", cw, o(a(s).label("角色 / Third slice", "Roles / Third slice")), 1),
          l("h2", uw, o(a(s).label("角色目录", "Role catalog")), 1),
          l("p", dw, o(a(s).label("先把 Agent 目录、默认角色和工作区文档健康度迁进新壳层里，方便后续与文件视图和会话视图打通。", "Move the agent catalog, default role state, and workspace doc health into the new shell so it can connect naturally with Files and Sessions next.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: E[0] || (E[0] = ($) => a(r).execute({ silent: !0 }))
        }, o(a(r).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("Refresh", "Refresh")), 1)
      ]),
      a(r).loading && !a(r).data ? (_(), v("div", fw, o(a(s).label("正在读取角色目录…", "Loading the role catalog…")), 1)) : a(r).error && !a(r).data ? (_(), v("div", pw, o(a(r).error), 1)) : (_(), v(Y, { key: 2 }, [
        a(r).error ? (_(), v("div", hw, o(a(s).label("宸蹭繚鐣欎笂涓€鐗堣鑹茬洰褰曪紝浣嗗悗鍙板埛鏂板け璐ワ細", "The last role catalog is still on screen, but the background refresh failed: ")) + o(a(r).error), 1)) : re("", !0),
        ee(ie, {
          title: a(s).label("团队概览", "Team overview"),
          eyebrow: "Summary"
        }, {
          default: ae(() => [
            l("div", gw, [
              l("article", _w, [
                l("p", mw, o(a(s).label("角色总数", "Roles")), 1),
                l("strong", null, o(a(_e)(c.value.length)), 1),
                l("span", null, o(a(s).label("当前已接入到 Guard 的角色目录", "Role entries currently discovered by Guard")), 1)
              ]),
              l("article", bw, [
                l("p", vw, o(a(s).label("默认角色", "Default role")), 1),
                l("strong", null, o(a(_e)(u.value)), 1),
                l("span", null, o(u.value > 0 ? a(s).label("至少有一个默认角色", "At least one default role is configured") : a(s).label("还没有默认角色", "No default role is configured yet")), 1)
              ]),
              l("article", yw, [
                l("p", ww, o(a(s).label("工作区可用", "Workspaces ready")), 1),
                l("strong", null, o(a(_e)(d.value)), 1),
                l("span", null, o(a(s).label("对应的工作区目录已经存在", "The mapped workspace directory already exists")), 1)
              ]),
              l("article", kw, [
                l("p", $w, o(a(s).label("关键文档齐全", "Core docs ready")), 1),
                l("strong", null, o(a(_e)(h.value)), 1),
                E[1] || (E[1] = l("span", null, "SOUL / USER / AGENTS / MEMORY", -1))
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"]),
        ee(ie, {
          title: a(s).label("角色成员", "Role entries"),
          eyebrow: "Catalog"
        }, {
          default: ae(() => [
            c.value.length ? (_(), v("div", Sw, [
              (_(!0), v(Y, null, ye(c.value, ($) => (_(), v("article", {
                key: $.id,
                class: "provider-card"
              }, [
                l("header", Cw, [
                  l("div", null, [
                    l("strong", null, o($.name), 1),
                    l("p", null, o(g($)), 1)
                  ]),
                  l("div", xw, [
                    $.isDefault ? (_(), v("span", Rw, o(a(s).label("默认", "Default")), 1)) : (_(), v("span", Ew, o($.id), 1)),
                    l("span", {
                      class: pe(["pill", $.workspaceExists ? "pill--success" : "pill--warning"])
                    }, o($.workspaceExists ? a(s).label("工作区就绪", "Workspace ready") : a(s).label("工作区缺失", "Workspace missing")), 3)
                  ])
                ]),
                l("div", Tw, [
                  l("div", Aw, [
                    l("strong", null, o(a(s).label("模型路由", "Model route")), 1),
                    l("p", null, o($.modelId || a(s).label("沿用默认模型", "Uses the default model route")), 1)
                  ]),
                  l("div", Pw, [
                    l("strong", null, o(a(s).label("工作区映射", "Workspace mapping")), 1),
                    l("p", null, o(g($)), 1),
                    l("p", null, o(m($)), 1)
                  ]),
                  l("div", Mw, [
                    l("strong", null, o(a(s).label("关键文档", "Core docs")), 1),
                    l("div", Ow, [
                      l("span", {
                        class: pe(["pill", $.docStatus.soul ? "pill--success" : "pill--warning"])
                      }, "SOUL", 2),
                      l("span", {
                        class: pe(["pill", $.docStatus.user ? "pill--success" : "pill--warning"])
                      }, "USER", 2),
                      l("span", {
                        class: pe(["pill", $.docStatus.agents ? "pill--success" : "pill--warning"])
                      }, "AGENTS", 2),
                      l("span", {
                        class: pe(["pill", $.docStatus.memory ? "pill--success" : "pill--warning"])
                      }, "MEMORY", 2)
                    ])
                  ])
                ]),
                l("div", Iw, [
                  l("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    onClick: (I) => p($)
                  }, o(a(s).label("打开对应工作区", "Open workspace")), 9, Nw)
                ])
              ]))), 128))
            ])) : (_(), v("div", Dw, o(a(s).label("还没有发现可用角色。请先检查 OpenClaw 配置和安装状态。", "No role entries were discovered yet. Check the OpenClaw configuration and installation state first.")), 1))
          ]),
          _: 1
        }, 8, ["title"])
      ], 64))
    ]));
  }
});
function Fw(e, t = 100) {
  const s = new URLSearchParams({
    q: e,
    limit: String(t)
  });
  return Ee(`/api/search?${s.toString()}`);
}
const Uw = { class: "page-stack" }, Vw = { class: "page-header" }, Gw = { class: "page-header__eyebrow" }, Bw = { class: "page-header__title" }, Hw = { class: "page-header__description" }, Ww = {
  class: "inline-link inline-link--primary",
  type: "submit"
}, jw = {
  key: 0,
  class: "page-empty page-empty--error"
}, Kw = {
  key: 1,
  class: "status-banner status-banner--warning"
}, zw = { class: "stat-grid" }, qw = { class: "stat-card" }, Jw = { class: "stat-card__label" }, Qw = { class: "stat-card" }, Yw = { class: "stat-card__label" }, Zw = { class: "stat-card" }, Xw = { class: "stat-card__label" }, ek = { class: "stat-card" }, tk = { class: "stat-card__label" }, sk = {
  key: 0,
  class: "page-empty"
}, nk = {
  key: 0,
  class: "status-banner status-banner--info"
}, lk = { class: "provider-stack" }, ak = { class: "provider-card__header" }, ik = { class: "pill-row" }, ok = { class: "page-actions" }, rk = ["onClick"], ck = {
  key: 2,
  class: "page-empty"
}, uk = /* @__PURE__ */ Ge({
  __name: "SearchPage",
  setup(e) {
    let t = null, s = 0;
    const n = qe(), i = Pl(), r = ut(), c = Ml(), u = /* @__PURE__ */ j(c.searchQuery), d = /* @__PURE__ */ j(!1), h = /* @__PURE__ */ j(null), f = /* @__PURE__ */ j(!1), p = /* @__PURE__ */ j([]), g = /* @__PURE__ */ j(""), m = K(() => new Set(p.value.map(($) => $.path)).size);
    Oe(u, ($) => {
      c.setSearchQuery($);
    });
    async function k() {
      const $ = u.value.trim(), I = ++s;
      if (c.setSearchQuery($), f.value = !0, h.value = null, !$) {
        p.value = [];
        return;
      }
      d.value = !0;
      try {
        const x = await Fw($, 100);
        if (I !== s)
          return;
        p.value = x.results || [], g.value = $, t = {
          query: $,
          results: [...p.value]
        };
      } catch (x) {
        if (I !== s)
          return;
        h.value = x instanceof Error ? x.message : String(x);
      } finally {
        I === s && (d.value = !1);
      }
    }
    function E($) {
      c.requestReveal($.path), r.pushToast({
        tone: "info",
        message: n.label("已切到文件页并定位结果。", "Switched to Files and queued the selected result."),
        durationMs: 2200
      }), i.push("/files");
    }
    return Ye(() => {
      if (c.searchQuery.trim()) {
        const $ = c.searchQuery.trim();
        if ((t == null ? void 0 : t.query) === $) {
          f.value = !0, p.value = [...t.results], g.value = $, k();
          return;
        }
        k();
      }
    }), ($, I) => (_(), v("div", Uw, [
      l("header", Vw, [
        l("div", null, [
          l("p", Gw, o(a(n).label("搜索 / Third slice", "Search / Third slice")), 1),
          l("h2", Bw, o(a(n).label("工作区搜索", "Workspace search")), 1),
          l("p", Hw, o(a(n).label("先让搜索直接覆盖 Guard 管理的工作区与核心记忆，并且可以一跳回到文件页继续编辑。", "Start with search across Guard-managed workspaces and core memory, then jump straight back into Files to continue editing.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: k
        }, o(d.value ? a(n).label("搜索中…", "Searching…") : a(n).label("Search", "Search")), 1)
      ]),
      ee(ie, {
        title: a(n).label("搜索条件", "Search query"),
        eyebrow: "Query"
      }, {
        default: ae(() => [
          l("form", {
            class: "search-form",
            onSubmit: bs(k, ["prevent"])
          }, [
            ke(l("input", {
              "onUpdate:modelValue": I[0] || (I[0] = (x) => u.value = x),
              class: "settings-input",
              type: "text",
              placeholder: "SOUL.md / qwen / fallback / cron"
            }, null, 512), [
              [Ue, u.value]
            ]),
            l("button", Ww, o(d.value ? a(n).label("搜索中…", "Searching…") : a(n).label("开始搜索", "Run search")), 1)
          ], 32)
        ]),
        _: 1
      }, 8, ["title"]),
      h.value && !p.value.length ? (_(), v("div", jw, o(h.value), 1)) : h.value ? (_(), v("div", Kw, o(a(n).label("已保留上一版搜索结果，但后台刷新失败：", "The last search results are still on screen, but the background refresh failed: ")) + o(h.value), 1)) : re("", !0),
      ee(ie, {
        title: a(n).label("结果概览", "Result overview"),
        eyebrow: "Summary"
      }, {
        default: ae(() => [
          l("div", zw, [
            l("article", qw, [
              l("p", Jw, o(a(n).label("命中条数", "Matches")), 1),
              l("strong", null, o(a(_e)(p.value.length)), 1),
              l("span", null, o(a(n).label("当前查询返回的匹配行数", "Matched lines returned for the current query")), 1)
            ]),
            l("article", Qw, [
              l("p", Yw, o(a(n).label("涉及文件", "Files")), 1),
              l("strong", null, o(a(_e)(m.value)), 1),
              l("span", null, o(a(n).label("至少命中一次的文件数量", "Files that matched at least once")), 1)
            ]),
            l("article", Zw, [
              l("p", Xw, o(a(n).label("当前查询", "Current query")), 1),
              l("strong", null, o(u.value.trim() || "-"), 1),
              l("span", null, o(g.value ? a(n).label(`当前展示的是“${g.value}”的结果`, `Currently showing results for "${g.value}"`) : u.value.trim() ? a(n).label("结果来自当前搜索词", "Results are based on the current query") : a(n).label("还没有输入搜索词", "No search query yet")), 1)
            ]),
            l("article", ek, [
              l("p", tk, o(a(n).label("打开方式", "Open flow")), 1),
              l("strong", null, o(a(n).label("一跳到文件页", "Jump into Files")), 1),
              l("span", null, o(a(n).label("搜索结果会按文件或核心记忆模式自动定位", "Results automatically open in file or core-memory mode")), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      ee(ie, {
        title: a(n).label("搜索结果", "Results"),
        eyebrow: "Results"
      }, {
        default: ae(() => [
          d.value && !p.value.length ? (_(), v("div", sk, o(a(n).label("正在查找匹配结果…", "Searching for matching results…")), 1)) : p.value.length ? (_(), v(Y, { key: 1 }, [
            d.value ? (_(), v("div", nk, o(a(n).label("正在后台刷新搜索结果…", "Refreshing search results in the background…")), 1)) : re("", !0),
            l("div", lk, [
              (_(!0), v(Y, null, ye(p.value, (x) => (_(), v("article", {
                key: `${x.path}:${x.line}:${x.preview}`,
                class: "provider-card"
              }, [
                l("header", ak, [
                  l("div", null, [
                    l("strong", null, o(x.relativePath || x.path), 1),
                    l("p", null, o(`L${x.line}`), 1)
                  ]),
                  l("div", ik, [
                    l("span", {
                      class: pe(["pill", a(ll)(x.path) ? "pill--success" : "pill--info"])
                    }, o(a(ll)(x.path) ? a(n).label("核心记忆", "Core memory") : a(n).label("文件", "File")), 3)
                  ])
                ]),
                l("p", null, o(x.preview), 1),
                l("div", ok, [
                  l("button", {
                    class: "inline-link inline-link--primary",
                    type: "button",
                    onClick: (H) => E(x)
                  }, o(a(n).label("在文件页打开", "Open in Files")), 9, rk)
                ])
              ]))), 128))
            ])
          ], 64)) : (_(), v("div", ck, o(f.value ? a(n).label("当前搜索词没有命中任何文件。", "The current query did not match any files.") : a(n).label("输入关键词后开始搜索。", "Enter a query to start searching.")), 1))
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
});
function dk() {
  return Ee("/api/audit");
}
function fk() {
  return Ee("/api/profiles");
}
function pk(e) {
  return Ve("/api/profiles/apply", { profile: e });
}
function hk(e) {
  return Ee(`/api/harden/steps?platform=${encodeURIComponent(e)}`);
}
const gk = { class: "page-stack" }, _k = { class: "page-header" }, mk = { class: "page-header__eyebrow" }, bk = { class: "page-header__title" }, vk = { class: "page-header__description" }, yk = {
  key: 0,
  class: "page-empty"
}, wk = {
  key: 1,
  class: "page-empty page-empty--error"
}, kk = {
  key: 0,
  class: "status-banner status-banner--warning"
}, $k = { class: "muted-copy" }, Sk = { class: "stat-grid" }, Ck = { class: "stat-card" }, xk = { class: "stat-card__label" }, Rk = { class: "stat-card" }, Ek = { class: "stat-card__label" }, Tk = { class: "stat-card" }, Ak = { class: "stat-card__label" }, Pk = { class: "provider-stack" }, Mk = { class: "provider-card__header" }, Ok = { class: "pill pill--muted" }, Ik = { class: "mini-list" }, Nk = { class: "provider-card__header" }, Dk = {
  key: 0,
  class: "muted-copy"
}, Lk = {
  key: 0,
  class: "page-empty"
}, Fk = {
  key: 1,
  class: "page-empty page-empty--error"
}, Uk = {
  key: 0,
  class: "status-banner status-banner--warning"
}, Vk = { class: "muted-copy" }, Gk = { class: "provider-stack" }, Bk = { class: "provider-card__header" }, Hk = { class: "muted-copy" }, Wk = { class: "pill pill--info" }, jk = { class: "settings-grid settings-grid--wide" }, Kk = { class: "settings-field" }, zk = { class: "mini-list" }, qk = { class: "settings-field" }, Jk = {
  key: 0,
  class: "code-panel"
}, Qk = {
  key: 1,
  class: "muted-copy"
}, Yk = { class: "settings-field" }, Zk = {
  key: 0,
  class: "code-panel"
}, Xk = {
  key: 1,
  class: "muted-copy"
}, e$ = { class: "page-actions" }, t$ = ["disabled", "onClick"], s$ = {
  key: 0,
  class: "page-empty"
}, n$ = {
  key: 1,
  class: "page-empty page-empty--error"
}, l$ = {
  key: 0,
  class: "status-banner status-banner--warning"
}, a$ = { class: "muted-copy" }, i$ = { class: "pill-row" }, o$ = ["href"], r$ = { class: "provider-stack" }, c$ = { class: "provider-card__header" }, u$ = { class: "muted-copy" }, d$ = {
  key: 0,
  class: "code-panel"
}, f$ = {
  key: 1,
  class: "muted-copy"
}, p$ = /* @__PURE__ */ Ge({
  __name: "SecurityPage",
  setup(e) {
    function t() {
      if (typeof navigator > "u") return "linux";
      const L = navigator.platform.toLowerCase();
      return L.includes("win") ? "windows" : L.includes("mac") ? "macos" : "linux";
    }
    const s = qe(), n = ut(), i = /* @__PURE__ */ j("audit"), r = /* @__PURE__ */ j(t()), c = /* @__PURE__ */ j("");
    let u = null, d = null;
    const h = /* @__PURE__ */ new Map(), f = ct(() => dk(), u, { immediate: !1 }), p = ct(() => fk(), d, { immediate: !1 }), g = ct(
      () => hk(r.value),
      h.get(r.value) || null,
      { immediate: !1 }
    ), m = K(() => [
      { id: "audit", label: s.label("安全检查", "Security checks") },
      { id: "profiles", label: s.label("权限模式", "Permission modes") },
      { id: "hardening", label: s.label("主机加固", "Host hardening") }
    ]), k = K(() => {
      var Z, V;
      const L = /* @__PURE__ */ new Map();
      for (const T of ((Z = f.data) == null ? void 0 : Z.results) || [])
        L.has(T.category) || L.set(T.category, []), (V = L.get(T.category)) == null || V.push(T);
      return Array.from(L.entries());
    });
    Oe(() => f.data, (L) => {
      L && (u = L);
    }), Oe(() => p.data, (L) => {
      L && (d = L);
    }), Oe(() => g.data, (L) => {
      L && h.set(r.value, L);
    }), Oe(
      i,
      (L) => {
        L === "audit" && !f.data && !f.loading && f.execute(), L === "profiles" && !p.data && !p.loading && p.execute(), L === "hardening" && !g.data && !g.loading && g.execute();
      },
      { immediate: !0 }
    ), Oe(r, () => {
      g.data = h.get(r.value) || null, i.value === "hardening" && g.execute({ silent: !!g.data });
    });
    function E(L) {
      return L === "pass" ? "pill--success" : L === "warn" ? "pill--warning" : "pill--danger";
    }
    function $(L) {
      return L === "pass" ? s.label("通过", "Pass") : L === "warn" ? s.label("警告", "Warning") : s.label("失败", "Fail");
    }
    async function I() {
      if (i.value === "audit") {
        await f.execute({ silent: !!f.data });
        return;
      }
      if (i.value === "profiles") {
        await p.execute({ silent: !!p.data });
        return;
      }
      await g.execute({ silent: !!g.data });
    }
    async function x(L) {
      c.value = L;
      try {
        const Z = await pk(L);
        n.pushToast({
          tone: Z.success ? "success" : "error",
          message: Z.message
        });
      } catch (Z) {
        n.pushToast({
          tone: "error",
          message: Z instanceof Error ? Z.message : String(Z)
        });
      } finally {
        c.value = "";
      }
    }
    function H(L) {
      i.value = L;
    }
    return (L, Z) => (_(), v("div", gk, [
      l("header", _k, [
        l("div", null, [
          l("p", mk, o(a(s).label("安全 / Second slice", "Security / Second slice")), 1),
          l("h2", bk, o(a(s).label("安全基线", "Security baseline")), 1),
          l("p", vk, o(a(s).label("把长页面拆成页内分栏，只在当前视图读取必要数据，让安全页更像决策面板，而不是说明书。", "Split the long page into internal tabs and load only the current view so the security page feels like a decision panel instead of a manual.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: I
        }, o(i.value === "audit" && a(f).refreshing || i.value === "profiles" && a(p).refreshing || i.value === "hardening" && a(g).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("刷新当前视图", "Refresh current view")), 1)
      ]),
      ee(Cn, {
        items: m.value,
        "active-id": i.value,
        onChange: H
      }, null, 8, ["items", "active-id"]),
      i.value === "audit" ? (_(), v(Y, { key: 0 }, [
        a(f).loading && !a(f).data ? (_(), v("div", yk, o(a(s).label("正在读取安全检查结果…", "Loading security checks…")), 1)) : a(f).error && !a(f).data ? (_(), v("div", wk, o(a(f).error), 1)) : a(f).data ? (_(), v(Y, { key: 2 }, [
          a(f).error ? (_(), v("div", kk, o(a(s).label("已保留上一版安全检查快照，但后台刷新失败：", "The last security-check snapshot is still on screen, but the background refresh failed: ")) + o(a(f).error), 1)) : re("", !0),
          ee(ie, {
            title: a(s).label("安全检查（Beta）", "Security checks (Beta)"),
            eyebrow: "Audit"
          }, {
            default: ae(() => [
              l("p", $k, o(a(s).label("这里更像建议型检查，而不是正式合规证明。优先处理失败项，其次处理警告项。", "This area behaves like advisory checks rather than a formal proof of compliance. Handle failures first, then warnings.")), 1),
              l("div", Sk, [
                l("article", Ck, [
                  l("p", xk, o(a(s).label("通过项", "Pass")), 1),
                  l("strong", null, o(a(f).data.summary.pass), 1),
                  l("span", null, o(a(s).label("当前无需处理", "No action needed right now")), 1)
                ]),
                l("article", Rk, [
                  l("p", Ek, o(a(s).label("警告项", "Warning")), 1),
                  l("strong", null, o(a(f).data.summary.warn), 1),
                  l("span", null, o(a(s).label("建议尽快检查", "Recommended to review soon")), 1)
                ]),
                l("article", Tk, [
                  l("p", Ak, o(a(s).label("失败项", "Fail")), 1),
                  l("strong", null, o(a(f).data.summary.fail), 1),
                  l("span", null, o(a(s).label("需要优先处理", "Highest priority")), 1)
                ])
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(s).label("检查详情", "Detailed findings"),
            eyebrow: "Details"
          }, {
            default: ae(() => [
              l("div", Pk, [
                (_(!0), v(Y, null, ye(k.value, ([V, T]) => (_(), v("article", {
                  key: V,
                  class: "provider-card"
                }, [
                  l("header", Mk, [
                    l("strong", null, o(V), 1),
                    l("span", Ok, o(T.length), 1)
                  ]),
                  l("div", Ik, [
                    (_(!0), v(Y, null, ye(T, (y) => (_(), v("div", {
                      key: `${V}-${y.item}`,
                      class: "mini-list__item mini-list__item--stack"
                    }, [
                      l("div", Nk, [
                        l("strong", null, o(y.item), 1),
                        l("span", {
                          class: pe(["pill", E(y.status)])
                        }, o($(y.status)), 3)
                      ]),
                      l("p", null, o(y.message), 1),
                      y.fix ? (_(), v("p", Dk, o(a(s).label("建议处理：", "Suggested fix: ")) + o(y.fix), 1)) : re("", !0)
                    ]))), 128))
                  ])
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["title"])
        ], 64)) : re("", !0)
      ], 64)) : i.value === "profiles" ? (_(), v(Y, { key: 1 }, [
        a(p).loading && !a(p).data ? (_(), v("div", Lk, o(a(s).label("正在读取权限模式…", "Loading permission modes…")), 1)) : a(p).error && !a(p).data ? (_(), v("div", Fk, o(a(p).error), 1)) : a(p).data ? (_(), v(Y, { key: 2 }, [
          a(p).error ? (_(), v("div", Uk, o(a(s).label("已保留上一版权限模式快照，但后台刷新失败：", "The last permission-mode snapshot is still on screen, but the background refresh failed: ")) + o(a(p).error), 1)) : re("", !0),
          ee(ie, {
            title: a(s).label("权限模式", "Permission modes"),
            eyebrow: "Profiles"
          }, {
            default: ae(() => [
              l("p", Vk, o(a(s).label("这些模式当前只会更新 OpenClaw 的工具权限配置，不会自动完成系统账户、ACL、Docker 或整机加固。", "These modes currently update only the OpenClaw tool-permission config. They do not automatically complete system users, ACLs, Docker, or full host hardening.")), 1)
            ]),
            _: 1
          }, 8, ["title"]),
          l("div", Gk, [
            (_(!0), v(Y, null, ye(a(p).data, (V) => (_(), ze(ie, {
              key: V.key,
              title: V.name,
              eyebrow: "Profile"
            }, {
              default: ae(() => {
                var T, y, R, A, ce, oe;
                return [
                  l("div", Bk, [
                    l("p", Hk, o(V.description), 1),
                    l("span", Wk, o(V.riskLevel || a(s).label("未标注风险等级", "Risk level not declared")), 1)
                  ]),
                  l("div", jk, [
                    l("div", Kk, [
                      l("span", null, o(a(s).label("建议使用场景", "Recommended use cases")), 1),
                      l("div", zk, [
                        (_(!0), v(Y, null, ye(V.recommendations || [], (he) => (_(), v("div", {
                          key: he,
                          class: "mini-list__item mini-list__item--stack"
                        }, [
                          l("p", null, o(he), 1)
                        ]))), 128))
                      ])
                    ]),
                    l("div", qk, [
                      l("span", null, o(a(s).label("允许规则", "Allow rules")), 1),
                      a(s).developerMode ? (_(), v("pre", Jk, o((((T = V.tools) == null ? void 0 : T.allow) || []).join(`
`) || "(none)"), 1)) : (_(), v("p", Qk, o(a(s).label(`当前包含 ${(((y = V.tools) == null ? void 0 : y.allow) || []).length} 条允许规则。需要查看原始规则列表时，请先到 Settings 打开开发者模式。`, `${(((R = V.tools) == null ? void 0 : R.allow) || []).length} allow rules are included. Enable developer mode from Settings when you need the raw rule list.`)), 1))
                    ]),
                    l("div", Yk, [
                      l("span", null, o(a(s).label("拒绝规则", "Deny rules")), 1),
                      a(s).developerMode ? (_(), v("pre", Zk, o((((A = V.tools) == null ? void 0 : A.deny) || []).join(`
`) || "(none)"), 1)) : (_(), v("p", Xk, o(a(s).label(`当前包含 ${(((ce = V.tools) == null ? void 0 : ce.deny) || []).length} 条拒绝规则。需要查看原始规则列表时，请先到 Settings 打开开发者模式。`, `${(((oe = V.tools) == null ? void 0 : oe.deny) || []).length} deny rules are included. Enable developer mode from Settings when you need the raw rule list.`)), 1))
                    ])
                  ]),
                  l("div", e$, [
                    l("button", {
                      class: "inline-link inline-link--primary",
                      type: "button",
                      disabled: c.value === V.key,
                      onClick: (he) => x(V.key)
                    }, o(c.value === V.key ? a(s).label("应用中…", "Applying…") : a(s).label("应用权限模式", "Apply permission mode")), 9, t$)
                  ])
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : re("", !0)
      ], 64)) : (_(), v(Y, { key: 2 }, [
        a(g).loading && !a(g).data ? (_(), v("div", s$, o(a(s).label("正在读取主机加固建议…", "Loading hardening guidance…")), 1)) : a(g).error && !a(g).data ? (_(), v("div", n$, o(a(g).error), 1)) : a(g).data ? (_(), v(Y, { key: 2 }, [
          a(g).error ? (_(), v("div", l$, o(a(s).label("已保留上一版主机加固快照，但后台刷新失败：", "The last hardening snapshot is still on screen, but the background refresh failed: ")) + o(a(g).error), 1)) : re("", !0),
          ee(ie, {
            title: a(s).label("主机加固指南（Beta）", "Host hardening guide (Beta)"),
            eyebrow: "Hardening"
          }, {
            default: ae(() => [
              l("p", a$, o(a(s).label("基础建议在所有平台上都类似：尽量使用非管理员账户运行，并把工作区边界收紧。Windows 上的独立低权限账户更适合长期后台运行或共享机器场景，不是所有人的默认强制项。", "The baseline is similar on every platform: prefer non-admin execution and keep the workspace boundary tight. On Windows, a dedicated low-privilege account is better treated as an advanced option for long-running or shared-machine setups, not a blanket default requirement.")), 1),
              l("div", i$, [
                l("button", {
                  class: pe(["pill-button", { "pill-button--active": r.value === "windows" }]),
                  type: "button",
                  onClick: Z[0] || (Z[0] = (V) => r.value = "windows")
                }, "Windows", 2),
                l("button", {
                  class: pe(["pill-button", { "pill-button--active": r.value === "macos" }]),
                  type: "button",
                  onClick: Z[1] || (Z[1] = (V) => r.value = "macos")
                }, "macOS", 2),
                l("button", {
                  class: pe(["pill-button", { "pill-button--active": r.value === "linux" }]),
                  type: "button",
                  onClick: Z[2] || (Z[2] = (V) => r.value = "linux")
                }, "Linux", 2),
                l("a", {
                  class: "inline-link",
                  href: `/api/harden/script?platform=${r.value}`
                }, o(a(s).label("下载脚本", "Download script")), 9, o$)
              ])
            ]),
            _: 1
          }, 8, ["title"]),
          l("div", r$, [
            (_(!0), v(Y, null, ye(a(g).data.steps, (V) => (_(), ze(ie, {
              key: V.id,
              title: V.title,
              eyebrow: "Step"
            }, {
              default: ae(() => {
                var T;
                return [
                  l("div", c$, [
                    l("p", u$, o(V.description), 1),
                    l("span", {
                      class: pe(["pill", V.optional ? "pill--muted" : "pill--warning"])
                    }, o(V.optional ? a(s).label("可选", "Optional") : a(s).label("建议", "Recommended")), 3)
                  ]),
                  a(s).developerMode ? (_(), v("pre", d$, o((V.commands || []).join(`
`) || a(s).label("当前没有附带命令。", "No commands are attached to this step.")), 1)) : (_(), v("p", f$, o((T = V.commands) != null && T.length ? a(s).label(`这个步骤附带 ${V.commands.length} 条命令，默认已收纳到开发者模式中。`, `This step includes ${V.commands.length} commands, which now stay behind developer mode by default.`) : a(s).label("这个步骤当前没有附带命令。", "No commands are attached to this step right now.")), 1))
                ];
              }),
              _: 2
            }, 1032, ["title"]))), 128))
          ])
        ], 64)) : re("", !0)
      ], 64))
    ]));
  }
});
function h$() {
  return Ee("/api/sessions");
}
const g$ = { class: "page-stack" }, _$ = { class: "page-header" }, m$ = { class: "page-header__eyebrow" }, b$ = { class: "page-header__title" }, v$ = { class: "page-header__description" }, y$ = {
  key: 0,
  class: "page-empty"
}, w$ = {
  key: 1,
  class: "page-empty page-empty--error"
}, k$ = {
  key: 0,
  class: "status-banner status-banner--warning"
}, $$ = { class: "stat-grid" }, S$ = { class: "stat-card" }, C$ = { class: "stat-card__label" }, x$ = { class: "stat-card" }, R$ = { class: "stat-card__label" }, E$ = { class: "stat-card" }, T$ = { class: "stat-card__label" }, A$ = { class: "stat-card" }, P$ = { class: "stat-card__label" }, M$ = { class: "stat-card" }, O$ = { class: "stat-card__label" }, I$ = { class: "stat-card" }, N$ = { class: "stat-card__label" }, D$ = { class: "stat-grid" }, L$ = { class: "stat-card" }, F$ = { class: "stat-card" }, U$ = { class: "stat-card__label" }, V$ = { class: "stat-card" }, G$ = { class: "stat-card__label" }, B$ = { class: "stat-card" }, H$ = { class: "stat-card__label" }, W$ = { class: "stat-card" }, j$ = { class: "stat-card__label" }, K$ = { class: "stat-card" }, z$ = { class: "stat-card__label" }, q$ = {
  key: 1,
  class: "muted-copy"
}, J$ = {
  key: 0,
  class: "provider-stack"
}, Q$ = { class: "provider-card__header" }, Y$ = { class: "pill-row" }, Z$ = { class: "pill pill--info" }, X$ = { class: "mini-list" }, eS = { class: "mini-list__item mini-list__item--stack" }, tS = { class: "mini-list__item mini-list__item--stack" }, sS = { class: "mini-list__item mini-list__item--stack" }, nS = { class: "mini-list__item mini-list__item--stack" }, lS = {
  key: 1,
  class: "page-empty"
}, aS = { class: "page-two-column" }, iS = {
  key: 0,
  class: "provider-stack"
}, oS = { class: "provider-card__header" }, rS = { class: "pill pill--info" }, cS = { class: "mini-list" }, uS = {
  key: 1,
  class: "page-empty"
}, dS = {
  key: 0,
  class: "provider-stack"
}, fS = { class: "provider-card__header" }, pS = { class: "pill pill--muted" }, hS = {
  key: 1,
  class: "page-empty"
}, gS = { class: "list-stack" }, _S = { class: "stat-grid" }, mS = { class: "stat-card" }, bS = { class: "stat-card__label" }, vS = { class: "stat-card" }, yS = { class: "stat-card__label" }, wS = { class: "stat-card" }, kS = { class: "stat-card__label" }, $S = { class: "stat-card" }, SS = { class: "stat-card__label" }, CS = /* @__PURE__ */ Ge({
  __name: "SessionsPage",
  setup(e) {
    let t = null;
    const s = qe(), n = ct(() => h$(), t, { immediate: !1 }), i = K(() => {
      var $;
      return ($ = n.data) == null ? void 0 : $.snapshot;
    }), r = K(() => {
      var $;
      return (($ = i.value) == null ? void 0 : $.sessions) || [];
    }), c = K(() => {
      var $, I;
      return ((I = ($ = i.value) == null ? void 0 : $.sessionsMeta) == null ? void 0 : I.byAgent) || [];
    }), u = K(() => r.value.filter(($) => !["ended", "finished", "closed"].includes($.status))), d = K(() => {
      var I;
      const $ = (I = n.data) == null ? void 0 : I.costSummary;
      return $ ? Number.isFinite($.totalEstimatedCost) && (!!$.pricingUnit || $.totalEstimatedCost > 0) : !1;
    });
    function h() {
      var I;
      const $ = (I = n.data) == null ? void 0 : I.costSummary;
      return !$ || !d.value ? s.label("无法估算", "Unavailable") : Da($.totalEstimatedCost, $.pricingUnit || "USD");
    }
    function f() {
      return d.value ? s.label("仅供本地观察，不代表官方账单", "For local observation only, not an official bill") : s.label("缺少可靠单价或用量数据，当前不显示金额", "Pricing or usage data is incomplete, so no amount is shown");
    }
    function p($) {
      return ["ended", "finished", "closed"].includes($.status) ? "pill--muted" : ["error", "failed", "aborted"].includes($.status) ? "pill--danger" : "pill--success";
    }
    function g($) {
      return $ ? s.developerMode ? [$.loadedText, $.runtimeShort].filter(Boolean).join(" / ") || s.label("服务信息暂缺", "Service details are missing") : $.installed === !1 ? s.label("当前没有检测到对应运行态。", "The runtime is not currently detected.") : s.label("已检测到服务，详细运行串已收纳到开发者模式。", "The service was detected. Detailed runtime strings stay behind developer mode.") : s.label("服务信息暂缺", "Service details are missing");
    }
    function m() {
      var I;
      const $ = (I = i.value) == null ? void 0 : I.memory;
      return $ ? s.developerMode ? [$.searchMode, $.dbPath || $.workspaceDir].filter(Boolean).join(" / ") || s.label("记忆运行态信息暂缺", "Memory runtime details are missing") : $.searchMode ? s.label(`检索模式：${$.searchMode}`, `Search mode: ${$.searchMode}`) : s.label("索引已连接，路径信息已收纳到开发者模式。", "The index is connected. Path details stay behind developer mode.") : s.label("记忆运行态信息暂缺", "Memory runtime details are missing");
    }
    function k() {
      var I;
      const $ = (I = i.value) == null ? void 0 : I.update;
      return $ ? s.developerMode ? [$.packageManager, $.latestVersion].filter(Boolean).join(" / ") || s.label("更新信息暂缺", "Update details are missing") : $.latestVersion ? s.label(`推荐版本：${$.latestVersion}`, `Recommended version: ${$.latestVersion}`) : s.label("更新细节已收纳到开发者模式。", "Detailed updater information stays behind developer mode.") : s.label("更新信息暂缺", "Update details are missing");
    }
    function E($) {
      return s.developerMode ? $ || s.label("没有返回路径信息", "No path information returned") : $ ? s.label("工作区路径已收纳到开发者模式。", "Workspace path stays behind developer mode.") : s.label("没有返回路径信息", "No path information returned");
    }
    return Oe(() => n.data, ($) => {
      $ && (t = $);
    }), Ye(() => {
      n.execute({ silent: !!n.data });
    }), ($, I) => (_(), v("div", g$, [
      l("header", _$, [
        l("div", null, [
          l("p", m$, o(a(s).label("会话 / Third slice", "Sessions / Third slice")), 1),
          l("h2", b$, o(a(s).label("会话观察台", "Session observer")), 1),
          l("p", v$, o(a(s).label("把运行时快照、按角色会话分布和用量估算迁进新壳层里，同时继续复用现有的共享缓存与后台刷新语义。", "Move runtime snapshots, per-role session distribution, and usage estimates into the new shell while keeping the current shared cache and background refresh semantics.")), 1)
        ]),
        l("button", {
          class: "page-header__action",
          type: "button",
          onClick: I[0] || (I[0] = (x) => a(n).execute({ silent: !0 }))
        }, o(a(n).refreshing ? a(s).label("刷新中…", "Refreshing…") : a(s).label("Refresh", "Refresh")), 1)
      ]),
      a(n).loading && !a(n).data ? (_(), v("div", y$, o(a(s).label("正在读取会话快照…", "Loading the session snapshot…")), 1)) : a(n).error && !a(n).data ? (_(), v("div", w$, o(a(n).error), 1)) : a(n).data && i.value ? (_(), v(Y, { key: 2 }, [
        a(n).error ? (_(), v("div", k$, o(a(s).label("已保留上一版会话快照，但后台刷新失败：", "The last session snapshot is still on screen, but the background refresh failed: ")) + o(a(n).error), 1)) : re("", !0),
        ee(ie, {
          title: a(s).label("会话总览", "Session overview"),
          eyebrow: "Summary"
        }, {
          default: ae(() => {
            var x, H, L, Z;
            return [
              l("div", $$, [
                l("article", S$, [
                  l("p", C$, o(a(s).label("会话总数", "Sessions")), 1),
                  l("strong", null, o(a(_e)(((x = i.value.summary) == null ? void 0 : x.sessionCount) ?? r.value.length)), 1),
                  l("span", null, o(((H = i.value.summary) == null ? void 0 : H.defaultModel) || a(s).label("默认模型未知", "Default model is unknown")), 1)
                ]),
                l("article", x$, [
                  l("p", R$, o(a(s).label("活跃会话", "Active now")), 1),
                  l("strong", null, o(a(_e)(u.value.length)), 1),
                  l("span", null, o(a(s).label("当前仍在运行或待执行的会话", "Sessions that are still running or waiting now")), 1)
                ]),
                l("article", E$, [
                  l("p", T$, o(a(s).label("累计 Tokens", "Total tokens")), 1),
                  l("strong", null, o(a(_e)(a(n).data.costSummary.totalTokens)), 1),
                  l("span", null, o(a(s).label("基于共享运行时快照统计", "Counted from the shared runtime snapshot")), 1)
                ]),
                l("article", A$, [
                  l("p", P$, o(a(s).label("用量估算", "Usage estimate")), 1),
                  l("strong", null, o(h()), 1),
                  l("span", null, o(f()), 1)
                ]),
                l("article", M$, [
                  l("p", O$, o(a(s).label("会话索引路径", "Session paths")), 1),
                  l("strong", null, o(a(_e)(((L = i.value.sessionsMeta) == null ? void 0 : L.paths.length) || 0)), 1),
                  l("span", null, o(a(s).label("被 Guard 识别到的会话目录", "Session directories detected by Guard")), 1)
                ]),
                l("article", I$, [
                  l("p", N$, o(a(s).label("待处理系统事件", "Queued events")), 1),
                  l("strong", null, o(a(_e)(((Z = i.value.summary) == null ? void 0 : Z.queuedSystemEvents) || 0)), 1),
                  l("span", null, o(a(s).label("等待处理的系统级事件", "System events that are still waiting")), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        ee(ie, {
          title: a(s).label("运行环境", "Runtime context"),
          eyebrow: "Runtime"
        }, {
          default: ae(() => {
            var x, H, L, Z, V, T, y, R, A, ce, oe, he, Re;
            return [
              l("div", D$, [
                l("article", L$, [
                  I[1] || (I[1] = l("p", { class: "stat-card__label" }, "OS", -1)),
                  l("strong", null, o(((x = i.value.os) == null ? void 0 : x.label) || "-"), 1),
                  l("span", null, o([(H = i.value.os) == null ? void 0 : H.platform, (L = i.value.os) == null ? void 0 : L.arch, (Z = i.value.os) == null ? void 0 : Z.release].filter(Boolean).join(" / ") || a(s).label("系统信息暂缺", "OS details are missing")), 1)
                ]),
                l("article", F$, [
                  l("p", U$, o(a(s).label("记忆检索", "Memory search")), 1),
                  l("strong", null, o(((V = i.value.memory) == null ? void 0 : V.provider) || ((T = i.value.memory) == null ? void 0 : T.backend) || "-"), 1),
                  l("span", null, o(m()), 1)
                ]),
                l("article", V$, [
                  l("p", G$, o(a(s).label("Gateway 服务", "Gateway service")), 1),
                  l("strong", null, o(((y = i.value.gatewayService) == null ? void 0 : y.label) || "-"), 1),
                  l("span", null, o(g(i.value.gatewayService)), 1)
                ]),
                l("article", B$, [
                  l("p", H$, o(a(s).label("Node 服务", "Node service")), 1),
                  l("strong", null, o(((R = i.value.nodeService) == null ? void 0 : R.label) || "-"), 1),
                  l("span", null, o(g(i.value.nodeService)), 1)
                ]),
                l("article", W$, [
                  l("p", j$, o(a(s).label("更新轨道", "Update track")), 1),
                  l("strong", null, o(((A = i.value.update) == null ? void 0 : A.channel) || ((ce = i.value.update) == null ? void 0 : ce.installKind) || "-"), 1),
                  l("span", null, o(k()), 1)
                ]),
                l("article", K$, [
                  l("p", z$, o(a(s).label("安全审计", "Security audit")), 1),
                  l("strong", null, o(a(_e)(((oe = i.value.securityAudit) == null ? void 0 : oe.findingsCount) || 0)), 1),
                  l("span", null, o(`${a(_e)(((he = i.value.securityAudit) == null ? void 0 : he.critical) || 0)} critical / ${a(_e)(((Re = i.value.securityAudit) == null ? void 0 : Re.warn) || 0)} warn`), 1)
                ])
              ])
            ];
          }),
          _: 1
        }, 8, ["title"]),
        a(s).developerMode ? re("", !0) : (_(), v("p", q$, o(a(s).label("路径、运行时短串和记忆索引位置已收纳到开发者模式。需要进一步排障时，请先到 Settings 打开开发者模式。", "Paths, runtime strings, and memory index locations now stay behind developer mode. Enable developer mode from Settings when you need deeper troubleshooting.")), 1)),
        ee(ie, {
          title: a(s).label("当前会话", "Current sessions"),
          eyebrow: "Sessions"
        }, {
          default: ae(() => [
            r.value.length ? (_(), v("div", J$, [
              (_(!0), v(Y, null, ye(r.value, (x) => (_(), v("article", {
                key: x.id,
                class: "provider-card"
              }, [
                l("header", Q$, [
                  l("div", null, [
                    l("strong", null, o(x.id), 1),
                    l("p", null, o(`${x.agentId} / ${x.modelId}`), 1)
                  ]),
                  l("div", Y$, [
                    l("span", {
                      class: pe(["pill", p(x)])
                    }, o(x.status || "-"), 3),
                    l("span", Z$, o(x.channel || "-"), 1)
                  ])
                ]),
                l("div", X$, [
                  l("div", eS, [
                    l("strong", null, o(a(s).label("时间轴", "Timeline")), 1),
                    l("p", null, o(a(s).label("开始：", "Started: ")) + o(a(it)(x.startedAt)), 1),
                    l("p", null, o(a(s).label("更新：", "Updated: ")) + o(a(it)(x.updatedAt)), 1)
                  ]),
                  l("div", tS, [
                    l("strong", null, o(a(s).label("Token 使用", "Token usage")), 1),
                    l("p", null, o(`${a(_e)(x.usage.totalTokens)} tokens`), 1),
                    l("p", null, o(`${a(s).label("输入", "Input")} ${a(_e)(x.usage.inputTokens)} / ${a(s).label("输出", "Output")} ${a(_e)(x.usage.outputTokens)}`), 1)
                  ]),
                  l("div", sS, [
                    l("strong", null, o(a(s).label("上下文窗口", "Context window")), 1),
                    l("p", null, o(x.contextTokens != null ? a(_e)(x.contextTokens) : "-"), 1),
                    l("p", null, o(a(s).label("剩余：", "Remaining: ")) + o(x.remainingTokens != null ? a(_e)(x.remainingTokens) : "-"), 1)
                  ]),
                  l("div", nS, [
                    l("strong", null, o(a(s).label("用量估算", "Usage estimate")), 1),
                    l("p", null, o(a(Da)(x.estimatedCost, a(n).data.costSummary.pricingUnit || "USD")), 1),
                    l("p", null, o(a(s).label("上下文占比：", "Context used: ")) + o(a(Ef)(x.percentUsed)), 1)
                  ])
                ])
              ]))), 128))
            ])) : (_(), v("div", lS, o(a(s).label("当前还没有会话记录。", "There are no session records right now.")), 1))
          ]),
          _: 1
        }, 8, ["title"]),
        l("div", aS, [
          ee(ie, {
            title: a(s).label("按角色分布", "By role"),
            eyebrow: "Roles"
          }, {
            default: ae(() => [
              c.value.length ? (_(), v("div", iS, [
                (_(!0), v(Y, null, ye(c.value, (x) => (_(), v("article", {
                  key: x.agentId,
                  class: "provider-card"
                }, [
                  l("header", oS, [
                    l("div", null, [
                      l("strong", null, o(x.agentId), 1),
                      l("p", null, o(E(x.path)), 1)
                    ]),
                    l("span", rS, o(a(_e)(x.count)), 1)
                  ]),
                  l("div", cS, [
                    (_(!0), v(Y, null, ye(x.recent.slice(0, 3), (H) => (_(), v("div", {
                      key: H.id,
                      class: "mini-list__item"
                    }, [
                      l("div", null, [
                        l("strong", null, o(H.modelId), 1),
                        l("p", null, o(H.channel), 1)
                      ]),
                      l("span", {
                        class: pe(["pill", p(H)])
                      }, o(H.status), 3)
                    ]))), 128))
                  ])
                ]))), 128))
              ])) : (_(), v("div", uS, o(a(s).label("当前没有按角色聚合的会话数据。", "No per-role session summary is available right now.")), 1))
            ]),
            _: 1
          }, 8, ["title"]),
          ee(ie, {
            title: a(s).label("最近活动", "Recent activity"),
            eyebrow: "Timeline"
          }, {
            default: ae(() => [
              a(n).data.recentActivity.length ? (_(), v("div", dS, [
                (_(!0), v(Y, null, ye(a(n).data.recentActivity.slice(0, 10), (x) => (_(), v("article", {
                  key: x.id,
                  class: "provider-card"
                }, [
                  l("header", fS, [
                    l("div", null, [
                      l("strong", null, o(x.title), 1),
                      l("p", null, o(a(it)(x.createdAt)), 1)
                    ]),
                    l("span", pS, o(x.type), 1)
                  ]),
                  l("p", null, o(x.description), 1)
                ]))), 128))
              ])) : (_(), v("div", hS, o(a(s).label("当前还没有最近活动记录。", "There is no recent activity yet.")), 1))
            ]),
            _: 1
          }, 8, ["title"])
        ]),
        i.value.warnings.length ? (_(), ze(ie, {
          key: 2,
          title: a(s).label("运行提醒", "Runtime warnings"),
          eyebrow: "Warning"
        }, {
          default: ae(() => [
            l("div", gS, [
              (_(!0), v(Y, null, ye(i.value.warnings, (x) => (_(), v("article", {
                key: x,
                class: "risk-row"
              }, [
                l("strong", null, o(a(s).label("注意事项", "Warning")), 1),
                l("span", null, o(x), 1)
              ]))), 128))
            ])
          ]),
          _: 1
        }, 8, ["title"])) : re("", !0),
        a(s).developerMode && i.value.memory ? (_(), ze(ie, {
          key: 3,
          "data-testid": "sessions-memory-runtime-details",
          title: a(s).label("记忆运行态补充", "Memory runtime details"),
          eyebrow: "Memory"
        }, {
          default: ae(() => [
            l("div", _S, [
              l("article", mS, [
                l("p", bS, o(a(s).label("记忆文件", "Memory files")), 1),
                l("strong", null, o(a(_e)(i.value.memory.files)), 1),
                l("span", null, o(a(s).label("当前已接入的记忆文件数量", "Managed memory files detected now")), 1)
              ]),
              l("article", vS, [
                l("p", yS, o(a(s).label("记忆分块", "Chunks")), 1),
                l("strong", null, o(a(_e)(i.value.memory.chunks)), 1),
                l("span", null, o(a(s).label("用于搜索的记忆分块数", "Memory chunks available for search")), 1)
              ]),
              l("article", wS, [
                l("p", kS, o(a(s).label("索引状态", "Index state")), 1),
                l("strong", null, o(i.value.memory.dirty === !0 ? a(s).label("待刷新", "Dirty") : i.value.memory.dirty === !1 ? a(s).label("已同步", "Clean") : "-"), 1),
                l("span", null, o(i.value.memory.dbPath || i.value.memory.workspaceDir || a(s).label("没有返回索引路径", "No index path returned")), 1)
              ]),
              l("article", $S, [
                l("p", SS, o(a(s).label("索引目录", "Index location")), 1),
                l("strong", null, o(i.value.memory.dbPath ? a(s).label("已返回路径", "Path returned") : a(s).label("暂无路径", "No path")), 1),
                l("span", null, o(i.value.memory.dbPath || i.value.memory.workspaceDir || a(s).label("没有返回目录信息", "No directory information returned")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["title"])) : re("", !0)
      ], 64)) : re("", !0)
    ]));
  }
}), xS = { class: "page-stack" }, RS = { class: "page-header" }, ES = { class: "page-header__eyebrow" }, TS = { class: "page-header__title" }, AS = { class: "page-header__description" }, PS = { class: "settings-grid" }, MS = { class: "settings-field" }, OS = { class: "settings-value" }, IS = { class: "settings-field" }, NS = { class: "settings-value" }, DS = { class: "settings-toggle" }, LS = { class: "settings-toggle__copy" }, FS = ["checked"], US = { class: "settings-note" }, VS = /* @__PURE__ */ Ge({
  __name: "SettingsPage",
  setup(e) {
    const t = qe();
    return (s, n) => (_(), v("div", xS, [
      l("header", RS, [
        l("div", null, [
          l("p", ES, o(a(t).label("Settings", "Settings")), 1),
          l("h2", TS, o(a(t).label("本地偏好与开发者模式", "Local preferences and developer mode")), 1),
          l("p", AS, o(a(t).label("这些设置只保存在当前浏览器里，不会改服务器，也不会影响其他使用者。", "These preferences stay in the current browser only. They do not change the server and do not affect other users.")), 1)
        ])
      ]),
      ee(ie, {
        title: a(t).label("界面偏好", "Interface preferences"),
        eyebrow: "Preferences"
      }, {
        default: ae(() => [
          l("div", PS, [
            l("article", MS, [
              l("div", null, [
                l("h3", null, o(a(t).label("主题", "Theme")), 1),
                l("p", null, o(a(t).label("当前控制台主题模式。", "The current theme mode used by the console.")), 1)
              ]),
              l("strong", OS, o(a(t).themePreference === "auto" ? a(t).label("跟随系统", "Auto") : a(t).themePreference === "light" ? a(t).label("浅色", "Light") : a(t).label("深色", "Dark")), 1)
            ]),
            l("article", IS, [
              l("div", null, [
                l("h3", null, o(a(t).label("语言", "Language")), 1),
                l("p", null, o(a(t).label("当前控制台显示语言。", "The display language currently used by the console.")), 1)
              ]),
              l("strong", NS, o(a(t).language === "zh" ? "中文" : "English"), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["title"]),
      ee(ie, {
        title: a(t).label("开发者模式", "Developer mode"),
        eyebrow: "Developer"
      }, {
        default: ae(() => [
          l("label", DS, [
            l("div", LS, [
              l("strong", null, o(a(t).label("显示调试与原始信息", "Show debug and raw views")), 1),
              l("span", null, o(a(t).label("开启后会显示原始 JSON、诊断区和后续的后台刷新提示，适合排查问题时使用。", "When enabled, the console can reveal raw JSON, diagnostics, and future background refresh hints for troubleshooting.")), 1)
            ]),
            l("input", {
              checked: a(t).developerMode,
              type: "checkbox",
              onChange: n[0] || (n[0] = (i) => a(t).setDeveloperMode(i.target.checked))
            }, null, 40, FS)
          ]),
          l("div", US, o(a(t).label("默认建议关闭，这样界面更适合普通使用。只有在排障或看原始配置时再打开。", "Keep this off by default for a cleaner operator experience. Turn it on only when you need diagnostics or raw configuration views.")), 1)
        ]),
        _: 1
      }, 8, ["title"])
    ]));
  }
}), GS = Zd({
  history: Md(),
  routes: [
    { path: "/", name: "overview", component: xg },
    { path: "/operations", name: "operations", component: Py },
    { path: "/openclaw", name: "openclaw", component: cy },
    { path: "/channels", name: "channels", component: xp },
    { path: "/models", name: "models", component: Lb },
    { path: "/security", name: "security", component: p$ },
    { path: "/recovery", name: "recovery", component: aw },
    { path: "/roles", name: "roles", component: Lw },
    { path: "/files", name: "files", component: rm },
    { path: "/search", name: "search", component: uk },
    { path: "/sessions", name: "sessions", component: CS },
    { path: "/logs", name: "logs", component: Im },
    { path: "/notifications", name: "notifications", component: Gv },
    { path: "/cron", name: "cron", component: ng },
    { path: "/settings", name: "settings", component: VS },
    { path: "/ai", redirect: "/models" },
    { path: "/git-sync", redirect: "/recovery" },
    { path: "/memory", redirect: "/files" },
    { path: "/activity", redirect: "/notifications" },
    { path: "/costs", redirect: "/sessions" }
  ]
});
Wc(Rf).use(zc()).use(GS).mount("#guard-next-app");
