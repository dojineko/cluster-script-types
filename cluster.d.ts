var $: ClusterScript

interface ClusterScript {
  /**
   * アイテムごとのstateへのアクセスを提供します。 read/writeアクセスが可能です。stateのプロパティへのアクセスにより、そのプロパティ名をkeyとしてstateへアクセスすることができます。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#state
   */
  state: StateProxy
  /**
   * アイテムの現在の位置を取得します。値はアイテムのあるワールド座標系で返されます。setPositionで指定された値ではなく、移動中のアイテムの位置が返されることに留意してください
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#getPosition
   */
  getPosition(): Vector3
  /**
   * アイテムの現在の姿勢を取得します。値はアイテムのあるワールド座標系で返されます。setRotationで指定された値ではなく、移動中のアイテムの姿勢が返されることに留意してください。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#getRotation
   */
  getRotation(): Quaternion
  /**
   * creator kit 製ワールドで対象のメッセージを取得します。creator kit 製ワールドのアイテム以外では実行時エラーになります。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#getStateCompat
   */
  getStateCompat(target: CompatGimmickTarget, key: string, parameterType: CompatParamType): CompatSendable
  /**
   * vの内容をtoStringしたものをログに出力します。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#log
   */
  log(v: any): void
  /**
   * アイテムを掴む・手放すときに呼ばれるcallbackを登録します。アイテムにはGrabbableItemコンポーネントが付いている必要があります。スクリプトロード時に最後に登録したcallbackのみが有効になります。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#onGrab
   */
  onGrab(callback: (isGrab: boolean) => void): void
  /**
   * 掴めないアイテムに「使う」動作をした際に呼ばれるcallbackを登録します。アイテムには1つ以上のColliderコンポーネントが付いている必要があります。 スクリプトロード時に最後に登録したcallbackのみが有効になります。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#onInteract
   */
  onInteract(callback: () => void): void
  /**
   * 乗ることができるアイテムに乗る・降りるときに呼ばれるcallbackを登録します。アイテムにはRidableItemコンポーネントが付いている必要があります。 スクリプトロード時に最後に登録したcallbackのみが有効になります。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#onRide
   */
  onRide(callback: (isGetOn: boolean) => void): void
  /**
   * updateループ毎に呼ばれるcallbackを登録します。 スクリプトロード時に最後に登録したcallbackのみが有効になります。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#onUpdate
   */
  onUpdate(callback: (deltaTime: number) => void): void
  /**
   * 掴んでいるアイテムに「使う」動作をしたときに呼ばれるcallbackを登録します。アイテムにはGrabbableItemコンポーネントが付いている必要があります。 スクリプトロード時に最後に登録したcallbackのみが有効になります。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#onUse
   */
  onUse(callback: (isDown: boolean) => void): void
  /**
   * creator kit 製ワールドで対象にシグナルを通知します。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#sendSignalCompat
   */
  sendSignalCompat(target: CompatStateTarget, key: string): void
  /**
   * アイテムの移動させたい位置を指定します。値はアイテムのあるワールド座標系で指定します。アイテムにはMovableItemコンポーネントが付いている必要があります。 位置はネットワークを介して補間して同期されるため、即座に反映されない場合があることに留意してください。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#setPosition
   */
  setPosition(v: Vector3): void
  /**
   * アイテムの回転させたい姿勢を指定します。値はアイテムのあるワールド座標系で指定します。アイテムにはMovableItemコンポーネントが付いている必要があります。 姿勢はネットワークを介して補間して同期されるため、即座に反映されない場合があることに留意してください。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#setRotation
   */
  setRotation(v: Quaternion): void
  /**
   * creator kit 製ワールドで対象にメッセージを通知します。creator kit 製ワールドのアイテム以外では実行時エラーになります。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#setStateCompat
   */
  setStateCompat(target: CompatStateTarget, key: string, value: CompatSendable): void
  /**
   * アイテムの子・孫要素からsubNodeNameに指定した名前のオブジェクトを探索して取得します。 存在しないsubNodeNameを指定した場合は実行時に無視され、エラーにはなりません。
   * @link https://docs.cluster.mu/script/interfaces/ClusterScript.html#subNode
   */
  subNode: (objectName: string) => SubNode
}

interface StateProxy {
  [propName: string]: Sendable
}

type Sendable = boolean | number | string | Vector2 | Vector3 | Quaternion | null

/**
 * 2Dベクトルです。
 * 値を操作するメソッドは基本的に破壊的操作であるため、影響を与えたくない場合は明示的にclone()を呼び出してインスタンスを複製してください。
 * @link https://docs.cluster.mu/script/classes/Vector2.html
 */
class Vector2 {
  /** @link https://docs.cluster.mu/script/classes/Vector2.html#constructor */
  constructor(x?: number, y?: number)
  readonly x: number
  readonly y: number

  /**
   * vの値を自身に加算します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#add
   */
  add(v: Vector2): Vector2
  /**
   * スカラー値sを自身のx, y成分に加算します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#addScalar
   */
  addScalar(s: number): Vector2
  /**
   * インスタンスを複製します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#clone
   */
  clone(): Vector2
  /**
   * 自身とvのベクトルの2Dの外積の大きさを計算します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#cross
   */
  cross(v: Vector2): number
  /**
   * vの値で自身を除算します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#divide
   */
  divide(v: Vector2): Vector2
  /**
   * スカラー値sで自身を乗算します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#divideScalar
   */
  divideScalar(s: number): Vector2
  /**
   * 自身とvのベクトルの内積を計算します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#dot
   */
  dot(v: Vector2): number
  /**
   * 自身の値とvを比較し、ほとんど等しいときにtrueを返します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#equals
   */
  equals(v: Vector2): boolean
  /**
   * 自身（ベクトル）の長さを返します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#length
   */
  length(): number
  /**
   * 自身（ベクトル）の2乗の長さを返します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#lengthSq
   */
  lengthSq(): number
  /**
   * 自身 と v の間を a で線形に補間した値を計算し、計算結果で自身の値を更新します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#lerp
   */
  lerp(v: Vector2, a: number): Vector2
  /**
   * vの値を自身に乗算します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#multiply
   */
  multiply(v: Vector2): Vector2
  /**
   * スカラー値sを自身に乗算します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#multiplyScalar
   */
  multiplyScalar(s: number): Vector2
  /**
   * 自身の値を反転します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#negate
   */
  negate(): Vector2
  /**
   * 自身の値を正規化します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#normalize
   */
  normalize(): Vector2
  /**
   * 自身のx, y成分の値を設定します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#set
   */
  set(x: number, y: number): Vector2
  /**
   * vの値で自身から減算します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#sub
   */
  sub(v: Vector2): Vector2
  /**
   * スカラー値sで自身のx, y成分を減算します。
   * @link https://docs.cluster.mu/script/classes/Vector2.html#subScalar
   */
  subScalar(s: number): Vector2
}

/**
 * 3Dベクトルです。
 * 値を操作するメソッドは基本的に破壊的操作であるため、影響を与えたくない場合は明示的にclone()を呼び出してインスタンスを複製してください。
 * @link https://docs.cluster.mu/script/classes/Vector3.html
 */
class Vector3 {
  /** @link https://docs.cluster.mu/script/classes/Vector3.html#constructor */
  constructor(x?: number, y?: number, z?: number)
  readonly x: number
  readonly y: number
  readonly z: number
}

class Quaternion {
  constructor(x?: number, y?: number, z?: number, w?: number)
  readonly w: number
  readonly x: number
  readonly y: number
  readonly z: number
  /**
   * インスタンスを複製します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#clone
   */
  clone(): Quaternion
  /**
   * オイラー角表現での回転の値を返します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#createEulerAngles
   */
  createEulerAngles(): Vector3
  /**
   * 自身とvの回転の内積を計算します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#dot
   */
  dot(v: Quaternion): number
  /**
   * 自身の値とvを比較し、ほとんど等しいときにtrueを返します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#equals
   */
  equals(v: Quaternion): boolean
  /**
   * 自身の値を単位回転で更新します。これは回転のない状態を指します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#identity
   */
  identity(): Quaternion
  /**
   * 自身の値を反転します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#invert
   */
  invert(): Quaternion
  /**
   * 自身（クォータニオン）を4次元のベクトルとみたときの長さを返します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#length
   */
  length(): number
  /**
   * 自身（クォータニオン）を4次元のベクトルとみたときの2乗の長さを返します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#lengthSq
   */
  lengthSq(): number
  /**
   * vの値を自身に乗算します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#multiply
   */
  multiply(v: Quaternion): Quaternion
  /**
   * 自身の値を正規化します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#normalize
   */
  normalize(): Quaternion
  /**
   * 自身のx, y, z, w成分の値を設定します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#set
   */
  set(x: number, y: number, z: number, w: number): Quaternion
  /**
   * axisの周りをdegree度回転する値で自身を更新します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#setFromAxisAngle
   */
  setFromAxisAngle(axis: Vector3, degree: number): Quaternion
  /**
   * オイラー角表現での回転で自身を更新します。軸の適用順序はZXYの順となります。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#setFromEulerAngles
   */
  setFromEulerAngles(v: Vector3): Quaternion
  /**
   * 自身 と v の間を a で球状に補間した値を計算し、計算結果で自身の値を更新します。
   * @link https://docs.cluster.mu/script/classes/Quaternion.html#slerp
   */
  slerp(v: Quaternion, a: number): Quaternion
}

/**
 * アイテムの子要素のオブジェクトを操作するハンドルです。
 */
interface SubNode {
  /**
   * SubNodeの現在の位置を取得します。値は要素ごとのローカル座標系で返されます。
   * setPositionで指定された値ではなく、移動中のSubNodeの位置が返されることに留意してください。
   * @link https://docs.cluster.mu/script/interfaces/SubNode.html#getPosition
   */
  getPosition(): Vector3
  /**
   * SubNodeの現在の姿勢を取得します。値は要素ごとのローカル座標系で返されます。
   * setRotationで指定された値ではなく、移動中のSubNodeの姿勢が返されることに留意してください。
   * @link https://docs.cluster.mu/script/interfaces/SubNode.html#getRotation
   */
  getRotation(): Quaternion
  /**
   * SubNodeの移動させたい位置を指定します。値は要素ごとのローカル座標系で指定します。
   * 位置はネットワークを介して補間して同期されるため、即座に反映されない場合があることに留意してください。
   * @link https://docs.cluster.mu/script/interfaces/SubNode.html#setPosition
   */
  setPosition(v: Vector3): void
  /**
   * SubNodeの回転させたい姿勢を指定します。値は要素ごとのローカル座標系で指定します。
   * 姿勢はネットワークを介して補間して同期されるため、即座に反映されない場合があることに留意してください。
   * @link https://docs.cluster.mu/script/interfaces/SubNode.html#setRotation
   */
  setRotation(v: Quaternion): void
}
